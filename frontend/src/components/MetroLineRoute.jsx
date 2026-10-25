import React, { useState, useEffect, useRef } from 'react';

export const STATIONS = [
  { id: 'jun', label: 'JUN 2026', short: 'JUN', count: 2, monthKey: 'june', nextLabel: 'JUL 2026', fullLabel: 'June 2026' },
  { id: 'jul', label: 'JUL 2026', short: 'JUL', count: 6, monthKey: 'july', nextLabel: 'AUG 2026', fullLabel: 'July 2026' },
  { id: 'aug', label: 'AUG 2026', short: 'AUG', count: 2, monthKey: 'august', nextLabel: 'SEP 2026', fullLabel: 'August 2026' },
  { id: 'sep', label: 'SEP 2026', short: 'SEP', count: 1, monthKey: 'september', nextLabel: 'OCT 2026', fullLabel: 'September 2026' },
  { id: 'oct', label: 'OCT 2026', short: 'OCT', count: 1, monthKey: 'october', nextLabel: 'OCT 2026 (Terminal)', fullLabel: 'October 2026' },
];

export default function MetroLineRoute({ onStationChange, activeMonthKey }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const hasAutoPlayedRef = useRef(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const selectStation = (idx, isManual = true) => {
    if (isManual && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      hasAutoPlayedRef.current = true;
    }
    setActiveIdx(idx);
    if (onStationChange) {
      onStationChange(STATIONS[idx].monthKey);
    }
  };

  // Intersection observer to start the train journey once
  useEffect(() => {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAutoPlayedRef.current) {
          hasAutoPlayedRef.current = true;
          startTrainJourney();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prefersReducedMotion]);

  const startTrainJourney = () => {
    // Sequence through JUN -> JUL -> AUG -> SEP -> OCT with 1.5s stops
    let current = 0;
    selectStation(0, false);

    const stepNext = () => {
      timerRef.current = setTimeout(() => {
        current += 1;
        if (current < STATIONS.length) {
          selectStation(current, false);
          stepNext();
        }
      }, 1500); // 1.5 seconds per station
    };

    stepNext();
  };

  const currentStation = STATIONS[activeIdx];

  return (
    <div ref={containerRef} className="w-full mb-14 select-none">
      {/* Station LED Display (Next station: [month]) */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#12121c] border border-[rgba(0,212,255,0.3)] shadow-[0_0_15px_rgba(0,212,255,0.12)]">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse" />
          <span className="font-mono text-xs sm:text-sm text-[#00d4ff] font-medium tracking-wide">
            Next station: <strong className="text-text font-bold">{currentStation.nextLabel}</strong>
          </span>
        </div>

        <span className="text-[11px] font-mono text-text-dim hidden sm:inline">
          Metro Timeline: 5 Stations · 12 Certifications
        </span>
      </div>

      {/* ─── DESKTOP HORIZONTAL ROUTE (Screens >= 768px) ─── */}
      <div className="hidden md:block relative w-full pt-8 pb-4 px-6">
        {/* Track Line */}
        <div className="absolute top-11 left-8 right-8 h-1 bg-gradient-to-r from-[#00d4ff] via-[#6d28d9] to-[#ff006e] rounded-full opacity-60" />

        {/* Train Icon moving along the horizontal track */}
        <div
          className={`absolute top-4 transition-all duration-700 ease-in-out z-20 pointer-events-none -translate-x-1/2 ${
            prefersReducedMotion ? 'duration-0' : ''
          }`}
          style={{
            left: `calc(2rem + ((100% - 4rem) * ${activeIdx / (STATIONS.length - 1)}))`,
          }}
          aria-hidden="true"
        >
          {/* Cyberpunk Metro Train SVG */}
          <svg width="48" height="26" viewBox="0 0 48 26" fill="none" className="drop-shadow-[0_0_10px_rgba(0,212,255,0.6)]">
            <rect x="2" y="3" width="44" height="17" rx="4" fill="#141420" stroke="#00d4ff" strokeWidth="1.5" />
            <rect x="6" y="14" width="36" height="2" fill="#6d28d9" />
            <rect x="6" y="17" width="36" height="1.5" fill="#ff006e" />
            <rect x="7" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
            <rect x="17" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
            <rect x="27" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
            <path d="M37 6H42V12H37V6Z" fill="#00d4ff" />
            <circle cx="43" cy="9" r="1.5" fill="#ffffff" />
            <circle cx="9" cy="22" r="2" fill="#00d4ff" />
            <circle cx="19" cy="22" r="2" fill="#6d28d9" />
            <circle cx="29" cy="22" r="2" fill="#6d28d9" />
            <circle cx="39" cy="22" r="2" fill="#00d4ff" />
          </svg>
        </div>

        {/* Stations Row */}
        <div className="relative flex justify-between items-start w-full">
          {STATIONS.map((station, idx) => {
            const isCurrent = activeIdx === idx;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => selectStation(idx, true)}
                aria-label={`${station.fullLabel}: ${station.count} certificates`}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] rounded-lg p-2 transition-transform"
              >
                {/* Station Node Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 bg-bg ${
                    isCurrent
                      ? 'border-[#00d4ff] bg-[#00d4ff] shadow-[0_0_14px_rgba(0,212,255,0.9)] scale-125'
                      : 'border-border group-hover:border-[#00d4ff]/70 group-hover:scale-110'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-[#111110]' : 'bg-text-dim group-hover:bg-[#00d4ff]'
                    }`}
                  />
                </div>

                {/* Station Labels */}
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider mt-3 transition-colors ${
                    isCurrent ? 'text-[#00d4ff]' : 'text-text group-hover:text-[#00d4ff]'
                  }`}
                >
                  {station.label}
                </span>
                <span className="text-[11px] font-mono text-text-dim mt-0.5">
                  {station.short}: {station.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── MOBILE VERTICAL ROUTE (Screens < 768px) ─── */}
      <div className="block md:hidden relative w-full py-4 pl-4 pr-2">
        {/* Vertical Track Line */}
        <div className="absolute top-6 bottom-6 left-9 w-1 bg-gradient-to-b from-[#00d4ff] via-[#6d28d9] to-[#ff006e] rounded-full opacity-60" />

        {/* Train Icon moving vertically */}
        <div
          className={`absolute left-4 transition-all duration-700 ease-in-out z-20 pointer-events-none -translate-y-1/2 ${
            prefersReducedMotion ? 'duration-0' : ''
          }`}
          style={{
            top: `calc(1.5rem + ((100% - 3rem) * ${activeIdx / (STATIONS.length - 1)}))`,
          }}
          aria-hidden="true"
        >
          {/* Rotated train pointing down */}
          <div className="rotate-90 origin-center drop-shadow-[0_0_10px_rgba(0,212,255,0.7)]">
            <svg width="40" height="22" viewBox="0 0 48 26" fill="none">
              <rect x="2" y="3" width="44" height="17" rx="4" fill="#141420" stroke="#00d4ff" strokeWidth="1.5" />
              <rect x="6" y="14" width="36" height="2" fill="#6d28d9" />
              <rect x="6" y="17" width="36" height="1.5" fill="#ff006e" />
              <rect x="7" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
              <rect x="17" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
              <rect x="27" y="6" width="7" height="6" rx="1" fill="#00d4ff" fillOpacity="0.85" />
              <path d="M37 6H42V12H37V6Z" fill="#00d4ff" />
              <circle cx="43" cy="9" r="1.5" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Vertical Stations Stack */}
        <div className="flex flex-col gap-6 w-full">
          {STATIONS.map((station, idx) => {
            const isCurrent = activeIdx === idx;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => selectStation(idx, true)}
                aria-label={`${station.fullLabel}: ${station.count} certificates`}
                className="flex items-center gap-5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] rounded-lg py-1 px-2"
              >
                {/* Station Node on vertical line */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 bg-bg shrink-0 ${
                    isCurrent
                      ? 'border-[#00d4ff] bg-[#00d4ff] shadow-[0_0_14px_rgba(0,212,255,0.9)] scale-110'
                      : 'border-border group-hover:border-[#00d4ff]'
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrent ? 'bg-[#111110]' : 'bg-text-dim'
                    }`}
                  />
                </div>

                {/* Station Information */}
                <div className="flex items-baseline justify-between w-full pr-2">
                  <span
                    className={`text-sm font-mono font-bold uppercase tracking-wider transition-colors ${
                      isCurrent ? 'text-[#00d4ff]' : 'text-text group-hover:text-[#00d4ff]'
                    }`}
                  >
                    {station.label}
                  </span>
                  <span className="text-xs font-mono text-text-dim">
                    {station.short}: {station.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
