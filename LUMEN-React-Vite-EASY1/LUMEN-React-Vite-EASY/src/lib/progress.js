import { BADGES } from "../data/catalog.js";

export const DAILY_QUEST_TARGET = 2;
const LEVEL_THRESHOLDS = [0, 250, 650, 1200, 2000, 3000];
const LEVEL_NAMES = ["Starter", "Explorer", "Navigator", "Trailblazer", "Achiever", "Luminary"];

export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getActivityData(state) {
  const dailyCounts = {};
  Object.values(state?.completionDates || {}).forEach(key => {
    if (!key) return;
    dailyCounts[key] = (dailyCounts[key] || 0) + 1;
  });
  return {
    dailyCounts,
    activeDays: Object.keys(dailyCounts).sort()
  };
}

export function calculateStreak(activeDays) {
  if (!activeDays?.length) return 0;
  const active = new Set(activeDays);
  const cursor = new Date();
  const today = toDateKey(cursor);
  if (!active.has(today)) cursor.setDate(cursor.getDate() - 1);

  let streak = 0;
  while (active.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getLevelInfo(xp) {
  let index = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i += 1) {
    if (xp >= LEVEL_THRESHOLDS[i]) index = i;
  }
  const current = LEVEL_THRESHOLDS[index];
  const next = LEVEL_THRESHOLDS[index + 1] ?? null;
  const progress = next ? Math.max(0, Math.min(100, Math.round(((xp - current) / (next - current)) * 100))) : 100;
  return {
    level: index + 1,
    name: LEVEL_NAMES[Math.min(index, LEVEL_NAMES.length - 1)],
    current,
    next,
    progress,
    toNext: next ? Math.max(0, next - xp) : 0
  };
}

export function isActionDone(state, stepId, index) {
  return (state.completedActions || []).includes(`${stepId}:${index}`);
}

export function isStepComplete(state, step) {
  if (!step) return false;
  return step.actions.every((_, index) => isActionDone(state, step.id, index));
}

export function getCurrentStep(state) {
  if (!state.roadmap) return null;
  return state.roadmap.steps.find(step => !isStepComplete(state, step)) || state.roadmap.steps[state.roadmap.steps.length - 1];
}

export function getSelectedStep(state) {
  if (!state.roadmap) return null;
  return state.roadmap.steps.find(step => step.id === state.selectedStepId) || getCurrentStep(state);
}

export function getStats(state) {
  const empty = {
    totalActions: 0,
    actions: 0,
    steps: 0,
    totalSteps: 0,
    percent: 0,
    confidence: 22,
    streak: 0,
    todayActions: 0,
    dailyQuestComplete: false,
    questBonusDays: 0,
    streakBonus: 0,
    gameXp: 0,
    gamePlays: 0,
    xp: 0,
    level: 1,
    levelName: "Starter",
    levelProgress: 0,
    toNext: 250,
    allComplete: false
  };

  if (!state?.roadmap) return empty;

  const totalActions = state.roadmap.steps.reduce((sum, step) => sum + step.actions.length, 0);
  const actions = state.completedActions.length;
  const steps = state.roadmap.steps.filter(step => isStepComplete(state, step)).length;
  const totalSteps = state.roadmap.steps.length;
  const percent = totalActions ? Math.round((actions / totalActions) * 100) : 0;
  const { dailyCounts, activeDays } = getActivityData(state);
  const todayActions = dailyCounts[toDateKey()] || 0;
  const dailyQuestComplete = todayActions >= DAILY_QUEST_TARGET;
  const questBonusDays = Object.values(dailyCounts).filter(count => count >= DAILY_QUEST_TARGET).length;
  const streak = calculateStreak(activeDays);
  const streakBonus = Math.min(100, Math.max(0, streak - 1) * 15);
  const badgeCount = state.earnedBadges.length;
  const gameXp = state.gameStats?.totalXp || 0;
  const gamePlays = state.gameStats?.plays || 0;
  const xp = actions * 25 + steps * 100 + badgeCount * 50 + questBonusDays * 50 + streakBonus + gameXp;
  const levelInfo = getLevelInfo(xp);
  const confidence = Math.min(100, 22 + actions * 3 + steps * 9 + streak * 3 + (dailyQuestComplete ? 6 : 0) + Math.min(6, gamePlays));
  const allComplete = totalSteps > 0 && steps === totalSteps;

  return {
    totalActions,
    actions,
    steps,
    totalSteps,
    percent,
    confidence,
    streak,
    todayActions,
    dailyQuestComplete,
    questBonusDays,
    streakBonus,
    gameXp,
    gamePlays,
    xp,
    level: levelInfo.level,
    levelName: levelInfo.name,
    levelProgress: levelInfo.progress,
    toNext: levelInfo.toNext,
    allComplete
  };
}

export function findNewBadges(state, stats = getStats(state)) {
  return BADGES.filter(badge => badge.test(stats) && !state.earnedBadges.includes(badge.id));
}

export function applyActionToggle(state, stepId, index, checked) {
  if (!state.roadmap) return { state, wasComplete: false, nowComplete: false, newBadges: [], stats: getStats(state) };
  const step = state.roadmap.steps.find(item => item.id === stepId);
  if (!step) return { state, wasComplete: false, nowComplete: false, newBadges: [], stats: getStats(state) };

  const wasComplete = isStepComplete(state, step);
  const key = `${stepId}:${index}`;
  const set = new Set(state.completedActions);
  const completionDates = { ...state.completionDates };

  if (checked) {
    if (!set.has(key)) {
      set.add(key);
      completionDates[key] = toDateKey();
    } else if (!completionDates[key]) {
      completionDates[key] = toDateKey();
    }
  } else {
    set.delete(key);
    delete completionDates[key];
  }

  let next = { ...state, completedActions: Array.from(set), completionDates };
  const newBadges = findNewBadges(next);
  if (newBadges.length) next = { ...next, earnedBadges: [...next.earnedBadges, ...newBadges.map(badge => badge.id)] };
  const nowComplete = isStepComplete(next, step);
  return { state: next, wasComplete, nowComplete, newBadges, stats: getStats(next) };
}
