export const STORAGE_KEY = "lumen-react-vite-v3";

export function initialAppState(settings = {}) {
  return {
    version: 3,
    viewMode: "setup",
    learner: {
      goalKey: "",
      customGoal: "",
      level: "beginner",
      timeMode: "30",
      styleMode: "watch"
    },
    roadmap: null,
    completedActions: [],
    completionDates: {},
    selectedStepId: "",
    earnedBadges: [],
    arcadeGame: "tap",
    gameStats: {
      totalXp: 0,
      plays: 0,
      bestScores: {},
      dailyAwards: {}
    },
    settings: {
      highContrast: false,
      ...settings
    }
  };
}

export function cloneState(value) {
  return JSON.parse(JSON.stringify(value));
}

export function loadAppState() {
  const fallback = initialAppState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    const savedGameStats = parsed.gameStats || {};
    return {
      ...fallback,
      ...parsed,
      learner: { ...fallback.learner, ...(parsed.learner || {}) },
      settings: { ...fallback.settings, ...(parsed.settings || {}) },
      completedActions: Array.isArray(parsed.completedActions) ? parsed.completedActions : [],
      completionDates: parsed.completionDates && typeof parsed.completionDates === "object" ? parsed.completionDates : {},
      earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : [],
      arcadeGame: parsed.arcadeGame || "tap",
      viewMode: parsed.viewMode === "map" || parsed.viewMode === "focus" ? "focus" : parsed.viewMode === "arcade" ? "arcade" : "setup",
      gameStats: {
        ...fallback.gameStats,
        ...savedGameStats,
        bestScores: { ...(savedGameStats.bestScores || {}) },
        dailyAwards: { ...(savedGameStats.dailyAwards || {}) }
      }
    };
  } catch (error) {
    console.warn("LUMEN could not load saved progress:", error);
    return fallback;
  }
}

export function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("LUMEN could not save progress:", error);
  }
}
