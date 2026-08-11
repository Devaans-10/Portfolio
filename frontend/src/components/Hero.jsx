import React from 'react';
import { motion } from 'framer-motion';
import ThreeCanvas from './ThreeCanvas';
import profilePic from '../assets/profile.jpg';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* 3D Background */}
      <ThreeCanvas />
      
      {/* Main Content Container - Framer Modern Aesthetic */}
      <div className="z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Text Content */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left mt-8 lg:mt-0">
          
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm font-medium mb-6 backdrop-blur-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00d4ff]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Surat, Gujarat
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#6d28d9] mb-4 tracking-tight leading-tight"
          >
            DEVAANS<br className="hidden lg:block" /> PATWARI
          </motion.h1>
          
          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#00d4ff] font-medium mb-3"
          >
            Building AI Solutions | Creative Developer
          </motion.h2>

          {/* Professional Title */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base text-gray-400 font-mono tracking-wide uppercase mb-6"
          >
            B.Tech AI/ML Student | Developer | Google-Certified Professional
          </motion.h3>
          
          {/* Bio Text */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed mb-10"
          >
            I'm Devaans, passionate about building AI-powered solutions and interactive web experiences. With expertise in emerging technologies like Agentic AI and Prompt Engineering, I create scalable applications that make an impact.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#6d28d9] text-white font-bold text-center hover:scale-105 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-transparent border-2 border-[#00d4ff] text-white font-bold text-center hover:bg-[#00d4ff]/10 hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Right Column - Visual / Stats */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end mt-12 lg:mt-0 relative pb-16 lg:pb-0">
          
          {/* Main Visual / Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(109,40,217,0.3)] z-10"
          >
            {/* Subtle Overlay Gradient on Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d4ff]/20 to-[#6d28d9]/20 mix-blend-overlay z-10 rounded-[2rem]"></div>
            <img 
              src={profilePic} 
              alt="Devaans Patwari" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
            />
          </motion.div>

          {/* Stats Cards (Floating) */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-4 mt-8 lg:mt-0 lg:absolute lg:-left-16 lg:bottom-4 z-20 w-full lg:w-auto">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[130px] shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#6d28d9]">307+</span>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider text-center mt-1">LinkedIn<br/>Connections</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[130px] shadow-xl hover:-translate-y-2 transition-transform duration-300 lg:translate-y-12"
            >
              <span className="text-3xl font-bold text-white">9</span>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider text-center mt-1">Certifications</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center min-w-[130px] shadow-xl hover:-translate-y-2 transition-transform duration-300 lg:-translate-x-12 lg:translate-y-4"
            >
              <span className="text-3xl font-bold text-white">4</span>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider text-center mt-1">Live<br/>Projects</span>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
      >
        <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00d4ff]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
