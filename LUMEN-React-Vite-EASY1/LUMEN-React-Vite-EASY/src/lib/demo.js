import { initialAppState } from "./state.js";
import { buildRoadmap } from "./pathEngine.js";
import { applyActionToggle } from "./progress.js";

export const DEMO_LEARNER = {
  goalKey: "speaking",
  customGoal: "",
  level: "beginner",
  timeMode: "15",
  styleMode: "watch"
};

function completeStepForDemo(state, stepIndex) {
  let next = { ...state };
  const step = next.roadmap?.steps[stepIndex];
  if (!step) return next;
  step.actions.forEach((_, index) => {
    next = applyActionToggle(next, step.id, index, true).state;
  });
  return next;
}

function freshRoadmapState(previous, learner = DEMO_LEARNER) {
  const roadmap = buildRoadmap(learner);
  return {
    ...previous,
    learner: { ...previous.learner, ...learner },
    roadmap,
    completedActions: [],
    completionDates: {},
    earnedBadges: [],
    gameStats: initialAppState().gameStats,
    selectedStepId: roadmap.steps[0].id,
    viewMode: "focus"
  };
}

export const DEMO_BEATS = [
  {
    seconds: 6,
    title: "0:00 — The learner’s problem",
    caption: "A learner has a goal but too many tabs and tutorials. LUMEN starts by removing the ‘what now?’ confusion.",
    target: "#problemCallout",
    apply: previous => ({ ...initialAppState(previous.settings), settings: previous.settings, viewMode: "setup" })
  },
  {
    seconds: 7,
    title: "0:06 — Pick one clear goal",
    caption: "For the demo, we choose ‘Speak confidently’. Goal selection is one tap, not a long onboarding flow.",
    target: '[data-goal="speaking"]',
    apply: previous => ({ ...previous, learner: { ...previous.learner, goalKey: "speaking" }, viewMode: "setup" })
  },
  {
    seconds: 6,
    title: "0:13 — Meet the learner where they are",
    caption: "Complete beginner, 15 minutes a day, video-first. The roadmap adapts to real life instead of assuming unlimited time.",
    target: "#levelRow",
    apply: previous => ({ ...previous, learner: { ...previous.learner, ...DEMO_LEARNER }, viewMode: "setup" })
  },
  {
    seconds: 8,
    title: "0:19 — Generate the roadmap",
    caption: "One click sends four answers to the offline Path Engine, which builds six milestones, concrete actions and a realistic pace — no API key needed.",
    target: "#generateButton",
    apply: previous => ({ ...previous, learner: { ...previous.learner, ...DEMO_LEARNER }, viewMode: "setup" })
  },
  {
    seconds: 8,
    title: "0:27 — Roadmap and progress",
    caption: "LUMEN lands on the plan itself: Done, Now and Next stay visible, with four quiet metric cards for progress, level, streak and confidence.",
    target: "#momentumHud",
    apply: previous => freshRoadmapState(previous)
  },
  {
    seconds: 7,
    title: "0:35 — Simplicity: one action only",
    caption: "There is no dashboard to decode. The whole learning screen is one step, one action and one button — Focus Mode is the product, not a mode.",
    target: "#focusActionCard",
    apply: previous => ({ ...previous, viewMode: "focus" })
  },
  {
    seconds: 9,
    title: "0:42 — Gamified first win",
    caption: "Completing the first step lights progress, earns XP, finishes the daily quest, raises confidence and unlocks rewards.",
    target: "#progressCard",
    apply: previous => {
      const completed = completeStepForDemo(previous, 0);
      return {
        ...completed,
        viewMode: "focus",
        selectedStepId: completed.roadmap.steps[1].id
      };
    }
  },
  {
    seconds: 9,
    title: "0:51 — Reward arcade",
    caption: "Three short arcade games give learners a motivating reset. XP is capped once per game per day, so rewards stay meaningful.",
    target: "#tapSprint",
    apply: previous => ({ ...previous, viewMode: "arcade", arcadeGame: "tap" })
  }
];

export const DEMO_TOTAL_SECONDS = DEMO_BEATS.reduce((sum, beat) => sum + beat.seconds, 0);

export function applyDemoBeat(previous, index) {
  const beat = DEMO_BEATS[index];
  return beat ? beat.apply(previous) : previous;
}
