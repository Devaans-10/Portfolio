import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'devaans_recruiter_popup_dismissed';
const LINKEDIN_URL = 'https://www.linkedin.com/in/devaans-patwari-b22617383/';
const TIMER_MS = 2 * 60 * 1000; // 2 minutes

export default function RecruiterTimerPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Only show once per session/visit
    if (typeof window !== 'undefined' && sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const timer = setTimeout(() => {
      const alreadyDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!alreadyDismissed) {
        setIsVisible(true);
      }
    }, TIMER_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="region"
          aria-label="Recruiter connection message"
          className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm sm:w-84 bg-surface border border-border text-text rounded-xl p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="text-lg leading-none mt-0.5" aria-hidden="true">
                👋
              </span>
              <div className="text-xs text-text-muted leading-relaxed">
                <p className="mb-2 text-text font-normal">
                  You&apos;ve spent more time here than most recruiters do.{' '}
                  <span className="text-text-muted">Let&apos;s talk:</span>{' '}
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDismiss}
                    className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    LinkedIn
                    <svg
                      className="w-3 h-3 inline"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </p>
                <span className="text-[10px] font-mono text-text-dim">
                  2-minute visitor badge
                </span>
              </div>
            </div>

            {/* Close button with accessible aria-label */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss recruiter popup"
              className="p-1 -mr-1 -mt-1 rounded-md text-text-dim hover:text-text hover:bg-surface-hover transition-colors shrink-0 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
