import { BADGES } from "../data/catalog.js";
import { GAMES } from "../data/games.js";
import { DAILY_QUEST_TARGET, getActivityData, isActionDone, isStepComplete, toDateKey } from "../lib/progress.js";
import { Icon } from "./Icon.jsx";

export function MetricsRow({ stats }) {
  return (
    <section className="metrics-row" id="momentumHud" aria-label="Your momentum">
      <div className="metric-card" id="progressCard">
        <span className="metric-label"><Icon name="map" size={14} /> Path progress</span>
        <strong className="metric-value">{stats.percent}%</strong>
        <span className="metric-sub">{stats.steps} of {stats.totalSteps} steps complete</span>
        <div className="metric-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={stats.percent} aria-label="Path progress"><span style={{ width: `${stats.percent}%` }} /></div>
      </div>

      <div className="metric-card">
        <span className="metric-label"><Icon name="bolt" size={14} /> Level</span>
        <strong className="metric-value">Level {stats.level}</strong>
        <span className="metric-sub">{stats.levelName} · {stats.xp} XP earned</span>
        <div className="metric-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={stats.levelProgress} aria-label={`Progress to level ${stats.level + 1}`}><span style={{ width: `${stats.levelProgress}%` }} /></div>
      </div>

      <div className="metric-card">
        <span className="metric-label"><Icon name="flame" size={14} /> Momentum</span>
        <strong className="metric-value">{stats.streak} day{stats.streak === 1 ? "" : "s"}</strong>
        <span className="metric-sub">{stats.actions} actions · {stats.gameXp} game XP</span>
        <div className="metric-track" role="presentation"><span style={{ width: `${Math.min(100, stats.streak * 14 + 6)}%` }} /></div>
      </div>

      <div className="metric-card">
        <span className="metric-label"><Icon name="compass" size={14} /> Confidence</span>
        <strong className="metric-value">{stats.confidence}%</strong>
        <span className="metric-sub">Rises with every action you finish</span>
        <div className="metric-track success" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={stats.confidence} aria-label="Learning confidence"><span style={{ width: `${stats.confidence}%` }} /></div>
      </div>
    </section>
  );
}

export function QuestPanel({ state, stats }) {
  const progress = Math.min(100, Math.round((stats.todayActions / DAILY_QUEST_TARGET) * 100));
  const remaining = Math.max(0, DAILY_QUEST_TARGET - stats.todayActions);
  return (
    <section className="side-card quest-card" id="questCard" aria-labelledby="questTitle">
      <div className="quest-head">
        <span className="quest-icon"><Icon name="target" size={18} /></span>
        <div><h2 id="questTitle">Daily quest</h2><p>Complete {DAILY_QUEST_TARGET} actions today.</p></div>
        <span className="quest-bonus">+50 XP</span>
      </div>
      <div className="quest-dots" aria-label={`${stats.todayActions} of ${DAILY_QUEST_TARGET} daily actions complete`}>
        {Array.from({ length: DAILY_QUEST_TARGET }).map((_, index) => (
          <span className={`quest-dot ${index < stats.todayActions ? "done" : ""}`} key={index}>{index < stats.todayActions ? <Icon name="check" size={14} /> : index + 1}</span>
        ))}
      </div>
      <div className="quest-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} aria-label="Daily quest progress"><span style={{ width: `${progress}%` }} /></div>
      <p className={`quest-note ${stats.dailyQuestComplete ? "complete" : ""}`}>
        {stats.dailyQuestComplete ? "Quest complete! Bonus XP added." : `${remaining} more action${remaining === 1 ? "" : "s"} to unlock the bonus.`}
      </p>
      <div className="quest-week">
        <div className="quest-week-head"><span>This week</span><strong>{stats.streak} day streak</strong></div>
        <StreakTrail state={state} />
      </div>
    </section>
  );
}

export function ArcadeCard({ state, stats, onOpenArcade }) {
  const dailyAwards = state.gameStats?.dailyAwards?.[toDateKey()] || {};
  const claimed = GAMES.filter(game => dailyAwards[game.id]).length;
  return (
    <section className="side-card arcade-card" id="arcadeCard" aria-labelledby="arcadeCardTitle">
      <div className="arcade-card-head">
        <div><h2 id="arcadeCardTitle">Reward arcade</h2><p className="side-card-sub">Three short games for a motivating reset.</p></div>
        <span className="arcade-count">{claimed}/3</span>
      </div>
      <div className="arcade-mini-grid">
        {GAMES.map(game => (
          <button className="arcade-mini" type="button" key={game.id} onClick={() => onOpenArcade(game.id)}>
            <span className="arcade-mini-icon"><Icon name={game.icon} size={17} /></span>
            <span><strong>{game.title}</strong><small>{dailyAwards[game.id] ? `+${dailyAwards[game.id]} XP claimed` : `Up to +${game.maxXp} XP`}</small></span>
          </button>
        ))}
      </div>
      <div className="arcade-card-foot"><span>Game XP: <strong>{stats.gameXp}</strong></span><button className="link-button" type="button" onClick={() => onOpenArcade()}>Open arcade</button></div>
    </section>
  );
}

export function PlanPanel({ state, currentStep, selectedStep, onSelectStep, onToggleAction }) {
  const step = selectedStep || currentStep || state.roadmap.steps[0];
  const complete = isStepComplete(state, step);
  const done = step.actions.filter((_, index) => isActionDone(state, step.id, index)).length;

  return (
    <section className="surface plan-panel" id="fullPlan" aria-labelledby="planTitle">
      <div className="section-heading">
        <div>
          <h2 id="planTitle">Your full six-step plan</h2>
          <p>Open any step to see its exact actions. You are never locked out.</p>
        </div>
        <div className="path-key" aria-label="Path status key">
          <span><i className="key-dot done" aria-hidden="true" />Done</span>
          <span><i className="key-dot current" aria-hidden="true" />Now</span>
          <span><i className="key-dot next" aria-hidden="true" />Next</span>
        </div>
      </div>

      <ol className="step-list" id="stepList">
        {state.roadmap.steps.map(item => {
          const itemComplete = isStepComplete(state, item);
          const isCurrent = currentStep?.id === item.id && !itemComplete;
          const isSelected = step.id === item.id;
          const status = itemComplete ? "Done" : isCurrent ? "Now" : "Next";
          const classes = ["step-item", itemComplete ? "complete" : "", isCurrent ? "current" : "", isSelected ? "selected" : ""].filter(Boolean).join(" ");
          return (
            <li className={classes} key={item.id}>
              <span className="step-node" aria-hidden="true">{itemComplete ? <Icon name="check" size={20} /> : item.number}</span>
              <button className="step-card" type="button" onClick={() => onSelectStep(item.id)} aria-current={isCurrent ? "step" : "false"} aria-label={`Step ${item.number}: ${item.title}. Status: ${status}. View actions.`}>
                <span><strong>{item.number}. {item.title}</strong><small>{item.focus}</small></span>
                <span className="status-chip">{status}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="plan-detail" id="stepDetail" aria-live="polite">
        <div className="detail-step-label">Step {step.number} · {complete ? "Complete" : `${done}/${step.actions.length} actions done`}</div>
        <h3>{step.title}</h3>
        <p className="detail-why">{step.why}</p>
        <div className="detail-meta">
          <span className="chip"><Icon name="clock" size={14} /> {step.duration}</span>
          <span className="chip"><Icon name="check" size={14} /> {step.actions.length} actions</span>
        </div>
        <ul className="action-list">
          {step.actions.map((action, index) => (
            <li className="action-item" key={`${step.id}-${index}`}>
              <label>
                <input
                  type="checkbox"
                  checked={isActionDone(state, step.id, index)}
                  onChange={event => onToggleAction(step.id, index, event.target.checked)}
                  aria-label={`Step ${step.number}, action ${index + 1}: ${action}`}
                />
                <span>{action}</span>
              </label>
            </li>
          ))}
        </ul>
        {complete ? <div className="detail-complete"><Icon name="check" size={15} /> Step complete. Your next move has moved forward.</div> : null}
      </div>
    </section>
  );
}

export function StreakTrail({ state }) {
  const { dailyCounts } = getActivityData(state);
  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div className="week-dots" aria-label="Activity in the last seven days">
      {Array.from({ length: 7 }).map((_, index) => {
        const offset = 6 - index;
        const date = new Date();
        date.setDate(date.getDate() - offset);
        const key = toDateKey(date);
        const active = (dailyCounts[key] || 0) > 0;
        return (
          <div className={`day ${active ? "active" : ""}`} key={key} aria-label={`${date.toDateString()}: ${active ? "active" : "no activity"}`}>
            <div className="day-dot" aria-hidden="true">{active ? "✦" : "·"}</div>
            <span>{labels[date.getDay()]}</span>
          </div>
        );
      })}
    </div>
  );
}

export function RewardsPanel({ state, stats, newBadge }) {
  return (
    <details className="side-card drawer" id="rewardsDrawer" open={Boolean(newBadge?.id)}>
      <summary><span><Icon name="trophy" size={17} /> Rewards & streak</span><Icon name="chevron" size={17} /></summary>
      <div className="drawer-body">
        {newBadge?.id && <div className="new-badge-alert"><Icon name="spark" size={15} /> New badge unlocked: <strong>{newBadge.label}</strong></div>}
        <div className="badge-grid">
          {BADGES.map(badge => {
            const unlocked = state.earnedBadges.includes(badge.id) || badge.test(stats);
            return <div className={`badge ${unlocked ? "unlocked" : ""} ${newBadge?.id === badge.id ? "just-earned" : ""}`} key={badge.id}><strong>{unlocked ? "✦" : "◇"} {badge.label}</strong>{badge.hint}</div>;
          })}
        </div>
        <div className="drawer-divider" />
        <div className="streak-head"><div><h3>Learning streak</h3><p className="side-card-sub">Small daily returns beat heroic cramming.</p></div><strong>{stats.streak}</strong></div>
        <StreakTrail state={state} />
        <p className="streak-note">{stats.streak === 0 ? "Finish one action today to spark your streak." : stats.streak === 1 ? "Day one counts. Return tomorrow to keep it going." : `${stats.streak} days in a row. Small returns are compounding.`}</p>
      </div>
    </details>
  );
}

export function WhyPanel({ state }) {
  const items = [
    `Goal: ${state.roadmap.goalName}`,
    `Starting point: ${state.roadmap.levelLabel}`,
    `Time: ${state.roadmap.timeLabel}`,
    `Format: ${state.roadmap.styleLabel}`,
    `Pace: ${state.roadmap.sessions}`
  ];
  return (
    <details className="side-card drawer" id="logicDrawer">
      <summary><span><Icon name="info" size={17} /> Why this path?</span><Icon name="chevron" size={17} /></summary>
      <div className="drawer-body">
        <p className="drawer-copy">Personalized live from your four answers. Extra detail stays tucked away until you want it.</p>
        <div className="logic-list">{items.map(item => <div className="logic-item" key={item}>{item}</div>)}</div>
      </div>
    </details>
  );
}
