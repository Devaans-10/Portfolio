import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../data/personal';
import ScratchCoinCard from './ScratchCoinCard';

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
            {/* 4. ORIGIN TIMELINE (3-step block: Started as / Became / Currently) */}
            <div className="mb-8 p-4 rounded-xl bg-surface/90 border border-border flex flex-col sm:flex-row sm:items-stretch gap-4 sm:gap-6 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px]">
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold mb-0.5">
                  Started as
                </span>
                <span className="text-lg font-bold text-text">
                  Student
                </span>
              </div>
              <div className="hidden sm:block w-px bg-border/80 my-0.5" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#a78bfa] font-semibold mb-0.5">
                  Became
                </span>
                <span className="text-lg font-bold text-text">
                  AI/ML Builder
                </span>
              </div>
              <div className="hidden sm:block w-px bg-border/80 my-0.5" />
              <div className="flex flex-col">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#00d4ff] font-semibold mb-0.5">
                  Currently
                </span>
                <span className="text-lg font-bold text-text">
                  Hackathon Finalist &amp; AICTE Intern
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text mb-4">Background</h3>
            <p className="text-text-muted leading-relaxed mb-4">
              I&apos;m an undergraduate studying AI and Machine Learning in Gujarat. I got into coding because I&apos;ve always liked figuring out how things work under the hood — and seeing an idea go from an empty editor to something people can click, test, and use never gets old.
            </p>
            <p className="text-text-muted leading-relaxed">
              A lot of my growth has come from jumping into the deep end: building fast at hackathons (podium finish at Regalia 2026, top 15 at MEGA HACKATHON, and shipping at ViCoDathon and Bharat Builds), diving into Agentic AI and IBM WatsonX during my AICTE internship, and hanging out with the open-source community at Hacktoberfest Bengaluru.
            </p>
          </motion.div>

          {/* Skills & Hidden Fun Fact Scratch Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-text mb-4">What I work with</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {SKILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 rounded-md text-sm text-text-muted bg-surface border border-border"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Scratch to reveal coin element */}
            <ScratchCoinCard />
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
