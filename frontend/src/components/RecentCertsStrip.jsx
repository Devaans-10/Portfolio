import React, { useState, useEffect } from 'react';
import CopyButton from './ui/CopyButton';

const RECENT_ITEMS = [
  {
    id: 'hacktoberfest-bengaluru',
    title: 'Hacktoberfest Hack Day Bengaluru',
    issuer: 'Major League Hacking · DEV · DigitalOcean',
    event: 'Hacktoberfest Hack Day Bengaluru x KrowdKraft, attended in person',
    issuedDate: '18 October 2026',
    dateLabel: 'Oct 2026',
    type: 'Certificate of Attendance',
    badge: 'Open Source',
    tags: ['Hacktoberfest', 'Open Source', 'Community'],
    summary:
      'Attended Hacktoberfest Hack Day Bengaluru in person at KrowdKraft — collaborated on open-source repositories and participated in live code sprints.',
    tilt: -2.8,
    accent: '#00d4ff',
  },
  {
    id: 'first-commit-bharat-builds',
    title: 'First Commit',
    issuer: 'WeMakeDevs x AWS',
    event: 'Bharat Builds Tour, Hackathon Series 2026 (event 01)',
    issuedDate: '20 September 2026',
    dateLabel: 'Sep 2026',
    type: 'Certificate of Participation',
    credentialId: 'Y5CSPWGBHR',
    badge: 'Hackathon',
    tags: ['Hackathon', 'AWS', 'WeMakeDevs'],
    summary:
      'Participated in the Bharat Builds Tour hackathon event 01 by WeMakeDevs and AWS, developing cloud-native architectures and shipping projects.',
    tilt: 1.8,
    accent: '#6d28d9',
  },
  {
    id: 'vicodathon-2026',
    title: 'ViCoDathon 2026',
    issuer: 'AB Talks',
    event: "India's AI Vibe Coding Hackathon",
    issuedDate: '14 August 2026',
    dateLabel: 'Aug 2026',
    type: 'Certificate of Participation',
    credentialId: 'ABT-HK-U46M3',
    badge: 'AI Vibe Coding',
    tags: ['AI', 'Hackathon', 'Vibe Coding'],
    summary:
      "Competed in India's premier AI Vibe Coding Hackathon by AB Talks, building prototype AI agents and workflow systems under time constraints.",
    tilt: -1.2,
    accent: '#ff006e',
  },
];

export default function RecentCertsStrip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="mt-16 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00d4ff] animate-pulse" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted">
            Recent Highlights — Visual Card Stack
          </h3>
        </div>

        {/* 7. Label: "Drag your cursor to explore" */}
        <span className="text-xs font-mono text-[#00d4ff] tracking-wide inline-flex items-center gap-1.5 bg-[#00d4ff]/10 border border-[#00d4ff]/30 px-3 py-1 rounded-full w-fit">
          <span>✨</span>
          <span>Drag your cursor to explore</span>
        </span>
      </div>

      {/* 7. Stack of Overlapping Cards */}
      <div
        className="relative w-full max-w-4xl mx-auto min-h-[340px] sm:min-h-[300px] mb-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {RECENT_ITEMS.map((item, idx) => {
          const isTop = activeIdx === idx;
          // Calculate stack offset and zIndex
          const zIndex = isTop ? 30 : 20 - idx;
          const tilt = prefersReducedMotion ? 0 : item.tilt;
          const lifted = isTop && isHovered && !prefersReducedMotion;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              style={{
                zIndex,
                transform: prefersReducedMotion
                  ? 'none'
                  : `translateY(${lifted ? -16 : idx * 10}px) rotate(${lifted ? 0 : tilt}deg) scale(${lifted ? 1.02 : 1 - idx * 0.02})`,
              }}
              className={`absolute inset-x-0 top-0 rounded-2xl p-6 sm:p-7 border transition-all duration-300 ease-out cursor-pointer bg-surface select-none shadow-xl bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] ${
                isTop
                  ? 'border-[#00d4ff] shadow-[0_16px_40px_rgba(0,0,0,0.6)]'
                  : 'border-border/80 hover:border-border'
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Certificate card: ${item.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveIdx(idx);
                }
              }}
            >
              {/* Scrapbook pin/tape marker */}
              <div
                className="w-8 h-2.5 mx-auto -mt-3 mb-3 rounded-xs border shadow-xs"
                style={{
                  backgroundColor: `${item.accent}33`,
                  borderColor: `${item.accent}66`,
                }}
              />

              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${item.accent}20`,
                        color: item.accent,
                      }}
                    >
                      {item.badge}
                    </span>
                    <span className="text-text-dim text-xs">·</span>
                    <span className="text-xs text-text-dim font-mono">
                      Issued: {item.issuedDate}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-text">
                    {item.title}
                  </h4>
                </div>

                {item.credentialId && (
                  <div className="flex items-center gap-2 text-xs font-mono text-text-dim shrink-0">
                    <span>ID: {item.credentialId}</span>
                    <CopyButton text={item.credentialId} />
                  </div>
                )}
              </div>

              {/* Issuer & event */}
              <p className="text-xs font-mono text-text-muted mb-2">
                {item.issuer} — <span className="text-text-dim">{item.event}</span>
              </p>

              {/* Summary */}
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg text-text-dim border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Selector Pill Strip (Tap to bring to front) */}
      <div className="flex sm:hidden items-center justify-center gap-2 mt-4">
        {RECENT_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            aria-label={`Select ${item.title}`}
            className={`px-3 py-1.5 text-xs font-mono rounded-full border transition-colors ${
              activeIdx === idx
                ? 'bg-[#00d4ff] text-[#111110] border-[#00d4ff] font-bold'
                : 'bg-surface text-text-muted border-border hover:text-text'
            }`}
          >
            {item.dateLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
