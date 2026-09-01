import React from 'react';
import { motion } from 'framer-motion';
import CardSwapProjects from './CardSwap-Projects';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 w-full min-h-screen bg-transparent overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue,#00d4ff)] to-[var(--color-neon-purple,#6d28d9)]">Projects</span>
          </h2>
          <h3 className="text-xl md:text-2xl text-[var(--color-neon-blue,#00d4ff)] font-semibold mb-2">
            5 Live Projects Showcasing My Skills
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interactive projects built with modern technologies
          </p>
        </motion.div>

        <CardSwapProjects />
      </div>
    </section>
  );
}
