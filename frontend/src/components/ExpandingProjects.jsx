import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/projects';

/**
 * Expanding Projects List
 * Displays projects as interactive stacked rows that smoothly expand to reveal details.
 * Supports keyboard accessibility, reduced motion preferences, and responsive stacking.
 */
const ExpandingProjects = forwardRef(function ExpandingProjects(props, ref) {
  const [openId, setOpenId] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleProject = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useImperativeHandle(ref, () => ({
    openProject: (id) => {
      setOpenId(id);
      const rowElem = document.getElementById(`project-row-${id}`);
      if (rowElem) {
        rowElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
  }));

  return (
    <div className="w-full flex flex-col gap-3.5" role="list">
      {PROJECTS.map((project, idx) => {
        const isOpen = openId === project.id;
        const panelId = `project-panel-${project.id}`;
        const headerId = `project-header-${project.id}`;

        return (
          <div
            key={project.id}
            id={`project-row-${project.id}`}
            role="listitem"
            className={`group rounded-xl bg-surface transition-all duration-200 overflow-hidden border ${
              isOpen
                ? 'border-[#00d4ff] shadow-[0_4px_24px_rgba(0,212,255,0.12)]'
                : 'border-[rgba(0,212,255,0.2)] hover:border-[#00d4ff]'
            }`}
          >
            {/* Header / Clickable row */}
            <button
              type="button"
              id={headerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleProject(project.id)}
              className="w-full text-left p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <span className="text-xs font-mono text-[#00d4ff] font-semibold tracking-wider shrink-0">
                  0{idx + 1}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-text group-hover:text-[#00d4ff] transition-colors leading-snug">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-2 md:mt-0">
                {/* Tag Preview */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono text-text-dim bg-bg/80 px-2 py-0.5 rounded border border-border"
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="text-[10px] font-mono text-text-dim self-center px-1">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* "Click to expand" label on hover */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline">
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

            {/* Expandable Content Panel */}
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
                  <div className="px-5 pb-6 md:px-6 md:pb-6 pt-2 border-t border-[rgba(0,212,255,0.15)]">
                    {/* Full Description */}
                    <p className="text-sm md:text-base text-text-muted leading-relaxed mb-5 max-w-3xl">
                      {project.description}
                    </p>

                    {/* All Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-text-dim bg-bg/80 px-2.5 py-1 rounded border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: stack vertically under 480px */}
                    <div className="flex flex-col min-[480px]:flex-row gap-3 max-w-md">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-5 py-2.5 bg-[#00d4ff] text-[#111110] text-sm font-semibold rounded-lg hover:bg-[#38e1ff] hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all duration-200 text-center"
                      >
                        View Live
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-5 py-2.5 border border-[rgba(0,212,255,0.3)] text-text-muted text-sm font-semibold rounded-lg hover:text-text hover:border-[#00d4ff] transition-all duration-200 text-center"
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
});

export default ExpandingProjects;
