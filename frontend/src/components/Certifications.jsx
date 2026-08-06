import React from 'react';
import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    {
      name: 'Google AI Essentials',
      issuer: 'Google',
      description: 'Completed comprehensive course on Google AI fundamentals with hands-on practice',
      status: 'Certified',
      color: 'var(--color-neon-blue)'
    },
    {
      name: 'Google Cloud Gen AI Academy APAC 2026',
      issuer: 'Google Cloud',
      description: 'Hands-on learning focused on building real-world AI solutions powered by data, analytics, and intelligent systems on Google Cloud',
      status: 'Certified',
      color: 'var(--color-neon-purple)'
    },
    {
      name: 'Yuga Yatra Retail - Software Developer Internship',
      issuer: 'Yuga Yatra Retail/OPC Private Limited',
      description: 'Completed 4-week internship with expertise in emerging technologies',
      duration: 'June 2025 - August 2025',
      status: 'Completed',
      color: 'var(--color-neon-pink)'
    },
    {
      name: 'IBM Emerging Technologies',
      issuer: 'IBM & Edunet Foundation',
      description: 'Gained expertise in Agentic AI, Cyber Security, and Quantum Computing',
      status: 'Certified',
      color: 'var(--color-neon-blue)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 w-full min-h-screen bg-[var(--color-dark-surface)] relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-mono text-white mb-16 text-center"
        >
          Certifications &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-pink)] to-[var(--color-neon-blue)]">Achievements</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -10 }}
              className="bg-black/50 rounded-2xl p-8 border border-white/5 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden flex flex-col h-full group"
            >
              {/* Hover Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${cert.color}, transparent)` }}
              ></div>
              
              <div className="flex justify-between items-start mb-4 z-10 relative">
                <h3 className="text-2xl font-bold text-white max-w-[80%]">{cert.name}</h3>
                
                {/* Badge */}
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider">{cert.status}</span>
                </div>
              </div>
              
              <h4 className="text-sm font-mono uppercase tracking-widest mb-4 z-10 relative" style={{ color: cert.color }}>
                {cert.issuer}
              </h4>
              
              <p className="text-gray-400 mb-6 z-10 relative flex-grow">{cert.description}</p>
              
              {cert.duration && (
                <div className="z-10 relative mt-auto flex items-center gap-2 text-gray-500 text-sm font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {cert.duration}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
