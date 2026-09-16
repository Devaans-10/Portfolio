import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL } from '../data/personal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Server error (${res.status})`);
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Try again?');
      timeoutRef.current = setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <section
      id="contact"
      className="py-28 px-6 md:px-12 w-full flex flex-col justify-center items-center"
    >
      <div className="max-w-xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-text mb-4"
        >
          Say hello
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-text-muted mb-4"
        >
          Got a question, idea, or just want to chat? I&apos;d love to hear from you.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          href={`mailto:${PERSONAL.email}`}
          className="inline-block text-accent text-sm font-mono hover:underline mb-12"
        >
          {PERSONAL.email}
        </motion.a>

        <motion.form
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs text-text-muted tracking-wide">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                className="bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-dim"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs text-text-muted tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm focus:outline-none focus:border-accent/40 transition-colors placeholder:text-text-dim"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs text-text-muted tracking-wide">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={2000}
              rows="5"
              className="bg-surface border border-border rounded-lg px-4 py-3 text-text text-sm focus:outline-none focus:border-accent/40 transition-colors resize-none placeholder:text-text-dim"
              placeholder="What's on your mind?"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400/80 text-sm" role="alert">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 py-3 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
              status === 'success'
                ? 'bg-accent/20 text-accent cursor-default'
                : 'bg-accent text-bg hover:bg-accent-hover disabled:opacity-50 disabled:cursor-wait'
            }`}
            aria-live="polite"
          >
            {isSubmitting ? 'Sending...' : status === 'success' ? '✓ Sent!' : 'Send message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
