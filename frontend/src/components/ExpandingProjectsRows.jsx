import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';

/**
 * Expanding Project Rows component placed directly above CardSwap.
 * Single active accordion row at a time with smooth 300ms height transition.
 */
export default function ExpandingProjectsRows() {
  const [openId, setOpenId] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleRow = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full mb-16 flex flex-col gap-3" role="list">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d4ff]" />
          Quick Explore List
        </h3>
        <span className="text-[11px] font-mono text-text-dim">
          Click any row to expand details
        </span>
      </div>

      {PROJECTS.map((project, idx) => {
        const isOpen = openId === project.id;
        const panelId = `expand-panel-${project.id}`;
        const headerId = `expand-header-${project.id}`;

        return (
          <div
            key={project.id}
            role="listitem"
            className={`group rounded-xl bg-surface border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-[#00d4ff] shadow-[0_4px_20px_rgba(0,212,255,0.12)] bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:14px_14px]'
                : 'border-[rgba(0,212,255,0.2)] hover:border-[#00d4ff]'
            }`}
          >
            {/* Row Header Button */}
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleRow(project.id)}
              className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#00d4ff] font-semibold tracking-wider">
                  0{idx + 1}
                </span>
                <span className="text-base sm:text-lg font-bold text-text group-hover:text-[#00d4ff] transition-colors leading-snug">
                  {project.title}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                {/* Tech tags preview */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono text-text-dim bg-bg/80 px-2 py-0.5 rounded border border-border"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] font-mono text-text-dim px-1 self-center">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* "Click to expand" hover label */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[11px] font-mono text-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:inline">
                    {isOpen ? 'Click to collapse' : 'Click to expand'}
                  </span>
                  <span
                    className={`text-[#00d4ff] text-xs font-mono transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 0, height: 0 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, height: 'auto' }
                      : { opacity: 1, height: 'auto' }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, height: 'auto' }
                      : { opacity: 0, height: 0 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.3,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-[rgba(0,212,255,0.12)]">
                    <p className="text-sm text-text-muted leading-relaxed mb-4 max-w-3xl">
                      {project.description}
                    </p>

                    {/* All tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-text-dim bg-bg/90 px-2.5 py-1 rounded border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* View Live and GitHub buttons */}
                    <div className="flex flex-col min-[480px]:flex-row gap-2.5 max-w-md">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-[#00d4ff] text-[#111110] text-xs font-semibold rounded-lg hover:bg-[#38e1ff] transition-colors text-center"
                      >
                        View Live
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-[rgba(0,212,255,0.3)] text-text-muted text-xs font-semibold rounded-lg hover:text-text hover:border-[#00d4ff] transition-all text-center"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
