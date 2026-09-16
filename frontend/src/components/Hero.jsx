import React from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import profilePic from '../assets/profile.jpg';
import { PERSONAL, STATS } from '../data/personal';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      <ThreeCanvas />

      <div className="z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left mt-8 lg:mt-0">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-text-muted text-sm font-mono tracking-wide mb-8"
          >
            {PERSONAL.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-6 tracking-tight leading-[1.1]"
          >
            {PERSONAL.name.split(' ').map((word, i) => (
              <React.Fragment key={word}>
                {i > 0 && <br className="hidden lg:block" />}
                {i > 0 && ' '}
                {word}
              </React.Fragment>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-accent font-medium mb-3"
          >
            {PERSONAL.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-text-muted font-mono tracking-wide uppercase mb-8"
          >
            {PERSONAL.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-text-muted max-w-lg leading-relaxed mb-12"
          >
            {PERSONAL.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-lg bg-accent text-bg font-semibold text-center hover:bg-accent-hover transition-colors duration-200"
            >
              See my work
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-lg border border-border-hover text-text-muted font-semibold text-center hover:text-text hover:border-accent/30 transition-all duration-200"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        {/* Profile + Stats */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end mt-16 lg:mt-0 relative pb-16 lg:pb-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border z-10"
          >
            <img
              src={profilePic}
              alt={PERSONAL.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-3 mt-8 lg:mt-0 lg:absolute lg:-left-12 lg:bottom-4 z-20 w-full lg:w-auto">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center min-w-[110px]"
              >
                <span className="text-2xl font-bold text-accent">
                  {stat.value}
                </span>
                <span className="text-[10px] text-text-dim font-medium uppercase tracking-wider text-center mt-1 whitespace-pre-line">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint — very subtle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <span className="text-[10px] text-text-dim font-mono tracking-widest uppercase">↓</span>
      </motion.div>
    </section>
  );
}
