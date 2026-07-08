import { useEffect, useRef } from "react";

/**
 * Reusable Google AdSense slot.
 * Sizes match the reference layout: leaderboard (728x90), rectangle (300x250), skyscraper (300x600).
 * Falls back to a labeled placeholder in dev or when AdSense isn't configured yet,
 * so the layout always reserves the correct space (good for CLS + AdSense review).
 */
const SIZE_MAP = {
  leaderboard: { w: 728, h: 90, label: "728 x 90" },
  rectangle: { w: 300, h: 250, label: "300 x 250" },
  skyscraper: { w: 300, h: 600, label: "300 x 600" },
  banner: { w: 320, h: 100, label: "320 x 100" },
};

const AdSlot = ({ type = "leaderboard", clientId, slotId, enabled = false, className = "" }) => {
  const ref = useRef(null);
  const { w, h, label } = SIZE_MAP[type] || SIZE_MAP.leaderboard;

  useEffect(() => {
    if (enabled && clientId && slotId) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense script not loaded yet — safe to ignore
      }
    }
  }, [enabled, clientId, slotId]);

  if (enabled && clientId && slotId) {
    return (
      <div className={`mx-auto ${className}`} style={{ maxWidth: w }}>
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: h }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder — reserves the exact ad size so real ads slot in without layout shift
  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 text-xs font-medium ${className}`}
      style={{ maxWidth: w, height: h }}
      aria-hidden="true"
    >
      Advertisement · {label}
    </div>
  );
};

export default AdSlot;
