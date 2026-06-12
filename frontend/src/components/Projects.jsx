import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projectData = [
  { id: 1, title: 'UnitySOS', stack: 'React, Maps API', summary: 'A comprehensive web application designed to save lives during emergencies with SOS buttons and Smart Resource Locators. Top 15 at MEGA HACKATHON 2026.' },
  { id: 2, title: 'ANONYMI', stack: 'Next.js, Node.js, MongoDB, Socket.io', summary: 'An anonymous real-time community platform built with a focus on structured interaction and digital safety. Top 3 at Regalia 2026.' },
  { id: 3, title: 'Advanced AI Profiling', stack: 'Google Cloud, Gemini, Vertex AI', summary: 'Built an advanced AI profiling system with natural language analysis and secure LinkedIn scraping.' },
  { id: 4, title: 'Face Recognition System', stack: 'Python, PCA, ANN', summary: 'Implemented a Face Recognition System using Principal Component Analysis and Artificial Neural Networks.' },
  { id: 5, title: 'Cloud-Native HTML Generator', stack: 'Node.js, React, Google Cloud', summary: 'Developed a professional HTML card generation system leveraging cloud-native architecture.' },
];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? projectData 
    : projectData.filter(p => p.stack.includes(filter));

  return (
    <section className="py-20 px-8 w-full min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-mono text-[var(--color-neon-pink)] mb-10 text-center drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">
          Featured Projects
        </h2>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['All', 'Google Cloud', 'Python', 'React', 'Node.js', 'Next.js'].map(tech => (
            <button 
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full border border-[var(--color-neon-pink)] transition-all ${filter === tech ? 'bg-[var(--color-neon-pink)] text-white shadow-[0_0_10px_rgba(255,0,255,0.6)]' : 'text-[var(--color-neon-pink)] hover:bg-[var(--color-neon-pink)]/20'}`}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-panel p-6 rounded-xl flex flex-col items-center text-center relative group"
            >
              <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
              <p className="text-sm text-[var(--color-neon-blue)] mb-4">{project.stack}</p>
              <p className="text-gray-300 flex-grow">{project.summary}</p>
              
              <div className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-6 py-2 bg-[var(--color-neon-blue)] text-black font-bold rounded-full hover:bg-white transition-colors">
                  View Code
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
