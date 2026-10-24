import { useEffect, useRef, useState } from "react";
import { GOALS } from "../data/catalog.js";
import { Icon } from "./Icon.jsx";

const SAMPLE_LEARNER = {
  goalKey: "data",
  customGoal: "",
  level: "beginner",
  timeMode: "15",
  styleMode: "read"
};

export function GoalSetup({ learner, onLearnerChange, onGenerate, onStartDemo }) {
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const customInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (learner.goalKey === "custom") customInputRef.current?.focus();
    setError("");
  }, [learner.goalKey]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const submit = event => {
    event.preventDefault();
    if (!learner.goalKey) {
      setError("Choose a learning goal first.");
      document.querySelector(".goal-card")?.focus();
      return;
    }
    if (learner.goalKey === "custom" && !learner.customGoal.trim()) {
      setError("Type the skill you want to learn.");
      customInputRef.current?.focus();
      return;
    }
    setError("");
    setGenerating(true);
    timerRef.current = window.setTimeout(() => {
      setGenerating(false);
      onGenerate({ ...learner, customGoal: learner.customGoal.trim() });
    }, 620);
  };

  const styleIcon = learner.styleMode === "watch" ? "video" : learner.styleMode === "read" ? "book" : learner.styleMode === "do" ? "hand" : "audio";

  return (
    <section className="landing shell" id="landing" aria-labelledby="landingTitle">
      <div className="landing-head">
        <p className="eyebrow"><Icon name="spark" size={14} /> Smart roadmap · guided steps · real progress</p>
        <h1 id="landingTitle">Know exactly what to <span className="accent-text">learn next.</span></h1>
        <p className="lede">LUMEN builds a personalized six-step plan, shows one clear next action, and keeps progress visible — without making learning feel like a dashboard you have to decode.</p>
        <div className="trust-row" aria-label="Prototype benefits">
          <span><i className="trust-dot" aria-hidden="true" />No signup</span>
          <span><i className="trust-dot" aria-hidden="true" />No API key</span>
          <span><i className="trust-dot" aria-hidden="true" />Progress saved locally</span>
          <span><i className="trust-dot" aria-hidden="true" />React + Vite</span>
        </div>
        <div className="rule-callout" id="problemCallout"><strong>The LUMEN rule:</strong> a learner should never wonder, “What exactly should I do next?”</div>
      </div>

      <form className="setup-card surface" id="setupForm" onSubmit={submit} noValidate>
        <div className="card-heading">
          <div>
            <h2>Build your learning plan</h2>
            <p>Four quick answers. One clear path.</p>
          </div>
          <span className="step-count">~20 sec</span>
        </div>

        <fieldset>
          <legend>1. What do you want to learn?</legend>
          <div className="goal-grid" aria-label="Learning goals">
            {GOALS.map(goal => (
              <button
                className="goal-card"
                type="button"
                key={goal.key}
                data-goal={goal.key}
                aria-pressed={learner.goalKey === goal.key}
                onClick={() => onLearnerChange({ goalKey: goal.key })}
              >
                <span className="goal-icon" aria-hidden="true">{goal.icon}</span>
                <span className="goal-text"><strong>{goal.label}</strong><small>{goal.hint}</small></span>
                {learner.goalKey === goal.key && <Icon name="check" size={16} className="goal-check" />}
              </button>
            ))}
          </div>
          {learner.goalKey === "custom" && (
            <div className="custom-goal-wrap">
              <label className="sr-only" htmlFor="customGoal">Name your skill</label>
              <input
                ref={customInputRef}
                className="input"
                id="customGoal"
                type="text"
                maxLength="60"
                placeholder="e.g. conversational Spanish, chess openings, 3D modelling"
                value={learner.customGoal}
                onChange={event => onLearnerChange({ customGoal: event.target.value })}
                aria-invalid={Boolean(error)}
                autoComplete="off"
              />
            </div>
          )}
        </fieldset>

        <fieldset className="field">
          <legend>2. Where are you starting?</legend>
          <div className="radio-row" id="levelRow">
            {[
              ["beginner", "Complete beginner"],
              ["some", "I know a little"],
              ["returning", "I’m restarting"]
            ].map(([value, label]) => (
              <label className="radio-pill" key={value}>
                <input
                  type="radio"
                  name="level"
                  value={value}
                  checked={learner.level === value}
                  onChange={() => onLearnerChange({ level: value })}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="timeMode">3. Time you can give</label>
            <select className="select" id="timeMode" value={learner.timeMode} onChange={event => onLearnerChange({ timeMode: event.target.value })}>
              <option value="15">15 minutes / day</option>
              <option value="30">30 minutes / day</option>
              <option value="60">1 hour / day</option>
              <option value="weekend">Weekend blocks</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="styleMode">4. How you learn best</label>
            <div className="select-with-icon">
              <Icon name={styleIcon} size={18} />
              <select className="select" id="styleMode" value={learner.styleMode} onChange={event => onLearnerChange({ styleMode: event.target.value })}>
                <option value="watch">Watch a short video</option>
                <option value="read">Read a clear guide</option>
                <option value="do">Try it immediately</option>
                <option value="listen">Listen and repeat</option>
              </select>
            </div>
          </div>
        </div>

        {error && <p className="validation" role="alert">{error}</p>}

        <div className="form-actions">
          <button className="btn btn-primary btn-full" type="submit" id="generateButton" disabled={generating}>
            <Icon name={generating ? "spark" : "arrow"} size={17} />
            {generating ? "Building your plan…" : "Generate my roadmap"}
          </button>
          <button className="link-button" type="button" onClick={() => onGenerate(SAMPLE_LEARNER)}>Load a sample path</button>
        </div>
        <p className="form-note">Your goal and progress stay in this browser. Nothing is uploaded.</p>

        <div className="setup-microwins" aria-label="What you will get">
          <span><Icon name="map" size={15} /> 6 milestones</span>
          <span><Icon name="target" size={15} /> 1 next action</span>
          <span><Icon name="bolt" size={15} /> XP + rewards</span>
          <span><Icon name="spark" size={15} /> 3 mini-games</span>
        </div>

        <details className="engine-note">
          <summary>How is the roadmap personalized?</summary>
          <p>The local Path Engine combines your goal, starting point, available time and learning format with curated skill milestones. It behaves like a smart planner but needs no API key, so the live demo never fails because of network or billing.</p>
        </details>

        <button className="link-button demo-inline-button" type="button" onClick={onStartDemo}>
          <Icon name="play" size={14} /> Or watch the automatic 60-second demo
        </button>
      </form>
    </section>
  );
}
