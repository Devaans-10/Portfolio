import React, { useEffect, useRef, useCallback } from 'react';
import { PROJECTS } from '../data/projects';
import './CardSwap.css';

/**
 * Animated card stack that cycles through projects via GSAP.
 * Auto-rotates every 5s, pauses on hover.
 */
export default function CardSwapProjects() {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoPlay = useCallback((swapFn) => {
    intervalRef.current = setInterval(swapFn, 5000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.swap-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    const STAGGER_X = 50;
    const STAGGER_Y = 60;

    cards.forEach((card, i) => {
      gsap.set(card, {
        x: i * STAGGER_X,
        y: i * STAGGER_Y,
        zIndex: totalCards - i,
        opacity: 1 - i * 0.18,
      });
    });

    const swapCard = () => {
      const topCard = cards[currentIndex];
      const nextIndex = (currentIndex + 1) % totalCards;

      const tl = gsap.timeline();

      tl.to(topCard, {
        y: 180,
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        onComplete: () => gsap.set(topCard, { zIndex: 0 }),
      });

      cards.forEach((card, i) => {
        if (i !== currentIndex) {
          const offset = (i - nextIndex + totalCards) % totalCards;
          gsap.to(card, {
            x: offset * STAGGER_X,
            y: offset * STAGGER_Y,
            zIndex: totalCards - offset,
            opacity: 1 - offset * 0.18,
            duration: 1,
            ease: 'power3.out',
          });
        }
      });

      tl.to(
        topCard,
        {
          x: (totalCards - 1) * STAGGER_X,
          y: (totalCards - 1) * STAGGER_Y,
          opacity: 1 - (totalCards - 1) * 0.18,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.3'
      );

      currentIndex = nextIndex;
    };

    startAutoPlay(swapCard);

    const container = containerRef.current;
    const handleEnter = () => stopAutoPlay();
    const handleLeave = () => startAutoPlay(swapCard);
    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      stopAutoPlay();
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <div className="card-swap-wrapper" ref={containerRef}>
      {PROJECTS.map((project) => (
        <div key={project.id} className="swap-card group">
          <div className="swap-card-content">
            <h3 className="text-2xl font-bold text-text mb-3">
              {project.title}
            </h3>
            <p className="text-text-muted mb-6 flex-grow text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono text-text-dim bg-bg/60 px-2.5 py-1 rounded border border-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2.5 bg-accent text-bg text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-200"
              >
                View Live
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center px-4 py-2.5 border border-border text-text-muted text-sm font-semibold rounded-lg hover:text-text hover:border-border-hover transition-all duration-200"
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
