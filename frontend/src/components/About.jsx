import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/personal';

export default function About() {
  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12 w-full flex flex-col justify-center items-center relative"
    >
      <div className="max-w-4xl w-full z-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-text mb-4"
        >
          About me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-text-muted text-sm font-mono tracking-wide mb-16"
        >
          Background, certifications, and what I work with.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-text mb-4">Background</h3>
            <p className="text-text-muted leading-relaxed mb-4">
              I&apos;m a B.Tech student specializing in AI and Machine Learning. I got into this field
              because I wanted to build things that actually solve problems — not just study them in textbooks.
            </p>
            <p className="text-text-muted leading-relaxed">
              From hackathons (Top 3 at Regalia 2026, Top 15 at MEGA HACKATHON) to my AICTE internship
              working with Agentic AI and IBM WatsonX, I&apos;m always looking for the next challenge to tackle.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-text mb-4">What I work with</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  className="px-3 py-1.5 rounded-md text-sm text-text-muted bg-surface border border-border"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications & Experience Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-text mb-6">Certifications &amp; Training</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-semibold text-text mb-1">Google Cloud Gen AI Academy</p>
              <p className="text-xs text-text-muted">APAC 2026 — Generative AI, LLMs, and Cloud-based AI solutions</p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-semibold text-text mb-1">Google AI Essentials</p>
              <p className="text-xs text-text-muted">AI fundamentals, ethics, and practical applications</p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-semibold text-text mb-1">IBM Cybersecurity Certification</p>
              <p className="text-xs text-text-muted">Emerging tech security and best practices</p>
            </div>
            <div className="bg-surface border border-border rounded-lg p-5">
              <p className="text-sm font-semibold text-text mb-1">AICTE Internship</p>
              <p className="text-xs text-text-muted">1-month internship in Agentic AI &amp; IBM WatsonX</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
