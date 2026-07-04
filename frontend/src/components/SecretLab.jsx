import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretLab() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + Shift + D
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-8 backdrop-blur-sm"
        >
          <div className="glass-panel p-10 rounded-2xl w-full max-w-4xl relative border-[var(--color-neon-purple)]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[var(--color-neon-purple)] text-2xl hover:text-white"
            >
              ×
            </button>
            <h2 className="text-4xl font-mono font-bold text-[var(--color-neon-purple)] mb-6 text-center drop-shadow-[0_0_10px_rgba(157,0,255,0.8)]">
              classified_ai_lab.exe
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-mono">
                  &gt; INITIALIZING NEURAL NETWORK VISUALIZER...<br/>
                  &gt; LOADING PRE-TRAINED WEIGHTS...<br/>
                  &gt; READY.
                </p>
                <div className="h-64 bg-gray-200 dark:bg-gray-900 rounded-xl border border-gray-400 dark:border-gray-700 p-4 flex items-center justify-center relative overflow-hidden group cursor-crosshair">
                  {/* Fake Neural Network Animation */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-neon-purple)_0%,_transparent_70%)] opacity-20"></div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-dashed border-[var(--color-neon-purple)] rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-48 h-48 border-2 border-dotted border-[var(--color-neon-blue)] rounded-full"
                  ></motion.div>
                  <p className="absolute text-gray-900 dark:text-white font-bold tracking-widest pointer-events-none">MODEL.TRAIN()</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Experimental Sandbox</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  This section is dedicated to cutting-edge web ML experiments. 
                  Future updates will include TensorFlow.js integration right here in the browser.
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-[var(--color-neon-purple)] text-black font-bold rounded-lg hover:bg-white transition-colors">
                    RUN TEST
                  </button>
                  <button className="px-6 py-2 border border-[var(--color-neon-purple)] text-[var(--color-neon-purple)] font-bold rounded-lg hover:bg-[var(--color-neon-purple)]/20 transition-colors">
                    DUMP LOGS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
