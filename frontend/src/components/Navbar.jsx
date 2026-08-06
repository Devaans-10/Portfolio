import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
          DP<span className="text-white">.</span>
        </a>
        
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-gray-300 hover:text-[var(--color-neon-blue)] transition-colors text-sm uppercase tracking-widest font-semibold"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu could go here if needed, keeping simple for now */}
        <a href="#contact" className="md:hidden text-[var(--color-neon-blue)] border border-[var(--color-neon-blue)] px-4 py-2 rounded-full text-xs uppercase tracking-widest">
          Connect
        </a>
      </div>
    </nav>
  );
}
