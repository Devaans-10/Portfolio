import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-black py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
          DP<span className="text-white">.</span>
        </div>
        
        <div className="text-gray-500 text-sm font-mono">
          &copy; {currentYear} Devaans Patwari. All rights reserved.
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-gray-400 hover:text-[var(--color-neon-pink)] transition-colors">
            GitHub
          </a>
          <a href="#" className="text-gray-400 hover:text-[var(--color-neon-purple)] transition-colors">
            Twitter
          </a>
        </div>
        
      </div>
    </footer>
  );
}
