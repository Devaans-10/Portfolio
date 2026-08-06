import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Arogya-AI-Agent',
      desc: 'An intelligent AI health agent that provides medical advice and health recommendations using advanced AI models',
      tech: ['Python', 'AI/ML', 'Healthcare'],
      liveUrl: 'https://lnkd.in/gS7yZwv5',
      githubUrl: 'https://github.com/Devaans-10/Arogya-AI-Agent.git',
      color: 'var(--color-neon-blue)'
    },
    {
      title: 'My Portfolio',
      desc: 'A stunning interactive portfolio website showcasing projects and skills with modern UI/UX design',
      tech: ['React', 'Web Design', 'Frontend'],
      liveUrl: 'https://lnkd.in/gCpc_bpw',
      githubUrl: 'https://github.com/Devaans-10/Portfolio.git',
      color: 'var(--color-neon-purple)'
    },
    {
      title: 'Travel AI Agent Chatbot',
      desc: 'An intelligent chatbot that helps users plan trips, find destinations, and get travel recommendations',
      tech: ['Node.js', 'AI', 'Chatbot'],
      liveUrl: 'https://lnkd.in/gUCmcvH9',
      githubUrl: 'https://github.com/Devaans-10/AI-CHAT-BOT.git',
      color: 'var(--color-neon-pink)'
    },
    {
      title: 'LinkedIn Dev Card Generator',
      desc: 'A tool that automatically generates professional LinkedIn developer cards with custom styling and social media integration',
      tech: ['Full Stack', 'LinkedIn API', 'Automation'],
      liveUrl: 'https://lnkd.in/d8PcCVhe',
      githubUrl: 'https://github.com/Devaans-10/Linkdin-Card-.git',
      color: 'var(--color-neon-blue)'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 w-full min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-mono text-white mb-16 text-center"
        >
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Projects</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -10 }}
              className="bg-[var(--color-dark-surface)] rounded-2xl p-8 border border-white/5 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 relative overflow-hidden flex flex-col h-full group"
            >
              {/* Hover Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }}
              ></div>
              
              <h3 className="text-2xl font-bold text-white mb-4 z-10 relative">{project.title}</h3>
              <p className="text-gray-400 mb-6 z-10 relative flex-grow">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8 z-10 relative">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-gray-300 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 z-10 relative mt-auto">
                <a 
                  href={project.liveUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-neon-blue)] text-black text-sm font-bold rounded-lg hover:bg-white hover:shadow-[0_0_15px_rgba(0,212,255,0.6)] transition-all duration-300"
                >
                  View Live
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-neon-purple)] text-white text-sm font-bold rounded-lg hover:bg-white hover:text-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(109,40,217,0.6)] transition-all duration-300"
                >
                  GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
