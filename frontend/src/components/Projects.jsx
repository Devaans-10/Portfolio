import React from 'react';
import { motion } from 'framer-motion';
import CardSwap from './CardSwap';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 w-full min-h-screen bg-transparent overflow-hidden flex flex-col items-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-mono text-white mb-16 text-center"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue,#00d4ff)] to-[var(--color-neon-purple,#6d28d9)]">Projects</span>
        </motion.h2>

        <CardSwap />
      </div>
    </section>
  );
}
