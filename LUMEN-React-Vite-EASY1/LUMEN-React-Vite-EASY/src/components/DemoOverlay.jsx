import { Icon } from "./Icon.jsx";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

export function DemoOverlay({ demo, beat, remaining, progress, onPause, onSkip, onExit, onBuildOwnPath }) {
  if (!demo.running && !demo.finished) return null;

  const finished = demo.finished;
  return (
    <section className="demo-panel" id="demoPanel" role="region" aria-label="Guided 60-second demo">
      <div className="demo-progress-track" aria-hidden="true"><div className="demo-progress-fill" style={{ width: `${finished ? 100 : progress}%` }} /></div>
      <div className="demo-row">
        <div>
          <div className="demo-kicker">
            {finished ? "Demo complete · exactly 60 seconds" : `Beat ${demo.beatIndex + 1} of 8 · ${beat.seconds}s`}
          </div>
          <h2>{finished ? "From “where do I start?” to a confident next step." : beat.title}</h2>
          <p aria-live="polite">
            {finished
              ? "The learner has a personalized path, one completed milestone, XP, a daily quest, a streak, higher confidence, a reward arcade and another clear action waiting."
              : beat.caption}
          </p>
        </div>
        <div className="demo-timer" aria-label="Time remaining">{finished ? "0:00" : formatTime(remaining)}</div>
      </div>
      <div className="demo-controls">
        {!finished && (
          <>
            <button className="btn btn-small btn-quiet" id="demoPause" type="button" onClick={onPause} aria-pressed={demo.paused}>
              <Icon name={demo.paused ? "play" : "pause"} size={15} /> {demo.paused ? "Resume" : "Pause"}
            </button>
            <button className="btn btn-small btn-quiet" id="demoNext" type="button" onClick={onSkip}><Icon name="skip" size={15} /> Skip beat</button>
          </>
        )}
        <button className="btn btn-small btn-quiet" id="demoExit" type="button" onClick={onExit}><Icon name="close" size={15} /> Exit</button>
        {finished && <button className="btn btn-small btn-primary" id="demoOwnPath" type="button" onClick={onBuildOwnPath}>Build my own path <Icon name="arrow" size={16} /></button>}
      </div>
    </section>
  );
}
