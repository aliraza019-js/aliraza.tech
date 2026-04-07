"use client";

import { useRef, useCallback, ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glareOpacity = 0.12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        const glare = glareRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateX = (-mouseY / (rect.height / 2)) * maxTilt;
        const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          const glareX = ((e.clientX - rect.left) / rect.width) * 100;
          const glareY = ((e.clientY - rect.top) / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(201,243,28,${glareOpacity}), transparent 60%)`;
          glare.style.opacity = "1";
        }
      });
    },
    [maxTilt, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card) {
      card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      setTimeout(() => {
        if (card) card.style.transition = "";
      }, 500);
    }
    if (glare) {
      glare.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 transition-opacity duration-300 z-30"
      />
    </div>
  );
}
