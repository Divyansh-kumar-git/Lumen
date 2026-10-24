import { Icon } from "./Icon.jsx";

export function AppHeader({
  highContrast,
  onToggleContrast,
  demoRunning,
  onStartDemo,
  onReset,
  hasRoadmap,
  viewMode,
  onOpenArcade,
  onShowRoadmap,
  onHome
}) {
  return (
    <header className="topbar" aria-label="Site header">
      <a className="brand" href="#main" onClick={event => { event.preventDefault(); onHome(); }} aria-label="LUMEN home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 44 44" fill="none">
            <path d="M10 29 18 17l7 10 9-14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="29" r="3" fill="currentColor" />
            <circle cx="25" cy="27" r="3" fill="currentColor" />
            <circle cx="34" cy="13" r="3" fill="currentColor" />
          </svg>
        </span>
        <span className="brand-copy"><strong>LUMEN</strong><span>learning, simplified</span></span>
      </a>

      <nav className="nav-actions" aria-label="Prototype controls">
        {hasRoadmap && viewMode === "setup" && (
          <button className="btn btn-small btn-quiet" type="button" onClick={onShowRoadmap}>
            <Icon name="focus" size={16} /> My focus path
          </button>
        )}
        {hasRoadmap && viewMode !== "setup" && (
          <button className="btn btn-small btn-quiet" type="button" onClick={viewMode === "arcade" ? onShowRoadmap : onOpenArcade}>
            <Icon name={viewMode === "arcade" ? "focus" : "spark"} size={16} />
            {viewMode === "arcade" ? "My focus path" : "Reward arcade"}
          </button>
        )}
        <button className="btn btn-small btn-quiet" type="button" onClick={onToggleContrast} aria-pressed={highContrast}>
          <Icon name="contrast" size={16} />
          {highContrast ? "Standard view" : "High contrast"}
        </button>
        <button className="btn btn-small" type="button" onClick={onStartDemo} aria-pressed={demoRunning}>
          <Icon name="play" size={15} />
          {demoRunning ? "Restart demo" : "Watch 60-sec demo"}
        </button>
        <button className="btn btn-small btn-quiet" type="button" onClick={onReset} title="Clear saved progress and start again">
          <Icon name="reset" size={16} /> Reset
        </button>
      </nav>
    </header>
  );
}
