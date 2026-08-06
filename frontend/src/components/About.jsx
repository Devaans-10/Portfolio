import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    { name: 'Python', color: 'bg-blue-500' },
    { name: 'Machine Learning', color: 'bg-[var(--color-neon-purple)]' },
    { name: 'Artificial Intelligence', color: 'bg-[var(--color-neon-pink)]' },
    { name: 'Google Cloud Platform (GCP)', color: 'bg-blue-400' },
    { name: 'Three.js / React', color: 'bg-[var(--color-neon-blue)]' },
    { name: 'Data Analysis', color: 'bg-green-400' },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 w-full min-h-screen flex flex-col justify-center items-center bg-transparent relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-neon-purple)] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-neon-blue)] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl w-full z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 text-center"
        >
          &lt;About Me /&gt;
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mb-2">
            Full Stack Developer | AI Enthusiast | Google-Certified Professional
          </h3>
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            Building AI Solutions | B.Tech AI/ML Student | Google-Certified
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl"
          >
            <h3 className="text-2xl font-bold text-[var(--color-neon-blue)] mb-4">Background</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              I’m Devaans Patwari, a B.Tech student specializing in Artificial Intelligence and Machine Learning. 
              My journey is driven by a deep fascination with how technology can solve complex, real-world problems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From building web platforms like UnitySOS during the MEGA HACKATHON to developing Face Recognition Systems as an AI Intern, 
              I am constantly pushing the boundaries of what I can build and learn.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-black/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-[var(--color-neon-pink)] mb-6">Core Competencies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${skill.color}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-lg font-bold text-gray-400 mb-3">Certifications</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
                <li>Google Gemini Certified</li>
                <li>Google Cloud ADK Skill Badge</li>
                <li>Python Certified</li>
                <li>IBM AI & Cybersecurity</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
