"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CoverTheme {
  gradient: string;
  accent: string;
  iconBorder: string;
  icon: string;
  pattern: string;
}

const PROJECT_THEMES: Record<string, CoverTheme> = {
  "custom-enterprise-crm": {
    gradient: "from-[#021a08] via-[#0a2e14] to-[#0f3d1f]",
    accent: "#34D399",
    iconBorder: "#A3E635",
    icon: "eco",
    pattern: "radial-gradient(circle at 15% 85%, rgba(52,211,153,0.14) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(163,230,53,0.06) 0%, transparent 40%)",
  },
  "self-hosted-gateway": {
    gradient: "from-[#020818] via-[#0c1a3d] to-[#111d4a]",
    accent: "#6366F1",
    iconBorder: "#38BDF8",
    icon: "credit_card",
    pattern: "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.14) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(56,189,248,0.06) 0%, transparent 40%)",
  },
  "sparkdoc-ai": {
    gradient: "from-[#1a1200] via-[#261a02] to-[#1f1508]",
    accent: "#F59E0B",
    iconBorder: "#FB7185",
    icon: "auto_awesome",
    pattern: "radial-gradient(circle at 25% 80%, rgba(245,158,11,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 25%, rgba(251,113,133,0.06) 0%, transparent 40%)",
  },
  "3d-generative-nft-builder": {
    gradient: "from-[#180028] via-[#28004a] to-[#1e0038]",
    accent: "#D946EF",
    iconBorder: "#818CF8",
    icon: "view_in_ar",
    pattern: "radial-gradient(circle at 20% 75%, rgba(217,70,239,0.14) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(129,140,248,0.06) 0%, transparent 40%)",
  },
  ducorr: {
    gradient: "from-[#1a1008] via-[#241810] to-[#2a1e12]",
    accent: "#EA580C",
    iconBorder: "#FCD34D",
    icon: "engineering",
    pattern: "radial-gradient(circle at 20% 80%, rgba(234,88,12,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(252,211,77,0.06) 0%, transparent 40%)",
  },
  autogather: {
    gradient: "from-[#001a1a] via-[#002828] to-[#003030]",
    accent: "#22D3EE",
    iconBorder: "#6EE7B7",
    icon: "person_search",
    pattern: "radial-gradient(circle at 25% 75%, rgba(34,211,238,0.14) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(110,231,183,0.06) 0%, transparent 40%)",
  },
  forborga: {
    gradient: "from-[#0a0a1e] via-[#12102a] to-[#1a0e28]",
    accent: "#A78BFA",
    iconBorder: "#F472B6",
    icon: "account_balance_wallet",
    pattern: "radial-gradient(circle at 30% 80%, rgba(167,139,250,0.14) 0%, transparent 50%), radial-gradient(circle at 70% 15%, rgba(244,114,182,0.06) 0%, transparent 40%)",
  },
  "managed-hosting-dashboard": {
    gradient: "from-[#0a1018] via-[#101820] to-[#182028]",
    accent: "#60A5FA",
    iconBorder: "#FBBF24",
    icon: "cloud",
    pattern: "radial-gradient(circle at 20% 75%, rgba(96,165,250,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251,191,36,0.06) 0%, transparent 40%)",
  },
  "crypto-wallet": {
    gradient: "from-[#0a0f1e] via-[#101828] to-[#0e1a30]",
    accent: "#F97316",
    iconBorder: "#22D3EE",
    icon: "currency_bitcoin",
    pattern: "radial-gradient(circle at 25% 80%, rgba(249,115,22,0.14) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(34,211,238,0.06) 0%, transparent 40%)",
  },
  "nft-marketplace": {
    gradient: "from-[#120020] via-[#1a0030] to-[#0d001a]",
    accent: "#E879F9",
    iconBorder: "#67E8F9",
    icon: "diamond",
    pattern: "radial-gradient(circle at 20% 80%, rgba(232,121,249,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 15%, rgba(103,232,249,0.06) 0%, transparent 40%)",
  },
  "campaign-builder": {
    gradient: "from-[#0f1a0a] via-[#162210] to-[#1a2a14]",
    accent: "#84CC16",
    iconBorder: "#38BDF8",
    icon: "campaign",
    pattern: "radial-gradient(circle at 25% 80%, rgba(132,204,22,0.14) 0%, transparent 50%), radial-gradient(circle at 75% 15%, rgba(56,189,248,0.06) 0%, transparent 40%)",
  },
  "aladdin-catering": {
    gradient: "from-[#1a0f00] via-[#2a1a08] to-[#1a1000]",
    accent: "#F59E0B",
    iconBorder: "#EF4444",
    icon: "restaurant",
    pattern: "radial-gradient(circle at 30% 75%, rgba(245,158,11,0.14) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(239,68,68,0.06) 0%, transparent 40%)",
  },
  "efxpro": {
    gradient: "from-[#0a0f1a] via-[#0d1525] to-[#06091a]",
    accent: "#3B82F6",
    iconBorder: "#22D3EE",
    icon: "candlestick_chart",
    pattern: "radial-gradient(circle at 20% 80%, rgba(59,130,246,0.14) 0%, transparent 50%), radial-gradient(circle at 80% 15%, rgba(34,211,238,0.06) 0%, transparent 40%)",
  },
};

const FALLBACK_THEME: CoverTheme = {
  gradient: "from-[#0d1117] via-[#161b22] to-[#1a1f2e]",
  accent: "#C9F31D",
  iconBorder: "#A78BFA",
  icon: "code",
  pattern: "radial-gradient(circle at 25% 75%, rgba(201,243,29,0.12) 0%, transparent 50%)",
};

interface ProjectCoverProps {
  slug: string;
  title: string;
  variant?: "card" | "hero";
}

export default function ProjectCover({ slug, title, variant = "card" }: ProjectCoverProps) {
  const theme = PROJECT_THEMES[slug] ?? FALLBACK_THEME;
  const isHero = variant === "hero";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(
      ".cover-icon, .cover-title, .cover-divider, .cover-watermark, .cover-tag, .cover-corner, .cover-glow"
    );
    gsap.set(targets, { visibility: "visible", opacity: 1 });

    const ctx = gsap.context(() => {
      const iconBox = el.querySelector(".cover-icon");
      const titleEl = el.querySelector(".cover-title");
      const divider = el.querySelector(".cover-divider");
      const watermark = el.querySelector(".cover-watermark");
      const tag = el.querySelector(".cover-tag");
      const corners = el.querySelectorAll(".cover-corner");
      const glow = el.querySelector(".cover-glow");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: isHero
          ? undefined
          : { trigger: el, start: "top 85%", once: true },
      });

      tl.fromTo(
        glow,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          iconBox,
          { y: 20, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          titleEl,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          divider,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.35 },
          "-=0.15"
        )
        .fromTo(
          corners,
          { scaleX: 0, scaleY: 0 },
          { scaleX: 1, scaleY: 1, duration: 0.4, stagger: 0.06 },
          "-=0.3"
        )
        .fromTo(
          watermark,
          { x: 10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35 },
          "-=0.2"
        )
        .fromTo(
          tag,
          { x: -10, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.35 },
          "-=0.3"
        );

      if (isHero) {
        gsap.to(iconBox, {
          y: -6,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, el);

    return () => ctx.revert();
  }, [isHero]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-gradient-to-br ${theme.gradient} ${
        isHero ? "h-[500px] md:h-[600px]" : "h-full"
      }`}
    >
      {/* Ambient glow */}
      <div className="cover-glow absolute inset-0" style={{ background: theme.pattern }} />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${theme.accent}40 1px, transparent 1px), linear-gradient(90deg, ${theme.accent}40 1px, transparent 1px)`,
          backgroundSize: isHero ? "60px 60px" : "40px 40px",
        }}
      />

      {/* Corner accent lines */}
      <div
        className="cover-corner absolute top-0 left-0 w-20 h-[1px] origin-left"
        style={{ background: `linear-gradient(90deg, ${theme.iconBorder}50, transparent)` }}
      />
      <div
        className="cover-corner absolute top-0 left-0 h-20 w-[1px] origin-top"
        style={{ background: `linear-gradient(180deg, ${theme.iconBorder}50, transparent)` }}
      />
      <div
        className="cover-corner absolute bottom-0 right-0 w-20 h-[1px] origin-right"
        style={{ background: `linear-gradient(270deg, ${theme.accent}50, transparent)` }}
      />
      <div
        className="cover-corner absolute bottom-0 right-0 h-20 w-[1px] origin-bottom"
        style={{ background: `linear-gradient(0deg, ${theme.accent}50, transparent)` }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
        {/* Icon */}
        <div
          className="cover-icon rounded-2xl border backdrop-blur-sm flex items-center justify-center"
          style={{
            borderColor: `${theme.iconBorder}35`,
            background: `${theme.iconBorder}08`,
            width: isHero ? 88 : 56,
            height: isHero ? 88 : 56,
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: theme.iconBorder,
              fontSize: isHero ? 44 : 28,
              fontVariationSettings: "'FILL' 1, 'wght' 300",
            }}
          >
            {theme.icon}
          </span>
        </div>

        {/* Project name */}
        <h3
          className={`cover-title font-headline font-black tracking-tight text-center leading-tight ${
            isHero ? "text-3xl md:text-5xl max-w-xl" : "text-sm md:text-base max-w-[200px]"
          }`}
          style={{ color: "white" }}
        >
          {title.split(":")[0]}
        </h3>

        {/* Thin accent divider */}
        <div
          className="cover-divider rounded-full"
          style={{
            background: theme.accent,
            width: isHero ? 48 : 28,
            height: 2,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Watermark */}
      <span
        className={`cover-watermark absolute font-headline tracking-wide select-none ${
          isHero
            ? "bottom-6 right-8 text-xs"
            : "bottom-3 right-4 text-[9px]"
        }`}
        style={{ color: `${theme.accent}35` }}
      >
        Powered by: <span className="font-bold">Ali Raza</span>
      </span>

      {/* Top-right tag */}
      <span
        className={`cover-tag absolute font-mono tracking-[0.15em] uppercase select-none ${
          isHero
            ? "top-6 right-8 text-[10px]"
            : "top-3 right-4 text-[8px]"
        }`}
        style={{ color: `${theme.accent}40` }}
      >
        Case Study
      </span>
    </div>
  );
}
