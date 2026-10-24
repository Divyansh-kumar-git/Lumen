import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = event => setReduced(event.matches);
    if (query.addEventListener) query.addEventListener("change", handleChange);
    else query.addListener(handleChange);
    return () => {
      if (query.removeEventListener) query.removeEventListener("change", handleChange);
      else query.removeListener(handleChange);
    };
  }, []);

  return reduced;
}
