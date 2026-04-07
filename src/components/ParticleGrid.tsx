"use client";

import { useEffect, useRef, useCallback } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
}

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);
  const dprRef = useRef(1);

  const SPACING = 45;
  const MOUSE_RADIUS = 150;
  const PUSH_STRENGTH = 25;
  const RETURN_SPEED = 0.06;
  const DAMPING = 0.85;
  const CONNECT_DIST = 90;

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / SPACING) + 2;
    const rows = Math.ceil(height / SPACING) + 2;
    const offsetX = (width - (cols - 1) * SPACING) / 2;
    const offsetY = (height - (rows - 1) * SPACING) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * SPACING;
        const y = offsetY + r * SPACING;
        dots.push({
          baseX: x,
          baseY: y,
          x,
          y,
          vx: 0,
          vy: 0,
          radius: 1.2,
          baseAlpha: 0.15 + Math.random() * 0.1,
          alpha: 0.15 + Math.random() * 0.1,
        });
      }
    }
    return dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    dprRef.current = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = dprRef.current;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = initDots(rect.width, rect.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const { width, height } = rect;

      ctx.clearRect(0, 0, width, height);
      const dots = dotsRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * PUSH_STRENGTH;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * 0.02;
          dot.vy -= Math.sin(angle) * force * 0.02;
          dot.alpha = Math.min(0.8, dot.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.6);
        } else {
          dot.alpha += (dot.baseAlpha - dot.alpha) * 0.05;
        }

        dot.vx += (dot.baseX - dot.x) * RETURN_SPEED;
        dot.vy += (dot.baseY - dot.y) * RETURN_SPEED;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;
      }

      // Draw connections near mouse
      ctx.lineWidth = 0.5;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const dxm = mouse.x - a.x;
        const dym = mouse.y - a.y;
        const distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm > MOUSE_RADIUS * 1.5) continue;

        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < CONNECT_DIST) {
            const lineAlpha = (1 - dd / CONNECT_DIST) * 0.25 * Math.max(a.alpha, b.alpha);
            ctx.strokeStyle = `rgba(201, 243, 28, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 243, 28, ${dot.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      aria-hidden="true"
    />
  );
}
