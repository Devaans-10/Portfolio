import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import profilePic from '../assets/profile.jpg';
import { PERSONAL, STATS } from '../data/personal';
import RecruiterTimerPopup from './RecruiterTimerPopup';

export default function Hero() {
  const [scrolledPast100, setScrolledPast100] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast100(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tilt degrees between -3 and 3 degrees for scrapbook sticky-notes
  const tilts = [-2.5, 1.8, -1.6];

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
            className="text-base md:text-lg text-text-muted max-w-lg leading-relaxed mb-10"
          >
            {PERSONAL.bio}
          </motion.p>

          {/* Action buttons */}
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

          {/* 3. HERO SCROLL HINT (Below main buttons, fades after 100px scroll) */}
          <div
            className={`flex items-center gap-2 mt-8 text-xs font-mono tracking-widest uppercase text-accent transition-opacity duration-300 ${
              scrolledPast100 && !prefersReducedMotion
                ? 'opacity-0 pointer-events-none'
                : 'opacity-90'
            }`}
          >
            <span>GO ON, SCROLL DOWN</span>
            <span
              className={`inline-block ${
                prefersReducedMotion ? '' : 'animate-bounce'
              }`}
            >
              ↓
            </span>
          </div>
        </div>

        {/* Profile + Sticky-Note Stats */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end mt-16 lg:mt-0 relative pb-16 lg:pb-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border z-10 shadow-xl"
          >
            <img
              src={profilePic}
              alt={PERSONAL.name}
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </motion.div>

          {/* 5. STICKY-NOTE STAT CARDS (Tilted -3 to 3 deg, paper background, handwritten note, hover straightens) */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-3.5 mt-8 lg:mt-0 lg:absolute lg:-left-12 lg:bottom-4 z-20 w-full lg:w-auto">
            {STATS.map((stat, i) => {
              const tilt = prefersReducedMotion ? 0 : (tilts[i] ?? 0);
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  style={{
                    transform: `rotate(${tilt}deg)`,
                  }}
                  className={`bg-[#fdfbf7] border border-[#e2dcd2] rounded-lg p-3.5 flex flex-col items-center justify-center min-w-[115px] shadow-[0_6px_20px_rgba(0,0,0,0.35)] relative ${
                    prefersReducedMotion
                      ? ''
                      : 'hover:!rotate-0 hover:scale-105 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out cursor-pointer'
                  }`}
                >
                  {/* Scrapbook Tape Accent */}
                  <div className="w-7 h-2 -mt-2 mb-1.5 bg-[#f3d99d]/70 rounded-xs border-b border-[#c8a966]/40" />

                  <span className="text-2xl font-black text-[#151513] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-[#4d4a44] font-mono font-medium uppercase tracking-wider text-center mt-0.5 whitespace-pre-line leading-tight">
                    {stat.label}
                  </span>

                  {/* Handwritten-style note under each number */}
                  {stat.note && (
                    <span className="text-[10px] font-mono italic text-[#008ea6] font-semibold mt-1 tracking-tight">
                      ~ {stat.note}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recruiter 2-minute timer popup */}
      <RecruiterTimerPopup />
    </section>
  );
}
