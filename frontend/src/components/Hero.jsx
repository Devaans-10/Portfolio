import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import profilePic from '../assets/profile.jpg';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Devaans Patwari";
  const tagline = "1st-year B.Tech student specializing in Artificial Intelligence and Machine Learning. I’ve been fascinated by how technology can solve real-world problems, and I’m on a mission to bridge the gap between human creativity and machine intelligence.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <ThreeCanvas />
      
      <div className="z-10 flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl mx-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[var(--color-neon-blue)] shadow-[0_0_20px_rgba(0,243,255,0.6)]"
        >
          <img 
            src={profilePic} 
            alt="Devaans Patwari" 
            className="w-full h-full object-cover brightness-75 contrast-125" 
          />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-mono text-[var(--color-neon-blue)] font-bold drop-shadow-[0_0_10px_rgba(0,243,255,0.8)] h-20 md:h-24 flex items-center"
        >
          {text}<span className="animate-pulse">_</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-sans tracking-wide max-w-2xl leading-relaxed"
        >
          {tagline}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          className="mt-10 px-8 py-3 bg-transparent border-2 border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] rounded-full hover:bg-[var(--color-neon-blue)] hover:text-black transition-all duration-300 font-bold tracking-widest shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)]"
        >
          EXPLORE WORK
        </motion.button>
      </div>
    </section>
  );
}
