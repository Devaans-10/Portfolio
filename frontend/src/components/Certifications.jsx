import React from 'react';
import { motion } from 'framer-motion';

export default function Certifications() {
  const certifications = [
    {
      name: 'Make Agentic AI Work for You',
      issuer: 'IBM',
      date: 'August 2026',
      type: 'Professional Certification',
      description: 'Advanced certification in building AI-powered agentic solutions',
      status: 'Certified',
      color: 'var(--color-neon-blue)'
    },
    {
      name: 'Deploy Your First Agent',
      issuer: 'Google Developer Experts',
      date: 'July 2026',
      type: 'Professional Certification',
      credentialId: '26165982',
      description: 'Hands-on training for deploying AI agents in production environments',
      status: 'Certified',
      color: 'var(--color-neon-purple)'
    },
    {
      name: 'Build and Deploy Agents in Production',
      issuer: 'Google',
      date: 'July 2026',
      type: 'Professional Certification',
      credentialId: '26164290',
      description: 'Advanced course on building scalable AI agents for enterprise applications',
      status: 'Certified',
      color: '#00d4ff'
    },
    {
      name: 'Create Your First Gemini Enterprise Application',
      issuer: 'Google',
      date: 'July 2026',
      type: 'Professional Certification',
      description: 'Enterprise-level application development using Google\'s Gemini AI',
      status: 'Certified',
      color: 'var(--color-neon-pink)'
    },
    {
      name: 'Capture the Flag 101: Find and Submit Your First Flag',
      issuer: 'HackerDNA',
      date: 'July 2026',
      type: 'Cybersecurity Challenge',
      credentialId: '58a9f476-6c5d-4727-b3f1-b5a688c38d66',
      skills: 'Cybersecurity, Problem Solving',
      description: 'Foundational capture the flag concepts and challenges',
      status: 'Completed',
      color: '#6d28d9'
    },
    {
      name: 'Google AI Essentials V1',
      issuer: 'Coursera / Google',
      date: 'July 2026',
      type: 'Professional Certification',
      skills: 'Artificial Intelligence (AI), Prompt Engineering',
      description: 'Comprehensive introduction to AI fundamentals and prompt engineering techniques',
      status: 'Certified',
      color: 'var(--color-neon-blue)'
    },
    {
      name: 'Getting Started with Cybersecurity',
      issuer: 'IBM',
      date: 'July 2026',
      type: 'Professional Certification',
      skills: 'Cybersecurity',
      description: 'Foundational cybersecurity concepts and best practices',
      status: 'Certified',
      color: 'var(--color-neon-purple)'
    },
    {
      name: 'Certificate of Participation in CampusCrew: 100K Special Certificate Distribution of Google Gemini QuizOff 2026',
      issuer: 'Unstop',
      date: 'June 2026',
      type: 'Participation Certificate',
      credentialId: '97c4c0ad-00c1-4ded-8bb2-769b4e4042e9',
      description: 'Special recognition for participation in Google Gemini QuizOff 2026',
      status: 'Completed',
      color: '#00d4ff'
    },
    {
      name: 'Getting Started with Artificial Intelligence',
      issuer: 'IBM',
      date: 'June 2026',
      type: 'Professional Certification',
      description: 'Foundational concepts and applications of Artificial Intelligence',
      status: 'Certified',
      color: 'var(--color-neon-pink)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 w-full min-h-screen bg-transparent relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-mono text-white mb-4"
          >
            Certifications &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-pink)] to-[#00d4ff]">Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Professional credentials and recognitions
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {certifications.map((cert, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-black/60 rounded-xl p-6 border border-white/10 hover:border-white/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-300 relative overflow-hidden flex flex-col h-full group"
            >
              {/* Hover Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${cert.color}, transparent)` }}
              ></div>
              
              <div className="flex justify-between items-start mb-3 z-10 relative">
                <h3 className="text-xl font-bold text-white max-w-[75%] leading-tight">{cert.name}</h3>
                
                {/* Badge */}
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/40 rounded-full shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">{cert.status}</span>
                </div>
              </div>
              
              <div className="z-10 relative mb-4">
                <h4 className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: cert.color }}>
                  {cert.issuer}
                </h4>
                <div className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider">
                  {cert.type}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-5 z-10 relative flex-grow">{cert.description}</p>
              
              <div className="z-10 relative mt-auto space-y-2">
                {cert.skills && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cert.skills.split(', ').map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {cert.date}
                  </div>
                  
                  {cert.credentialId && (
                    <div 
                      className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors"
                      title="Copy Credential ID"
                      onClick={() => navigator.clipboard.writeText(cert.credentialId)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      ID
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

