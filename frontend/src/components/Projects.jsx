import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/projects';
import CardSwapProjects from './CardSwapProjects';

export default function Projects() {
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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Projects
          </h2>
          <p className="text-text-muted text-sm font-mono tracking-wide">
            {PROJECTS.length} things I&apos;ve built and shipped.
          </p>
        </motion.div>

        <CardSwapProjects />
      </div>
    </section>
  );
}
