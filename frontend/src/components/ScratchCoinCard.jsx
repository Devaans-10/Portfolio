import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Scratch-to-reveal card with an interactive gold coin and touch/mouse canvas scratching.
 * Automatically unveils when >60% of the surface is scratched away.
 */
export default function ScratchCoinCard() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [coinPos, setCoinPos] = useState({ x: 30, y: 30, visible: false });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lastPosRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize and paint canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    // Dark charcoal scratch coating matching site surface
    ctx.fillStyle = '#222220';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle hatch lines
    ctx.strokeStyle = '#2b2b27';
    ctx.lineWidth = 1;
    for (let i = -rect.height; i < rect.width + rect.height; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + rect.height, rect.height);
      ctx.stroke();
    }

    // Centered instruction text
    ctx.fillStyle = '#8a8580';
    ctx.font = '500 12px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪙 Drag coin to scratch', rect.width / 2, rect.height / 2);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let cleared = 0;
      const step = 24; // Sample every 24th pixel for performance
      const total = Math.floor(data.length / (4 * step));

      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 128) cleared++;
      }

      if (cleared / total >= 0.6) {
        setIsRevealed(true);
      }
    } catch {
      // Ignore security/cross-origin edge cases
    }
  };

  const getCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasX = x * dpr;
    const canvasY = y * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    if (lastPosRef.current) {
      const lastX = lastPosRef.current.x * dpr;
      const lastY = lastPosRef.current.y * dpr;
      const dist = Math.hypot(canvasX - lastX, canvasY - lastY);
      const steps = Math.max(1, Math.floor(dist / 4));

      for (let i = 0; i <= steps; i++) {
        const cx = lastX + (canvasX - lastX) * (i / steps);
        const cy = lastY + (canvasY - lastY) * (i / steps);
        ctx.beginPath();
        ctx.arc(cx, cy, 22 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.beginPath();
      ctx.arc(canvasX, canvasY, 22 * dpr, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPosRef.current = { x, y };
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (isRevealed || e.touches.length === 0) return;
    setIsScratching(true);
    const touch = e.touches[0];
    const coords = getCanvasCoords(touch.clientX, touch.clientY);
    setCoinPos({ x: coords.x, y: coords.y, visible: true });
    lastPosRef.current = coords;
    scratchAt(coords.x, coords.y);
  };

  const handleTouchMove = (e) => {
    if (!isScratching || isRevealed || e.touches.length === 0) return;
    e.preventDefault();
    const touch = e.touches[0];
    const coords = getCanvasCoords(touch.clientX, touch.clientY);
    setCoinPos({ x: coords.x, y: coords.y, visible: true });
    scratchAt(coords.x, coords.y);
    checkScratchPercentage();
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    checkScratchPercentage();
  };

  // Mouse handlers
  const handleMouseDown = (e) => {
    if (isRevealed) return;
    setIsScratching(true);
    const coords = getCanvasCoords(e.clientX, e.clientY);
    lastPosRef.current = coords;
    scratchAt(coords.x, coords.y);
  };

  const handleMouseMove = (e) => {
    const coords = getCanvasCoords(e.clientX, e.clientY);
    setCoinPos({ x: coords.x, y: coords.y, visible: true });
    if (!isScratching || isRevealed) return;
    scratchAt(coords.x, coords.y);
    checkScratchPercentage();
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    checkScratchPercentage();
  };

  const handleMouseLeave = () => {
    setIsScratching(false);
    lastPosRef.current = null;
    setCoinPos((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="w-full mt-4">
      {/* Coin indicator & Fallback header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Round Gold-Toned Coin Element */}
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-md border border-amber-300/80 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 ${
              prefersReducedMotion ? '' : 'transition-transform duration-200'
            }`}
            style={{
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)',
            }}
            aria-hidden="true"
          >
            <svg
              className="w-3.5 h-3.5 text-amber-950"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.6-6.2 4.6 2.3-7.1-6.1-4.5h7.6z" />
            </svg>
          </div>
          <span className="text-xs font-mono text-text-muted">
            {isRevealed ? 'Secret unlocked!' : 'Scratch card'}
          </span>
        </div>

        {!isRevealed && (
          <button
            type="button"
            onClick={() => setIsRevealed(true)}
            aria-label="Tap to reveal secret fun fact"
            className="text-[11px] font-mono text-accent hover:text-accent-hover hover:underline transition-colors"
          >
            Tap to reveal
          </button>
        )}
      </div>

      {/* Scratch Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden border border-border bg-surface select-none min-h-[115px] flex items-center p-5"
      >
        {/* Hidden Content Underneath */}
        <div className="w-full pr-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-mono text-accent tracking-wide uppercase font-semibold">
              👟 Origin Story
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent font-mono">
              60%+ revealed
            </span>
          </div>
          <p className="text-xs md:text-sm text-text leading-relaxed">
            Fun fact: my first real project was built to help me afford sneakers, and it led to 15 certifications and hackathon wins.
          </p>
        </div>

        {/* Scratchable Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none transition-opacity duration-500 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Scratch surface to reveal secret text"
        />

        {/* Floating Coin tracking cursor/touch on active drag (when motion not reduced) */}
        {!prefersReducedMotion && coinPos.visible && !isRevealed && (
          <div
            className="pointer-events-none absolute w-8 h-8 rounded-full border-2 border-yellow-200 bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 flex items-center justify-center shadow-lg -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: coinPos.x,
              top: coinPos.y,
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.45)',
            }}
            aria-hidden="true"
          >
            <span className="text-[10px] font-bold text-amber-950 font-mono">★</span>
          </div>
        )}
      </div>
    </div>
  );
}
