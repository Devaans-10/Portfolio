import React from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import profilePic from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeCanvas />
      
      {/* Overlay Content */}
      <div className="z-10 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-sm rounded-3xl mx-4 border border-[var(--color-neon-blue)]/30 shadow-[0_0_30px_rgba(0,212,255,0.2)]">
        
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8 relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-transparent shadow-[0_0_30px_rgba(0,212,255,0.6)]"
          style={{ background: 'linear-gradient(45deg, var(--color-neon-blue), var(--color-neon-purple), var(--color-neon-pink))', padding: '4px' }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <img 
              src={profilePic} 
              alt="Devaans Patwari" 
              className="w-full h-full object-cover brightness-90 contrast-125" 
            />
          </div>
        </motion.div>
        
        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] via-[var(--color-neon-purple)] to-[var(--color-neon-pink)] mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
        >
          Devaans Patwari
        </motion.h1>
        
        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xl md:text-2xl text-gray-300 font-mono tracking-widest mb-6"
        >
          &gt; AI Solutions Architect _
        </motion.h2>
        
        {/* Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-md md:text-lg text-gray-400 font-sans max-w-2xl leading-relaxed mb-10"
        >
          Bridging the gap between human creativity and machine intelligence. 
          Specializing in AI/ML, Python, and Next-Gen Web Experiences.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="px-8 py-4 bg-transparent border border-[var(--color-neon-pink)] text-[var(--color-neon-pink)] rounded-full hover:bg-[var(--color-neon-pink)] hover:text-black hover:shadow-[0_0_30px_rgba(255,0,110,0.8)] transition-all duration-300 font-bold tracking-widest uppercase text-sm"
        >
          Explore My Work
        </motion.a>
      </div>
    </section>
  );
}
