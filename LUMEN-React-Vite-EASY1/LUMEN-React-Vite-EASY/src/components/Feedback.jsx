import { useEffect } from "react";

export function Toast({ message }) {
  return (
    <div className={`toast ${message ? "show" : ""}`} id="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
}

export function RewardBurst({ active, onDone, reducedMotion }) {
  useEffect(() => {
    if (!active) return undefined;
    const timer = window.setTimeout(() => onDone?.(), 1150);
    return () => window.clearTimeout(timer);
  }, [active, onDone]);

  if (!active || reducedMotion) return null;
  const colors = ["#4f46e5", "#10b981", "#f59e0b", "#111827"];

  return (
    <div className="celebration" aria-hidden="true">
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          className="spark"
          key={index}
          style={{
            left: `${46 + Math.random() * 8}%`,
            top: `${48 + Math.random() * 8}%`,
            background: colors[index % colors.length],
            "--tx": `${(Math.random() - 0.5) * 560}px`,
            "--ty": `${(Math.random() - 0.65) * 440}px`,
            animationDelay: `${Math.random() * 90}ms`
          }}
        />
      ))}
    </div>
  );
}
