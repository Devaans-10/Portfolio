import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/projects';
import './CardSwap.css';

/**
 * Animated card stack that cycles through projects via GSAP.
 * Auto-rotates every 5s with elastic easing — continuous, no pause on hover.
 */
export default function CardSwapProjects() {
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.swap-card');
    if (cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    const STAGGER_X = 60;
    const STAGGER_Y = 70;

    // Initial stack layout
    cards.forEach((card, i) => {
      gsap.set(card, {
        x: i * STAGGER_X,
        y: i * STAGGER_Y,
        zIndex: totalCards - i,
        opacity: 1 - i * 0.12,
      });
    });

    const swapCard = () => {
      const topCard = cards[currentIndex];
      const nextIndex = (currentIndex + 1) % totalCards;

      const tl = gsap.timeline();

      // Animate top card out
      tl.to(topCard, {
        y: 200,
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.6)',
        onComplete: () => gsap.set(topCard, { zIndex: 0 }),
      });

      // Shift remaining cards up
      cards.forEach((card, i) => {
        if (i !== currentIndex) {
          const offset = (i - nextIndex + totalCards) % totalCards;
          gsap.to(card, {
            x: offset * STAGGER_X,
            y: offset * STAGGER_Y,
            zIndex: totalCards - offset,
            opacity: 1 - offset * 0.12,
            duration: 1.2,
            ease: 'elastic.out(1, 0.75)',
          });
        }
      });

      // Send top card to back of stack
      tl.to(
        topCard,
        {
          x: (totalCards - 1) * STAGGER_X,
          y: (totalCards - 1) * STAGGER_Y,
          opacity: 1 - (totalCards - 1) * 0.12,
          duration: 0.8,
          ease: 'elastic.out(1, 0.6)',
        },
        '-=0.4'
      );

      currentIndex = nextIndex;
    };

    // Continuous animation — no pause on hover
    intervalRef.current = setInterval(swapCard, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
