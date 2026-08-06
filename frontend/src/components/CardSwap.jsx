import React, { useEffect, useRef } from 'react';
import './CardSwap.css';

const projects = [
  {
    title: 'Arogya-AI-Agent',
    desc: 'An intelligent AI health agent that provides medical advice and health recommendations using advanced AI models',
    tech: ['Python', 'AI/ML', 'Healthcare'],
    liveUrl: 'https://lnkd.in/gS7yZwv5',
    githubUrl: 'https://github.com/Devaans-10/Arogya-AI-Agent.git',
    color: '#00d4ff'
  },
  {
    title: 'My Portfolio',
    desc: 'A stunning interactive portfolio website showcasing projects and skills with modern UI/UX design',
    tech: ['React', 'Web Design', 'Frontend'],
    liveUrl: 'https://frontend-kappa-silk-1a4hndk0vs.vercel.app/',
    githubUrl: 'https://github.com/Devaans-10/Portfolio.git',
    color: '#6d28d9'
  },
  {
    title: 'Travel AI Agent Chatbot',
    desc: 'An intelligent chatbot that helps users plan trips, find destinations, and get travel recommendations',
    tech: ['Node.js', 'AI', 'Chatbot'],
    liveUrl: 'https://lnkd.in/gUCmcvH9',
    githubUrl: 'https://github.com/Devaans-10/AI-CHAT-BOT.git',
    color: '#ff006e'
  },
  {
    title: 'LinkedIn Dev Card Generator',
    desc: 'A tool that automatically generates professional LinkedIn developer cards with custom styling and social media integration',
    tech: ['Full Stack', 'LinkedIn API', 'Automation'],
    liveUrl: 'https://vibe-coding-antigravity-ret0fhzdv-devaans-projects-dcacfc1b.vercel.app',
    githubUrl: 'https://github.com/Devaans-10/Linkdin-Card-.git',
    color: '#00d4ff'
  }
];

export default function CardSwap() {
  const containerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !containerRef.current) return;

    const cards = gsap.utils.toArray('.swap-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Initial setup with horizontal 60px, vertical 70px as requested
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: i * 60,
        y: i * 70,
        zIndex: totalCards - i,
        opacity: 1 - (i * 0.15)
      });
    });

    const swapCard = () => {
      const topCard = cards[currentIndex];
      const nextIndex = (currentIndex + 1) % totalCards;
      
      const tl = gsap.timeline();
      
      // Top card drops down and moves to back
      tl.to(topCard, {
        y: 200,
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(topCard, { zIndex: 0 }); // Move to back
        }
      });

      // Move other cards up smoothly with elastic ease
      cards.forEach((card, i) => {
        if (i !== currentIndex) {
          let offset = (i - nextIndex + totalCards) % totalCards;
          gsap.to(card, {
            x: offset * 60,
            y: offset * 70,
            zIndex: totalCards - offset,
            opacity: 1 - (offset * 0.15),
            duration: 1.2,
            ease: "elastic.out(1, 0.6)"
          });
        }
      });
      
      // Move previous top card to the back of the stack
      tl.to(topCard, {
        x: (totalCards - 1) * 60,
        y: (totalCards - 1) * 70,
        opacity: 1 - ((totalCards - 1) * 0.15),
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      currentIndex = nextIndex;
    };

    const interval = setInterval(swapCard, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card-swap-wrapper" ref={containerRef}>
      {projects.map((project, index) => (
        <div key={index} className="swap-card group">
          {/* Background gradient */}
          <div 
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
            style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}
          />
          
          <div className="swap-card-content">
            <h3 className="text-3xl font-bold text-white mb-3" style={{ textShadow: `0 0 10px ${project.color}80` }}>
              {project.title}
            </h3>
            <p className="text-gray-300 mb-6 flex-grow text-sm md:text-base leading-relaxed">
              {project.desc}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t, i) => (
                <span key={i} className="text-xs font-mono text-white bg-black/40 px-3 py-1.5 rounded-full border border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-auto">
              <a 
                href={project.liveUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0080ff] text-black text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] hover:scale-105 transition-all duration-300"
              >
                View Live
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#6d28d9] text-white text-sm font-bold rounded-xl hover:shadow-[0_0_20px_rgba(109,40,217,0.6)] hover:bg-[#5b21b6] hover:scale-105 transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
