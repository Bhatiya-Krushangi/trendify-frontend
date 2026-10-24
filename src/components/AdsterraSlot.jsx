import React, { useEffect, useRef } from "react";
import { ADSTERRA_CONFIG } from "../config/adsterra";

/**
 * AdsterraSlot Component
 * 
 * Clean ad rendering with ADVERTISEMENT badge, without any size numbers:
 * - 'banner300x250': Medium Rectangle (300x250) rendered in an isolated iframe
 * - 'banner320x50': Mobile Banner (320x50) rendered in an isolated iframe
 * - 'nativeBanner': Responsive Native Banner widget rendered into container-6a17f189610dfbc150d4df64ca32284f
 */
const AdsterraSlot = ({
  unitKey = "banner300x250",
  className = "",
  title = "Advertisement",
}) => {
  const containerRef = useRef(null);
  const unit = ADSTERRA_CONFIG.units[unitKey] || ADSTERRA_CONFIG.units.banner300x250;
  const showDesign = ADSTERRA_CONFIG.showDesignBlocks;

  // For Native Banner: inject target container and async script
  useEffect(() => {
    if (!showDesign && unit.type === "native" && unit.scriptUrl && containerRef.current) {
      containerRef.current.innerHTML = "";

      // 1. Container div where Adsterra injects native ads
      const targetDiv = document.createElement("div");
      targetDiv.id = unit.containerId || "container-6a17f189610dfbc150d4df64ca32284f";
      containerRef.current.appendChild(targetDiv);

      // 2. Async script
      const script = document.createElement("script");
      script.src = unit.scriptUrl;
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      containerRef.current.appendChild(script);

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
      };
    }
  }, [showDesign, unit]);

  // 1. Native Banner
  if (unit.type === "native") {
    return (
      <div className={`w-full my-4 ${className}`}>
        {/* Label Badge (No size numbers) */}
        <div className="flex items-center mb-2 px-1">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            {title}
          </span>
        </div>

        {showDesign ? (
          <div className="rounded-xl border-2 border-dashed border-brand-200 dark:border-brand-900/50 bg-gradient-to-br from-brand-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-800/50 p-4 transition-all hover:border-brand-300 dark:hover:border-brand-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="group flex flex-col rounded-lg bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 overflow-hidden shadow-xs hover:shadow-sm transition"
                >
                  <div className="h-28 bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-transparent" />
                  </div>
                  <div className="p-2.5 flex flex-col gap-1.5 flex-1 justify-between">
                    <div className="space-y-1">
                      <div className="h-2.5 bg-slate-200 dark:bg-slate-600 rounded w-5/6" />
                      <div className="h-2 bg-slate-150 dark:bg-slate-700 rounded w-3/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            className="w-full min-h-[160px] flex items-center justify-center overflow-hidden"
          />
        )}
      </div>
    );
  }

  // 2. Banner 320x50 (Mobile Banner)
  if (unit.type === "banner_320x50") {
    const srcDocContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 320px; height: 50px; margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${unit.key}',
      'format' : 'iframe',
      'height' : 50,
      'width' : 320,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="${unit.scriptUrl}"></script>
</body>
</html>`;

    return (
      <div className={`flex flex-col items-center my-1 ${className}`}>
        {showDesign ? (
          <div
            style={{ width: "320px", height: "50px" }}
            className="rounded-lg border-2 border-dashed border-amber-300 dark:border-amber-800/60 bg-gradient-to-r from-amber-50/50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 flex items-center justify-center shadow-xs"
          />
        ) : (
          <div
            style={{ width: "320px", height: "50px" }}
            className="overflow-hidden flex items-center justify-center bg-transparent"
          >
            <iframe
              title={`adsterra-banner-${unit.width}x${unit.height}`}
              width={320}
              height={50}
              srcDoc={srcDocContent}
              style={{ border: "none", overflow: "hidden", display: "block" }}
              scrolling="no"
            />
          </div>
        )}
      </div>
    );
  }

  // 3. Banner 300x250 (Medium Rectangle)
  const srcDocContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 300px; height: 250px; margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '${unit.key}',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="${unit.scriptUrl}"></script>
</body>
</html>`;

  const marginClass = className.includes("my-") ? "" : "my-4";

  return (
    <div className={`flex flex-col items-center ${marginClass} ${className}`}>
      {/* Label Badge (ADVERTISEMENT label kept, size numbers removed) */}
      <div className="flex items-center w-[300px] mb-1.5 px-0.5">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          {title}
        </span>
      </div>

      {showDesign ? (
        <div
          style={{ width: "300px", height: "250px" }}
          className="rounded-xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 flex items-center justify-center"
        />
      ) : (
        <div
          style={{ width: "300px", height: "250px" }}
          className="rounded-xl overflow-hidden flex items-center justify-center bg-transparent"
        >
          <iframe
            title={`adsterra-banner-${unit.width}x${unit.height}`}
            width={300}
            height={250}
            srcDoc={srcDocContent}
            style={{ border: "none", overflow: "hidden", display: "block" }}
            scrolling="no"
          />
        </div>
      )}
    </div>
  );
};

export default AdsterraSlot;
