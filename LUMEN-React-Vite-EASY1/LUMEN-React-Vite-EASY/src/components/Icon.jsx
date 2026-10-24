import React from "react";

const ICONS = {
  spark: <><path d="M12 2.8 13.8 9l6.2 1.8-6.2 1.8L12 18.8 10.2 12.6 4 10.8 10.2 9 12 2.8Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/></>,
  star: <path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3Z"/>,
  target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></>,
  flame: <path d="M12 22c4 0 7-2.7 7-6.5 0-2.7-1.4-4.4-3.1-6.2.2 2.1-1 3.3-2.2 3.7.3-3.5-2-5.9-4.2-8 .3 3.2-2.5 4.8-3.8 7.1C4.5 14.2 5 19.5 12 22Z"/>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>,
  focus: <><circle cx="12" cy="12" r="3"/><path d="M3 9V5a2 2 0 0 1 2-2h4M15 3h4a2 2 0 0 1 2 2v4M21 15v4a2 2 0 0 1-2 2h-4M9 21H5a2 2 0 0 1-2-2v-4"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/></>,
  play: <path d="m8 5 11 7-11 7V5Z"/>,
  pause: <><path d="M8 5v14M16 5v14"/></>,
  skip: <><path d="m5 5 10 7-10 7V5Z"/><path d="M19 5v14"/></>,
  close: <><path d="M6 6l12 12M18 6 6 18"/></>,
  contrast: <><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18V3Z"/></>,
  reset: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  video: <><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z"/></>,
  hand: <><path d="M8 12V5a1.5 1.5 0 0 1 3 0v5"/><path d="M11 10V4a1.5 1.5 0 0 1 3 0v6"/><path d="M14 10V6a1.5 1.5 0 0 1 3 0v7"/><path d="M17 10a1.5 1.5 0 0 1 3 0v5c0 4-2.5 6-6 6h-2c-2.2 0-3.5-1-4.5-2.5L5 15a1.6 1.6 0 0 1 2.5-2L8 14"/></>,
  audio: <><path d="M5 9v6M9 5v14M13 8v8M17 10v4M21 12h.01"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3M12 12v4M8 20h8M9 16h6"/></>,
  shield: <><path d="M12 3 5 6v5c0 4.2 2.8 8 7 10 4.2-2 7-5.8 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  crown: <path d="m3 7 4 4 5-7 5 7 4-4-2 12H5L3 7Z"/>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>
};

export function Icon({ name = "star", size = 20, className = "", ...props }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {ICONS[name] || ICONS.star}
    </svg>
  );
}
