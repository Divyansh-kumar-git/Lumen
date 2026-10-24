import { useCallback, useEffect, useRef, useState } from "react";
import { cloneState, initialAppState } from "../lib/state.js";
import { DEMO_BEATS, DEMO_TOTAL_SECONDS, applyDemoBeat } from "../lib/demo.js";

const initialDemoState = {
  running: false,
  paused: false,
  finished: false,
  beatIndex: 0,
  beatElapsed: 0,
  totalElapsed: 0
};

export function useGuidedDemo({ setAppState, onToast, onCelebrate, reducedMotion }) {
  const [demo, setDemo] = useState(initialDemoState);
  const savedStateRef = useRef(null);
  const appliedBeatRef = useRef(-1);
  const spotlightRef = useRef(null);
  const callbacksRef = useRef({ onToast, onCelebrate, reducedMotion });

  useEffect(() => {
    callbacksRef.current = { onToast, onCelebrate, reducedMotion };
  }, [onToast, onCelebrate, reducedMotion]);

  const clearSpotlight = useCallback(() => {
    if (spotlightRef.current) spotlightRef.current.classList.remove("demo-spotlight");
    spotlightRef.current = null;
  }, []);

  const announce = useCallback(message => {
    const node = document.querySelector("#srAnnouncer");
    if (!node) return;
    node.textContent = "";
    window.setTimeout(() => { node.textContent = message; }, 30);
  }, []);

  const start = useCallback(() => {
    setAppState(previous => {
      savedStateRef.current = cloneState(previous);
      return previous;
    });
    appliedBeatRef.current = -1;
    clearSpotlight();
    setDemo({ ...initialDemoState, running: true });
    announce("60 second demo started.");
  }, [announce, clearSpotlight, setAppState]);

  const pause = useCallback(() => {
    setDemo(previous => {
      if (!previous.running) return previous;
      const paused = !previous.paused;
      announce(paused ? "Demo paused." : "Demo resumed.");
      return { ...previous, paused };
    });
  }, [announce]);

  const skip = useCallback(() => {
    setDemo(previous => {
      if (!previous.running) return previous;
      const beat = DEMO_BEATS[previous.beatIndex];
      const remaining = Math.max(0, beat.seconds - previous.beatElapsed);
      if (previous.beatIndex >= DEMO_BEATS.length - 1) {
        return { ...previous, running: false, paused: false, finished: true, totalElapsed: DEMO_TOTAL_SECONDS };
      }
      return {
        ...previous,
        beatIndex: previous.beatIndex + 1,
        beatElapsed: 0,
        totalElapsed: Math.min(DEMO_TOTAL_SECONDS, previous.totalElapsed + remaining)
      };
    });
  }, []);

  const exit = useCallback((restore = true) => {
    clearSpotlight();
    setDemo(initialDemoState);
    if (restore && savedStateRef.current) setAppState(cloneState(savedStateRef.current));
    savedStateRef.current = null;
    announce("Demo exited.");
  }, [announce, clearSpotlight, setAppState]);

  const buildOwnPath = useCallback(() => {
    clearSpotlight();
    setDemo(initialDemoState);
    setAppState(previous => ({ ...initialAppState(previous.settings), settings: previous.settings, viewMode: "setup" }));
    savedStateRef.current = null;
    announce("Start by choosing your own learning goal.");
  }, [announce, clearSpotlight, setAppState]);

  // Apply the pure transformation for each demo beat.
  useEffect(() => {
    if (!demo.running || appliedBeatRef.current === demo.beatIndex) return;
    appliedBeatRef.current = demo.beatIndex;
    setAppState(previous => applyDemoBeat(previous, demo.beatIndex));
    if (demo.beatIndex === 6) {
      window.setTimeout(() => callbacksRef.current.onCelebrate?.(), 260);
    }
  }, [demo.running, demo.beatIndex, setAppState]);

  // Spotlight the matching UI after React has committed the new screen.
  useEffect(() => {
    if (!demo.running) return undefined;
    const beat = DEMO_BEATS[demo.beatIndex];
    const timeout = window.setTimeout(() => {
      clearSpotlight();
      const target = document.querySelector(beat.target);
      if (!target) return;
      spotlightRef.current = target;
      target.classList.add("demo-spotlight");
      if (target.scrollIntoView) {
        target.scrollIntoView({
          behavior: callbacksRef.current.reducedMotion ? "auto" : "smooth",
          block: "center"
        });
      }
    }, 180);
    return () => window.clearTimeout(timeout);
  }, [demo.running, demo.beatIndex, clearSpotlight]);

  // One-second demo clock.
  useEffect(() => {
    if (!demo.running || demo.paused) return undefined;
    const timer = window.setInterval(() => {
      setDemo(previous => {
        if (!previous.running || previous.paused) return previous;
        const beat = DEMO_BEATS[previous.beatIndex];
        const beatElapsed = previous.beatElapsed + 1;
        const totalElapsed = previous.totalElapsed + 1;

        if (beatElapsed < beat.seconds) return { ...previous, beatElapsed, totalElapsed };

        if (previous.beatIndex >= DEMO_BEATS.length - 1) {
          return { ...previous, running: false, paused: false, finished: true, totalElapsed: DEMO_TOTAL_SECONDS };
        }
        return { ...previous, beatIndex: previous.beatIndex + 1, beatElapsed: 0, totalElapsed };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [demo.running, demo.paused]);

  useEffect(() => {
    if (!demo.finished) return;
    clearSpotlight();
    announce("The 60 second demo is complete. Build your own path or exit.");
    callbacksRef.current.onToast?.("Demo complete — the learner has a confident next step.");
  }, [demo.finished, announce, clearSpotlight]);

  useEffect(() => () => clearSpotlight(), [clearSpotlight]);

  const beat = DEMO_BEATS[demo.beatIndex];
  const remaining = Math.max(0, DEMO_TOTAL_SECONDS - demo.totalElapsed);
  const progress = Math.min(100, Math.round((demo.totalElapsed / DEMO_TOTAL_SECONDS) * 100));

  return { demo, beat, remaining, progress, start, pause, skip, exit, buildOwnPath };
}
