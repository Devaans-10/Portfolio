import React from 'react';
import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../data/certifications';
import CopyButton from './ui/CopyButton';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6 md:px-12 w-full relative">
      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text mb-4"
          >
            Certifications
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-text-muted text-sm font-mono tracking-wide"
          >
            Things I&apos;ve studied and gotten certified in.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              variants={itemVariants}
              className="bg-surface rounded-lg p-5 border border-border hover:border-border-hover transition-colors duration-200 flex flex-col h-full group"
            >
              {/* Title & Status */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold text-text max-w-[80%] leading-snug">
                  {cert.name}
                </h3>
                <span className="text-[10px] font-medium text-accent uppercase tracking-wider shrink-0">
                  {cert.status === 'Certified' ? '✓' : '—'}
                </span>
              </div>

              {/* Issuer */}
              <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-3">
                {cert.issuer}
              </p>

              <p className="text-text-dim text-sm mb-4 flex-grow leading-relaxed">
                {cert.description}
              </p>

              {/* Skills Tags */}
              {cert.skills && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded bg-bg text-text-dim border border-border">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-text-dim pt-3 border-t border-border">
                <span>{cert.date}</span>
                {cert.credentialId && <CopyButton text={cert.credentialId} />}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
