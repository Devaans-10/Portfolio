import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 w-full min-h-screen bg-[var(--color-dark-surface)] flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold font-mono text-white mb-6 text-center"
        >
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-pink)] to-[var(--color-neon-purple)]">Connect</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 mb-12 max-w-xl mx-auto"
        >
          Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-black/50 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-pink)] rounded-full blur-[100px] opacity-30"></div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-pink)] transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`mt-4 py-4 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                submitted 
                  ? 'bg-green-500 text-white' 
                  : 'bg-transparent border-2 border-[var(--color-neon-pink)] text-[var(--color-neon-pink)] hover:bg-[var(--color-neon-pink)] hover:text-black hover:shadow-[0_0_20px_rgba(255,0,110,0.5)]'
              }`}
            >
              {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
