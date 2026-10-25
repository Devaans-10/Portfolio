import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  {
    id: 'hero',
    label: 'Home',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 'certifications',
    label: 'Certifications',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
        setScrollProgress(current);
      }

      const sections = ['hero', 'about', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. TOP PROGRESS BAR (Fixed ~40px) */}
      <header className="fixed top-0 left-0 right-0 h-10 z-50 bg-[#111110]/95 backdrop-blur-md border-b border-border/80 px-4 sm:px-8 flex items-center justify-between text-xs">
        {/* Left: Name */}
        <button
          type="button"
          onClick={() => scrollToSection('hero')}
          className="font-bold text-text tracking-tight hover:text-[#00d4ff] transition-colors shrink-0 text-left cursor-pointer"
        >
          Devaans Patwari
        </button>

        {/* Right: Live Scroll Percentage */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted shrink-0">
          <span className="text-[10px] uppercase text-text-dim hidden sm:inline">Scroll</span>
          <span className="text-[#00d4ff] font-bold min-w-[34px] text-right">
            {scrollProgress}%
          </span>
        </div>

        {/* Progress Line along bottom edge */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-[#00d4ff] transition-all duration-75 shadow-[0_0_8px_rgba(0,212,255,0.7)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* 2. FLOATING BOTTOM PILL NAV */}
      <nav
        aria-label="Floating section navigation"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#161614]/95 backdrop-blur-xl border border-[rgba(0,212,255,0.3)] shadow-[0_12px_36px_rgba(0,0,0,0.7)] max-w-[calc(100vw-2rem)]"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-1.5 py-1.5 px-3 sm:px-3.5 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#00d4ff] text-[#111110] font-bold shadow-[0_0_14px_rgba(0,212,255,0.45)]'
                  : 'text-text-muted hover:text-text hover:bg-surface-hover'
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
