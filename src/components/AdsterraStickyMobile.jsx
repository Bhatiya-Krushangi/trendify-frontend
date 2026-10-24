import React, { useState } from "react";
import { X, ChevronUp } from "lucide-react";
import AdsterraSlot from "./AdsterraSlot";

/**
 * AdsterraStickyMobile Component
 * 
 * Floats at the bottom on mobile devices (< 768px screen width)
 * displaying the 320x50 Banner (320x50_1, ID: 31895012).
 * Includes an option to collapse or dismiss.
 */
const AdsterraStickyMobile = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center">
      {/* Tab toggle */}
      <div className="flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 border border-b-0 border-slate-200 dark:border-slate-800 rounded-t-md px-2 py-0.5 text-[10px] text-slate-500 shadow-sm backdrop-blur">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white"
          title={collapsed ? "Show Ad" : "Minimize Ad"}
        >
          {collapsed ? <ChevronUp size={12} /> : null}
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 p-0.5 hover:text-rose-500 rounded"
          title="Close"
        >
          <X size={12} />
        </button>
      </div>

      {/* 320x50 Banner Container */}
      {!collapsed && (
        <div className="w-full bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur shadow-2xl py-1 flex items-center justify-center">
          <AdsterraSlot unitKey="banner320x50" className="my-0" />
        </div>
      )}
    </div>
  );
};

export default AdsterraStickyMobile;
