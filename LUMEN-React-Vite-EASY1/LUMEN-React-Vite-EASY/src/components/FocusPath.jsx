import { Icon } from "./Icon.jsx";
import { isActionDone, isStepComplete } from "../lib/progress.js";
import { ArcadeCard, MetricsRow, PlanPanel, QuestPanel, RewardsPanel, WhyPanel } from "./Panels.jsx";

function StepRail({ state, currentStep }) {
  return (
    <nav className="step-rail" aria-label="Roadmap at a glance">
      <ol className="rail-track">
        {state.roadmap.steps.map(step => {
          const complete = isStepComplete(state, step);
          const isCurrent = currentStep?.id === step.id && !complete;
          const status = complete ? "done" : isCurrent ? "current" : "next";
          return (
            <li className={`rail-step ${status}`} key={step.id} aria-label={`Step ${step.number}: ${step.title}. ${complete ? "Done" : isCurrent ? "In progress" : "Up next"}.`}>
              <span className="rail-node" aria-hidden="true">{complete ? <Icon name="check" size={12} /> : step.number}</span>
              <span className="rail-title" aria-hidden="true" title={step.title}>{step.title}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FocusPath({
  state,
  stats,
  currentStep,
  selectedStep,
  onSelectStep,
  onToggleAction,
  onOpenArcade,
  onNewGoal,
  newBadge
}) {
  const allComplete = stats.allComplete;
  const step = currentStep || state.roadmap.steps[state.roadmap.steps.length - 1];
  const actionIndex = Math.max(0, step.actions.findIndex((_, index) => !isActionDone(state, step.id, index)));
  const action = step.actions[actionIndex] || step.actions[0];
  const doneInStep = step.actions.filter((_, index) => isActionDone(state, step.id, index)).length;
  const nextStep = state.roadmap.steps[step.number] || null;

  const scrollToPlan = () => {
    document.querySelector("#fullPlan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="focus-home shell" id="focusMode" aria-labelledby="workspaceTitle">
      <div className="focus-page-head">
        <div>
          <p className="eyebrow"><Icon name="focus" size={14} /> Focus mode · one action at a time</p>
          <h1 id="workspaceTitle">{state.roadmap.title}</h1>
          <p className="lede">{state.roadmap.subtitle} Aim: {state.roadmap.outcome}.</p>
        </div>
        <div className="focus-head-actions">
          <button className="btn btn-small" type="button" onClick={onNewGoal}><Icon name="reset" size={15} /> New goal</button>
          <button className="btn btn-small btn-primary" type="button" onClick={() => onOpenArcade()}><Icon name="spark" size={15} /> Reward arcade</button>
        </div>
      </div>

      <StepRail state={state} currentStep={currentStep} />

      {allComplete ? (
        <section className="completion-card" aria-labelledby="completionTitle">
          <span className="completion-icon" aria-hidden="true"><Icon name="trophy" size={34} /></span>
          <div className="completion-copy">
            <p className="focus-kicker">Roadmap complete</p>
            <h2 id="completionTitle">You built a real first win.</h2>
            <p>All six steps are done toward {state.roadmap.outcome}. {stats.xp} XP earned, {state.earnedBadges.length} rewards unlocked. Your learning loop is now repeatable.</p>
          </div>
          <div className="completion-actions">
            <button className="btn btn-small btn-primary" type="button" onClick={() => onOpenArcade()}><Icon name="spark" size={15} /> Play a reward game</button>
            <button className="btn btn-small" type="button" onClick={onNewGoal}><Icon name="arrow" size={15} /> Pick a new goal</button>
          </div>
        </section>
      ) : (
        <section className="focus-hero surface" aria-labelledby="focusTitle">
          <div className="focus-topline">
            <span><Icon name="focus" size={16} /> Step {step.number} of {state.roadmap.steps.length}</span>
            <span className="focus-streak"><Icon name="flame" size={14} /> {stats.streak} day streak · {stats.xp} XP</span>
          </div>

          <div className="focus-grid">
            <aside className="focus-side" aria-label="Current step summary">
              <div className="focus-step-circle"><strong>{step.number}</strong><span>of {state.roadmap.steps.length}</span></div>
              <p className="focus-side-label">Current step</p>
              <h2>{step.title}</h2>
              <div className="focus-dots" aria-label={`${doneInStep} of ${step.actions.length} actions complete`}>
                {step.actions.map((_, index) => <span className={index < doneInStep ? "done" : ""} key={index}>{index < doneInStep ? <Icon name="check" size={12} /> : index + 1}</span>)}
              </div>
              <div className="focus-side-progress"><span>{stats.percent}% of the full path</span><div><i style={{ width: `${stats.percent}%` }} /></div></div>
            </aside>

            <div className="focus-copy">
              <p className="focus-kicker">Only one thing matters right now</p>
              <h2 id="focusTitle" className="focus-headline">Do the next small action.</h2>
              <div className="focus-action-card" id="focusActionCard" aria-live="polite">
                <span className="action-number">Action {doneInStep + 1} of {step.actions.length}</span>
                <p key={`${step.id}-${actionIndex}`}>{action}</p>
              </div>
              <div className="focus-meta">
                <span><Icon name="clock" size={15} /> {step.duration}</span>
                <span><Icon name="bolt" size={15} /> +25 XP</span>
                <span><Icon name="target" size={15} /> Confidence {stats.confidence}%</span>
              </div>
              <button className="btn btn-primary focus-done" type="button" onClick={() => onToggleAction(step.id, actionIndex, true)}>
                <Icon name="check" size={19} /> {doneInStep + 1 === step.actions.length && !nextStep ? "Finish the final step" : "I did this — show me the next action"}
              </button>
              <p className="focus-note">Everything else stays one scroll away. Only this action is required right now.</p>
            </div>
          </div>

          <div className="focus-footer">
            <div>
              <div className="focus-progress-label"><span>Path progress</span><strong>{stats.percent}%</strong></div>
              <div className="focus-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={stats.percent} aria-label="Path progress"><span style={{ width: `${stats.percent}%` }} /></div>
            </div>
            <button className="link-button" type="button" onClick={scrollToPlan}>Show the full plan</button>
          </div>
        </section>
      )}

      <MetricsRow stats={stats} />

      <div className="plan-row">
        <QuestPanel state={state} stats={stats} />
        <ArcadeCard state={state} stats={stats} onOpenArcade={onOpenArcade} />
      </div>

      <PlanPanel
        state={state}
        currentStep={currentStep}
        selectedStep={selectedStep}
        onSelectStep={onSelectStep}
        onToggleAction={onToggleAction}
      />

      <div className="drawer-row">
        <RewardsPanel state={state} stats={stats} newBadge={newBadge} />
        <WhyPanel state={state} />
      </div>
    </section>
  );
}
