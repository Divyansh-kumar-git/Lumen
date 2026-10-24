import { GOALS, CUSTOM_MILESTONES, LEVELS, TIME_MODES, STYLE_MODES } from "../data/catalog.js";

export function getGoal(key) {
  return GOALS.find(goal => goal.key === key) || GOALS[GOALS.length - 1];
}

export function getGoalName(learner) {
  const goal = getGoal(learner.goalKey);
  const custom = (learner.customGoal || "").trim();
  return learner.goalKey === "custom" && custom ? custom : goal.name;
}

export function buildRoadmap(learner) {
  const goal = getGoal(learner.goalKey);
  const skillName = getGoalName(learner);
  const level = LEVELS[learner.level] || LEVELS.beginner;
  const time = TIME_MODES[learner.timeMode] || TIME_MODES["30"];
  const style = STYLE_MODES[learner.styleMode] || STYLE_MODES.watch;
  const baseMilestones = learner.goalKey === "custom" ? CUSTOM_MILESTONES : goal.milestones;

  const steps = baseMilestones.map((milestone, index) => {
    let title = milestone.title;
    let topic = milestone.topic;
    let practice = milestone.practice;
    let checkpoint = milestone.checkpoint;
    let why = milestone.why;

    if (index === 0 && learner.level === "some") {
      title = "Calibrate your baseline";
      topic = `the core map of ${skillName} and what you already know`;
      practice = "list three things you can already do and one gap you want to close";
      checkpoint = "You can name one strength and one precise next gap.";
      why = "A quick calibration prevents repeating the boring basics.";
    }
    if (index === 0 && learner.level === "returning") {
      title = "Rewarm your foundations";
      topic = `the essential vocabulary of ${skillName}`;
      practice = "do one easy review example without aiming for perfection";
      checkpoint = "You remember enough to take the next step without fear.";
      why = "Restarting works best when the first win feels safe.";
    }
    if (learner.goalKey === "custom") {
      topic = `${topic} (${skillName})`;
    }

    const actions = [
      style.learn(topic),
      style.practice({ practice }),
      style.reflect(checkpoint)
    ];
    if (index === 0) actions.unshift(level.adapter + " Create a note called “My LUMEN log” and write today’s date.");

    return {
      id: `step-${index + 1}`,
      number: index + 1,
      title,
      focus: practice,
      why,
      duration: time.duration,
      checkpoint,
      actions
    };
  });

  return {
    title: `Your path to ${skillName}`,
    subtitle: `A six-step plan for ${level.label.toLowerCase()} · ${time.label} · ${style.label}.`,
    goalKey: learner.goalKey,
    goalName: skillName,
    outcome: learner.goalKey === "custom" ? `make visible progress in ${skillName}` : goal.outcome,
    pace: time.short,
    sessions: time.sessions,
    styleLabel: style.label,
    levelLabel: level.label,
    timeLabel: time.label,
    generatedAt: new Date().toISOString(),
    steps
  };
}
