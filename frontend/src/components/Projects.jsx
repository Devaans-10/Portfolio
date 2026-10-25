import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import CardSwapProjects from './CardSwapProjects';
import ExpandingProjectsRows from './ExpandingProjectsRows';

export default function Projects() {
  const cardSwapRef = useRef(null);

  const handleStartHere = () => {
    const elem = document.getElementById('cardswap-container');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
    const addaIndex = PROJECTS.findIndex((p) =>
      p.title.toLowerCase().includes('adda')
    );
    if (addaIndex !== -1 && cardSwapRef.current?.bringToFront) {
      cardSwapRef.current.bringToFront(addaIndex);
    }
  };

  return (
    <section
      id="projects"
      className="py-28 px-6 md:px-12 w-full min-h-screen overflow-hidden flex flex-col items-center"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Projects
          </h2>
          <p className="text-text-muted text-sm font-mono tracking-wide">
            {PROJECTS.length} things I&apos;ve built and shipped.
          </p>
        </motion.div>

        {/* Start Here Shortcut */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 mb-10 rounded-xl bg-surface border border-border"
        >
          <p className="text-sm text-text-muted leading-relaxed">
            Start with <strong className="text-text font-medium">ADDA AI</strong> and <strong className="text-text font-medium">Cyber Risk Tracker</strong>, my strongest work.
          </p>
          <button
            type="button"
            onClick={handleStartHere}
            aria-label="Scroll to 3D card stack and view ADDA AI"
            className="px-4 py-2 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent-hover transition-colors whitespace-nowrap shrink-0"
          >
            Start with ADDA AI →
          </button>
        </motion.div>

        {/* 6. EXPANDING PROJECT ROWS */}
        <ExpandingProjectsRows />

        {/* Interactive 3D Card Stack */}
        <div id="cardswap-container" className="pt-6 w-full">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted">
              Interactive 3D Card Stack
            </h3>
          </div>
          <CardSwapProjects ref={cardSwapRef} />
        </div>
      </div>
    </section>
  );
}
