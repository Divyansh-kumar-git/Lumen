import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEY, initialAppState, loadAppState, saveAppState } from "./lib/state.js";
import { buildRoadmap } from "./lib/pathEngine.js";
import { applyActionToggle, findNewBadges, getCurrentStep, getSelectedStep, getStats, toDateKey } from "./lib/progress.js";
import { useGuidedDemo } from "./hooks/useGuidedDemo.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { AppHeader } from "./components/AppHeader.jsx";
import { GoalSetup } from "./components/GoalSetup.jsx";
import { FocusPath } from "./components/FocusPath.jsx";
import { Arcade } from "./components/Arcade.jsx";
import { DemoOverlay } from "./components/DemoOverlay.jsx";
import { Toast, RewardBurst } from "./components/Feedback.jsx";
import { Icon } from "./components/Icon.jsx";

function readInitialState() {
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reset")) {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage can be disabled */ }
  }
  return loadAppState();
}

export default function App() {
  const [appState, setAppState] = useState(readInitialState);
  const [toast, setToast] = useState("");
  const [celebrating, setCelebrating] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const toastTimerRef = useRef(null);
  const appStateRef = useRef(appState);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => { appStateRef.current = appState; }, [appState]);

  const announce = useCallback(message => {
    const node = document.querySelector("#srAnnouncer");
    if (!node) return;
    node.textContent = "";
    window.setTimeout(() => { node.textContent = message; }, 30);
  }, []);

  const showToast = useCallback(message => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2700);
  }, []);

  const triggerCelebration = useCallback(() => setCelebrating(true), []);
  const stopCelebration = useCallback(() => setCelebrating(false), []);

  const demo = useGuidedDemo({ setAppState, onToast: showToast, onCelebrate: triggerCelebration, reducedMotion });
  const stats = useMemo(() => getStats(appState), [appState]);
  const currentStep = useMemo(() => getCurrentStep(appState), [appState]);
  const selectedStep = useMemo(() => getSelectedStep(appState), [appState]);

  useEffect(() => { saveAppState(appState); }, [appState]);
  useEffect(() => {
    document.body.classList.toggle("high-contrast", Boolean(appState.settings.highContrast));
    document.title = appState.viewMode === "arcade"
      ? "Reward Arcade — LUMEN"
      : appState.roadmap
        ? `${appState.roadmap.title} — LUMEN`
        : "LUMEN — Smart Learning Paths";
  }, [appState.roadmap, appState.settings.highContrast, appState.viewMode]);
  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("demo") !== "1") return undefined;
    const timer = window.setTimeout(() => demo.start(), 800);
    return () => window.clearTimeout(timer);
    // Intentionally run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateLearner = useCallback(patch => {
    setAppState(previous => ({ ...previous, learner: { ...previous.learner, ...patch } }));
  }, []);

  const generateRoadmap = useCallback(learner => {
    const roadmap = buildRoadmap(learner);
    setAppState(previous => ({
      ...previous,
      learner: { ...previous.learner, ...learner },
      roadmap,
      completedActions: [],
      completionDates: {},
      earnedBadges: [],
      gameStats: initialAppState().gameStats,
      selectedStepId: roadmap.steps[0].id,
      viewMode: "focus"
    }));
    setNewBadge(null);
    showToast("Your six-step learning plan is ready.");
    announce(`Roadmap ready. Six steps generated for ${roadmap.goalName}.`);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [announce, reducedMotion, showToast]);

  const toggleAction = useCallback((stepId, index, checked) => {
    const previous = appStateRef.current;
    const step = previous.roadmap?.steps.find(item => item.id === stepId);
    if (!step) return;

    const result = applyActionToggle(previous, stepId, index, checked);
    appStateRef.current = result.state;
    setAppState(result.state);

    if (checked && !result.wasComplete && result.nowComplete) {
      triggerCelebration();
      showToast(`Step complete: ${step.title} · +100 XP`);
      announce(`Step complete. ${step.title}. Next step is ${getCurrentStep(result.state)?.title || "available"}.`);
    } else if (result.newBadges.length) {
      setNewBadge(result.newBadges[0]);
      showToast(`Badge unlocked: ${result.newBadges[0].label}`);
      announce(`Badge unlocked: ${result.newBadges[0].label}.`);
    } else if (checked) {
      showToast(`Action complete · +25 XP. ${result.stats.percent}% of your path is complete.`);
      announce(`Action complete. ${result.stats.percent}% of your path is complete.`);
    } else {
      announce(`Action unchecked. ${result.stats.percent}% of your path is complete.`);
    }
  }, [announce, showToast, triggerCelebration]);

  const awardGameXp = useCallback((gameId, xp, score) => {
    const previous = appStateRef.current;
    const today = toDateKey();
    const fallback = initialAppState().gameStats;
    const saved = previous.gameStats || fallback;
    const todayAwards = { ...(saved.dailyAwards?.[today] || {}) };
    const already = todayAwards[gameId] || 0;
    const bonus = already > 0 ? 0 : xp;
    if (bonus > 0) todayAwards[gameId] = xp;

    const previousBest = saved.bestScores?.[gameId];
    const best = gameId === "memory"
      ? (typeof previousBest === "number" ? Math.min(previousBest, score) : score)
      : Math.max(previousBest || 0, score);

    const nextGameStats = {
      ...fallback,
      ...saved,
      totalXp: (saved.totalXp || 0) + bonus,
      plays: (saved.plays || 0) + 1,
      bestScores: { ...(saved.bestScores || {}), [gameId]: best },
      dailyAwards: { ...(saved.dailyAwards || {}), [today]: todayAwards }
    };

    let next = { ...previous, gameStats: nextGameStats };
    const nextStats = getStats(next);
    const newBadges = findNewBadges(next, nextStats);
    if (newBadges.length) next = { ...next, earnedBadges: [...next.earnedBadges, ...newBadges.map(badge => badge.id)] };
    appStateRef.current = next;
    setAppState(next);

    if (newBadges.length) {
      setNewBadge(newBadges[0]);
      showToast(`Badge unlocked: ${newBadges[0].label}${bonus ? ` · +${bonus} XP` : ""}`);
      announce(`Badge unlocked: ${newBadges[0].label}.`);
    } else if (bonus > 0) {
      showToast(`Game complete · +${bonus} XP added.`);
      announce(`Game complete. ${bonus} XP added.`);
    } else {
      showToast("Score saved. Today’s XP bonus was already claimed.");
      announce("Score saved. Today’s XP bonus was already claimed.");
    }

    return { xp, bonus, score };
  }, [announce, showToast]);

  const selectStep = useCallback(stepId => {
    setAppState(previous => ({ ...previous, selectedStepId: stepId }));
    window.setTimeout(() => {
      document.querySelector("#stepDetail")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    }, 60);
  }, [reducedMotion]);

  const setViewMode = useCallback(mode => {
    setAppState(previous => ({ ...previous, viewMode: mode }));
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  const openArcade = useCallback(gameId => {
    setAppState(previous => ({ ...previous, arcadeGame: gameId || previous.arcadeGame || "tap", viewMode: "arcade" }));
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  const resetAll = useCallback(() => {
    if (!window.confirm("Clear your saved roadmap and progress, then start again?")) return;
    setAppState(previous => ({ ...initialAppState(previous.settings), settings: previous.settings, viewMode: "setup" }));
    setNewBadge(null);
    setCelebrating(false);
    showToast("Prototype reset. Start with a fresh goal.");
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion, showToast]);

  const toggleContrast = useCallback(() => {
    setAppState(previous => ({ ...previous, settings: { ...previous.settings, highContrast: !previous.settings.highContrast } }));
  }, []);

  const handleDemoStart = useCallback(() => {
    setNewBadge(null);
    if (demo.demo.running) {
      demo.exit(false);
      window.setTimeout(() => demo.start(), 20);
    } else {
      demo.start();
    }
  }, [demo]);

  const hasRoadmap = Boolean(appState.roadmap);
  const showingArcade = hasRoadmap && appState.viewMode === "arcade";

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div id="srAnnouncer" className="sr-only" role="status" aria-live="polite" aria-atomic="true" />

      <AppHeader
        highContrast={Boolean(appState.settings.highContrast)}
        onToggleContrast={toggleContrast}
        demoRunning={demo.demo.running}
        onStartDemo={handleDemoStart}
        onReset={resetAll}
        hasRoadmap={hasRoadmap}
        viewMode={appState.viewMode}
        onOpenArcade={() => openArcade()}
        onShowRoadmap={() => setViewMode("focus")}
        onHome={() => setViewMode(hasRoadmap ? "focus" : "setup")}
      />

      <main id="main">
        {appState.viewMode === "setup" || !hasRoadmap ? (
          <GoalSetup
            learner={appState.learner}
            onLearnerChange={updateLearner}
            onGenerate={generateRoadmap}
            onStartDemo={handleDemoStart}
          />
        ) : showingArcade ? (
          <Arcade
            state={appState}
            stats={stats}
            initialGame={appState.arcadeGame || "tap"}
            onAwardGame={awardGameXp}
            onBack={() => setViewMode("focus")}
            reducedMotion={reducedMotion}
          />
        ) : (
          <FocusPath
            state={appState}
            stats={stats}
            currentStep={currentStep}
            selectedStep={selectedStep}
            onSelectStep={selectStep}
            onToggleAction={toggleAction}
            onOpenArcade={openArcade}
            onNewGoal={() => setViewMode("setup")}
            newBadge={newBadge}
          />
        )}
      </main>

      <footer>
        <div className="shell footer-inner">
          <span><strong>LUMEN</strong> — smart roadmaps, focused action and reward games.</span>
          <span><Icon name="spark" size={13} /> Built with React + Vite · offline Path Engine · local storage</span>
        </div>
      </footer>

      <Toast message={toast} />
      <RewardBurst active={celebrating} onDone={stopCelebration} reducedMotion={reducedMotion} />
      <DemoOverlay
        demo={demo.demo}
        beat={demo.beat}
        remaining={demo.remaining}
        progress={demo.progress}
        onPause={demo.pause}
        onSkip={demo.skip}
        onExit={() => demo.exit(true)}
        onBuildOwnPath={demo.buildOwnPath}
      />
    </>
  );
}
