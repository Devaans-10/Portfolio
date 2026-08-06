import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      title: 'Nutrition AI Agent',
      desc: 'An AI-powered application that analyzes food images to provide detailed nutritional breakdown and dietary recommendations.',
      tech: ['Python', 'AI/ML', 'Computer Vision'],
      link: '#',
      color: 'var(--color-neon-blue)'
    },
    {
      title: 'UnitySOS',
      desc: 'Top 15 at MEGA HACKATHON 2026. A comprehensive web application designed to save lives during emergencies with one-click SOS & smart resource locator.',
      tech: ['React', 'Node.js', 'Maps API'],
      link: '#',
      color: 'var(--color-neon-purple)'
    },
    {
      title: 'ANONYMI',
      desc: 'Top 3 at Regalia 2026. A secure platform built for privacy-first communication and data protection.',
      tech: ['Cybersecurity', 'Web3', 'React'],
      link: '#',
      color: 'var(--color-neon-pink)'
    },
    {
      title: 'Face Recognition System',
      desc: 'Developed during my AI Internship using PCA & Artificial Neural Networks for high-accuracy biometric identification.',
      tech: ['Python', 'PCA', 'ANN'],
      link: '#',
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-[var(--color-dark-surface)] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Hover Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ background: `linear-gradient(45deg, ${project.color}, transparent)` }}
              ></div>
              
              <h3 className="text-2xl font-bold text-white mb-4 z-10 relative">{project.title}</h3>
              <p className="text-gray-400 mb-6 z-10 relative h-20">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mb-8 z-10 relative">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-gray-300 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                className="inline-block text-sm font-bold uppercase tracking-wider z-10 relative transition-colors duration-300"
                style={{ color: project.color }}
              >
                View Project &rarr;
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
