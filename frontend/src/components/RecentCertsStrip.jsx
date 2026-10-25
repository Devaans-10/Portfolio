import React, { useState } from 'react';
import CopyButton from './ui/CopyButton';

const RECENT_ITEMS = [
  {
    id: 'hacktoberfest-bengaluru',
    title: 'Hacktoberfest Hack Day Bengaluru',
    shortTitle: 'Hacktoberfest Bengaluru',
    issuer: 'Major League Hacking · DEV · DigitalOcean',
    event: 'Hacktoberfest Hack Day Bengaluru x KrowdKraft, attended in person',
    issuedDate: '18 October 2026',
    dateLabel: 'Oct 2026',
    type: 'Certificate of Attendance',
    badge: 'Open Source',
    tags: ['Hacktoberfest', 'Open Source', 'Community'],
    summary:
      'Attended Hacktoberfest Hack Day Bengaluru in person at KrowdKraft — collaborated on open-source repositories and participated in live code sprints.',
  },
  {
    id: 'first-commit-bharat-builds',
    title: 'First Commit',
    shortTitle: 'First Commit (AWS)',
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
  },
  {
    id: 'vicodathon-2026',
    title: 'ViCoDathon 2026',
    shortTitle: 'ViCoDathon 2026',
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
  },
];

export default function RecentCertsStrip() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeCert = RECENT_ITEMS[selectedIndex];

  return (
    <div className="mt-14 w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-text-muted">
            Recent Highlights
          </h3>
        </div>
        <span className="text-xs font-mono text-text-dim">
          Hover or tap thumbnail to preview
        </span>
      </div>

      {/* 3 Thumbnails Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {RECENT_ITEMS.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              onMouseEnter={() => setSelectedIndex(idx)}
              aria-label={`View preview for ${item.title}`}
              aria-pressed={isSelected}
              className={`p-3.5 rounded-lg border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[90px] ${
                isSelected
                  ? 'bg-surface-hover border-accent shadow-sm'
                  : 'bg-surface border-border hover:border-border-hover'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 w-full">
                <span className="text-[10px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded bg-bg text-accent border border-border">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono text-text-dim">
                  {item.dateLabel}
                </span>
              </div>
              <p className="text-xs font-medium text-text leading-snug line-clamp-1">
                {item.shortTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Hover / Tap Reveal Preview Card */}
      <div
        className="bg-surface rounded-xl p-5 md:p-6 border border-border transition-all duration-200"
        aria-live="polite"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
                {activeCert.type}
              </span>
              <span className="text-text-dim text-xs">·</span>
              <span className="text-xs text-text-dim font-mono">
                Issued: {activeCert.issuedDate}
              </span>
            </div>
            <h4 className="text-lg font-bold text-text">
              {activeCert.title}
            </h4>
          </div>

          {activeCert.credentialId && (
            <div className="flex items-center gap-2 text-xs font-mono text-text-dim self-start sm:self-auto">
              <span>ID: {activeCert.credentialId}</span>
              <CopyButton text={activeCert.credentialId} />
            </div>
          )}
        </div>

        <p className="text-xs font-mono text-text-muted mb-2">
          {activeCert.issuer} — <span className="text-text-dim">{activeCert.event}</span>
        </p>

        <p className="text-sm text-text-muted leading-relaxed mb-4">
          {activeCert.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {activeCert.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded bg-bg text-text-dim border border-border"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
