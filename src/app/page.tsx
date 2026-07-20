"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContactForm } from "@/hooks/useContactForm";
import { projects } from "@/data/projects";

const MobileView = dynamic(() => import("@/components/MobileView"), { ssr: false });
const ParticleGrid = dynamic(() => import("@/components/ParticleGrid"), { ssr: false });
const TiltCard = dynamic(() => import("@/components/TiltCard"), { ssr: false });
const GitHubActivity = dynamic(() => import("@/components/GitHubActivity"), { ssr: false });
const ProjectCover = dynamic(() => import("@/components/ProjectCover"), { ssr: false });
const ProjectGrid = dynamic(() => import("@/components/ProjectGrid"), { ssr: false });
import Navbar from "@/components/Navbar";
import {
  ReactIcon,
  VueIcon,
  NextjsIcon,
  NuxtIcon,
  NodejsIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  ExpressIcon,
  NestjsIcon,
  ThreejsIcon,
  DockerIcon,
  GitIcon,
} from "@/components/TechIcons";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const desktopRef = useRef<HTMLDivElement>(null);
  const contact = useContactForm();
  const [queryEmail, setQueryEmail] = useState("");
  const [queryStatus, setQueryStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const queryRenderTime = useRef(Date.now());

  const submitQuery = useCallback(async () => {
    if (!queryEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(queryEmail)) {
      setQueryStatus("error");
      return;
    }
    setQueryStatus("sending");
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: queryEmail, _t: queryRenderTime.current }),
      });
      if (!res.ok) { setQueryStatus("error"); return; }
      setQueryStatus("sent");
      setQueryEmail("");
    } catch {
      setQueryStatus("error");
    }
  }, [queryEmail]);

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (preloaderVisible) return;
    const el = desktopRef.current;
    if (!el) return;

    // Small delay so layout stabilises after preloader removal
    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ---- Helper: scroll-triggered fade-up for a group of elements ----
        const revealBatch = (
          selector: string,
          triggerEl: string,
          vars: gsap.TweenVars = {},
        ) => {
          const elems = gsap.utils.toArray<HTMLElement>(selector);
          if (!elems.length) return;
          const fromVars = { autoAlpha: 0, y: 50, ...vars };
          const toVars: gsap.TweenVars = { autoAlpha: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.65, ease: "power2.out", overwrite: true };
          ScrollTrigger.create({
            trigger: triggerEl,
            start: "top 82%",
            once: true,
            onEnter: () => gsap.fromTo(elems, fromVars, toVars),
          });
        };

        // --- Hero entrance timeline ---
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        heroTl
          .fromTo(".hero-badge", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 })
          .fromTo(".hero-heading > *", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 0.8 }, "-=0.3")
          .fromTo(".hero-desc", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.4")
          .fromTo(".hero-buttons > *", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5 }, "-=0.3")
          .fromTo(".hero-trust > div", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12, duration: 0.5 }, "-=0.2")
          .fromTo(".hero-image-wrap", { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, ease: "power2.out" }, "-=0.8")
          .fromTo(".hero-floating > div", { x: -40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.15, duration: 0.6 }, "-=0.5");

        // Floating badges gentle float
        gsap.utils.toArray<HTMLElement>(".hero-floating > div").forEach((badge, i) => {
          gsap.to(badge, {
            y: -6, duration: 2.2 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4,
          });
        });

        // Stat counters: fast start, slow finish
        el.querySelectorAll<HTMLElement>(".stat-counter").forEach((counter) => {
          const end = parseInt(counter.dataset.end || "0", 10);
          const suffix = counter.dataset.suffix || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration: end > 100 ? 2.2 : 1.4,
            ease: "power3.out",
            delay: 0.8,
            onUpdate: () => { counter.textContent = `${Math.round(obj.val)}${suffix}`; },
          });
        });

        // --- About section ---
        revealBatch(".about-header", "#about");
        revealBatch(".about-card", "#about", { y: 60 });

        // --- Skills section ---
        revealBatch(".skills-heading", ".skills-heading", { y: 40 });

        // Progress bars: animate width from 0
        el.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((bar) => {
          const targetW = bar.dataset.width || "0%";
          ScrollTrigger.create({
            trigger: bar.closest("section") || bar,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.fromTo(bar, { width: "0%" }, { width: targetW, duration: 1.2, ease: "power2.out" });
            },
          });
        });

        revealBatch(".skill-card", ".skill-card", { y: 40, scale: 0.95 });

        // --- Services section ---
        revealBatch(".services-header", "#services", { y: 40 });
        revealBatch(".service-card", "#services", { y: 50 });

        // --- Projects section ---
        const projHeader = el.querySelector(".projects-header");
        if (projHeader) {
          ScrollTrigger.create({
            trigger: "#projects",
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.fromTo(projHeader, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: "power2.out" });
            },
          });
        }
        revealBatch(".project-card", "#projects", { y: 60 });

        // --- GitHub Activity section ---
        revealBatch(".github-header", ".github-header", { y: 40 });
        revealBatch(".github-activity-section", ".github-activity-section", { y: 50 });

        // --- Contact section ---
        const contactL = el.querySelector(".contact-left");
        const contactR = el.querySelector(".contact-right");
        ScrollTrigger.create({
          trigger: "#contact",
          start: "top 80%",
          once: true,
          onEnter: () => {
            if (contactL) gsap.fromTo(contactL, { autoAlpha: 0, x: -50 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out" });
            if (contactR) gsap.fromTo(contactR, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.15 });
          },
        });

        // --- Footer ---
        revealBatch(".footer-content > div", ".footer-content", { y: 30 });

        // Recalculate positions after everything is rendered
        ScrollTrigger.refresh();

      }, el);

      // Store for cleanup
      (el as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    }, 100);

    return () => {
      clearTimeout(initTimer);
      const ctx = (el as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      if (ctx) ctx.revert();
    };
  }, [preloaderVisible]);

  return (
    <>
      {/* Preloader */}
      <div className={`site-preloader ${!preloaderVisible ? "loaded" : ""}`}>
        <div className="animation-preloader">
          <div className="preloader-spinner" />
          <div className="text-loading">
            {"ALI RAZA".split("").map((char, i) => (
              <span key={i} className="letters-loading font-headline">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>
          <p className="loading-text">Loading</p>
        </div>
      </div>

      {/* Mobile View (< md) */}
      <div className="md:hidden">
        <MobileView />
      </div>

      {/* Desktop View (>= md) */}
      <div className="hidden md:block" ref={desktopRef}>

      {/* Grid Lines */}
      <div className="grid-lines">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* TopNavBar */}
      <Navbar />

      <main className="pt-24 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[921px] flex items-center px-8 md:px-20 mb-20 overflow-hidden">
          <ParticleGrid />
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="z-10 order-2 md:order-1">
              <h1 className="hero-heading font-headline text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                <span className="block text-base md:text-lg font-body font-normal tracking-wide text-on-surface-variant mb-2">Hello, I&apos;m</span>
                <span className="block">Ali Raza</span>
                <span className="block text-primary-container text-neon">
                  I Build What Scales
                </span>
              </h1>
              <p className="hero-desc text-on-surface-variant text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                From idea to launch, I build fast, scalable web apps that
                convert users, cut costs, and grow revenue. 7+ years delivering
                for startups to enterprise.
              </p>
              <div className="hero-buttons flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="bg-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all flex items-center gap-2 neon-glow"
                >
                  Let&apos;s Talk About Your Project{" "}
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </a>
                <a
                  href="#projects"
                  className="bg-surface-container-low border border-outline-variant/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container-highest transition-all"
                >
                  View Portfolio
                </a>
              </div>

              {/* Trust signals + SEO keyword badges */}
              <div className="hero-trust mt-14 space-y-6">
                {/* Social proof row */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 py-2">
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs text-white font-bold ml-1">5.0</span>
                    <span className="text-xs text-on-surface-variant">on Upwork</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 py-2">
                    <span className="material-symbols-outlined text-green-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-xs text-white font-semibold">Top Rated Plus</span>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 rounded-full px-4 py-2">
                    <span className="material-symbols-outlined text-primary-fixed text-base" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                    <span className="text-xs text-white font-semibold">$1M+ Earned</span>
                  </div>
                </div>

                {/* Keyword/expertise chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  {["React / Next.js", "Node.js / NestJS", "TypeScript", "Full-Stack Apps", "SaaS Development", "API Architecture"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium tracking-wide text-on-surface-variant border border-outline-variant/15 rounded-lg px-3 py-1.5 bg-surface-container-lowest/40 hover:border-primary-fixed/40 hover:text-primary-fixed transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Availability indicator */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    Currently available for freelance projects &amp; full-time roles
                  </span>
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2 hero-image-wrap">
              <span className="hero-badge absolute -top-2 right-0 md:right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-highest/80 backdrop-blur-xl border border-primary-fixed/20 text-primary-fixed text-xs font-bold tracking-[0.15em] uppercase shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9F31D] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9F31D]"></span>
                </span>
                Open for New Projects
              </span>
              <TiltCard className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/10 blur-[80px] rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-surface-tint/20 blur-[100px] rounded-full" />
                <div className="relative z-10 w-full h-full rounded-[3rem] overflow-hidden border border-primary-container/20 glass-card p-4">
        <Image
                    src="/images/hero-profile.png"
                    alt="Ali Raza"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover object-top rounded-[2rem] grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
          priority
                    sizes="(max-width: 768px) 0px, 400px"
                    quality={75}
                  />
                </div>
              </TiltCard>

              {/* Floating stat badges */}
              <div className="hero-floating absolute -left-10 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
                {[
                  { icon: "calendar_month", end: 7, suffix: "+", label: "Years of Experience" },
                  { icon: "task_alt", end: projects.length, suffix: "", label: "Production Level Projects" },
                  { icon: "sentiment_satisfied", end: 100, suffix: "%", label: "Client Satisfaction" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl border border-outline-variant/20 px-5 py-4 shadow-2xl backdrop-blur-xl min-w-[180px]"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="material-symbols-outlined text-primary-fixed text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {stat.icon}
                      </span>
                      <span className="text-2xl font-black text-white font-headline leading-none stat-counter" data-end={stat.end} data-suffix={stat.suffix}>
                        0{stat.suffix}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Professional Impact */}
        <section className="py-24 bg-surface-container-low" id="about">
          <div className="container mx-auto px-8">
            <div className="about-header flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                  Why Clients Choose Me
                </span>
                <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  I Solve the Problems That <br />
                  Slow Your Product Down.
                </h2>
              </div>
              <p className="max-w-md text-on-surface-variant">
                Whether you&apos;re launching an MVP or scaling to millions of
                users, I bring the architecture, speed, and reliability
                your product needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: "architecture",
                  title: "Scalable Architecture",
                  desc: "Your app won't break at 10K users. I design systems that handle growth without re-builds.",
                },
                {
                  icon: "dns",
                  title: "Reliable Infrastructure",
                  desc: "Less downtime, faster load times. Cloud-native setups that keep your product online 24/7.",
                },
                {
                  icon: "groups",
                  title: "Dedicated Partnership",
                  desc: "Direct communication, weekly updates, zero surprises. I work as an extension of your team.",
                },
                {
                  icon: "bolt",
                  title: "Fast Delivery",
                  desc: "Launch weeks earlier. Agile sprints with clear milestones so you see progress, not excuses.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="about-card group p-8 rounded-3xl bg-surface-container-highest border border-transparent hover:border-primary-container/20 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined text-primary-fixed group-hover:text-on-primary-container">
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-3">
                    {card.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Grid Section */}
        <section className="py-24 px-8 overflow-hidden">
          <div className="container mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="skills-heading font-headline text-5xl font-black tracking-tighter mb-8">
                The Right Stack <br />
                <span className="text-primary-container">For Your Product.</span>
              </h2>
              <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
                I pick the best tools for your budget, timeline, and scale
                not the trendiest framework. Battle-tested across 1000+
                real-world implementations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-outline-variant/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Frontend Mastery</span>
                    <span className="text-primary-container font-black">
                      95%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="skill-bar-fill bg-primary-container h-full" data-width="95%" />
                  </div>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-outline-variant/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold">Backend Logic</span>
                    <span className="text-primary-container font-black">
                      98%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="skill-bar-fill bg-primary-container h-full" data-width="98%" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "React.js", Icon: ReactIcon, label: "Frontend" },
                { name: "Next.js", Icon: NextjsIcon, label: "Framework" },
                { name: "Vue.js", Icon: VueIcon, label: "Frontend" },
                { name: "Nuxt.js", Icon: NuxtIcon, label: "Framework" },
                { name: "Node.js", Icon: NodejsIcon, label: "Runtime" },
                { name: "TypeScript", Icon: TypeScriptIcon, label: "Language" },
                { name: "Express.js", Icon: ExpressIcon, label: "Backend" },
                { name: "Nest.js", Icon: NestjsIcon, label: "Backend" },
                { name: "JavaScript", Icon: JavaScriptIcon, label: "Language" },
                { name: "Three.js", Icon: ThreejsIcon, label: "3D / WebGL" },
                { name: "Docker", Icon: DockerIcon, label: "DevOps" },
                { name: "Git", Icon: GitIcon, label: "VCS" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card glass-card rounded-2xl border border-outline-variant/10 flex flex-col items-center justify-center gap-3 p-5 hover:border-primary-container/40 hover:bg-surface-container-highest/40 transition-all group"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-white/70 group-hover:text-primary-container transition-colors">
                    <skill.Icon className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold block mb-0.5">
                      {skill.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-on-surface-variant">
                      {skill.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-surface-container-lowest" id="services">
          <div className="container mx-auto px-8">
            <div className="services-header text-center mb-20">
              <h2 className="font-headline text-4xl md:text-5xl font-black mb-4">
                What I Can Build <br />
                <span className="text-primary-container">
                  For You.
                </span>
              </h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">
                End-to-end development services designed to ship faster and
                earn more.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "psychology",
                  title: "AI-Powered Features",
                  desc: "Chatbots, smart search, content generation: AI features that automate workflows and boost engagement.",
                },
                {
                  icon: "rocket_launch",
                  title: "MVP to Launch",
                  desc: "Get to market fast. I build your first version in weeks, then iterate based on real user data.",
                },
                {
                  icon: "database",
                  title: "Backend & APIs",
                  desc: "Rock-solid APIs and databases that handle thousands of concurrent users without breaking a sweat.",
                },
                {
                  icon: "layers",
                  title: "Full-Stack Apps",
                  desc: "Pixel-perfect frontends wired to powerful backends. One developer, complete ownership, no handoff gaps.",
                },
                {
                  icon: "shopping_cart",
                  title: "E-commerce",
                  desc: "Stores that convert. Payment gateways, inventory, analytics, everything optimised for revenue.",
                },
                {
                  icon: "speed",
                  title: "Performance Rescue",
                  desc: "Slow site killing conversions? I audit, fix Core Web Vitals, and cut load times, often within days.",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="service-card group p-10 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/5 hover:bg-surface-container-high transition-all"
                >
                  <span className="material-symbols-outlined text-4xl text-primary-fixed mb-8 block">
                    {service.icon}
                  </span>
                  <h3 className="font-headline text-2xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant mb-8">
                    {service.desc}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary-fixed font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all"
                  >
                    Explore{" "}
                    <span className="material-symbols-outlined text-sm">
                      north_east
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio/Projects Section */}
        <section className="py-24 px-8" id="projects">
          <div className="container mx-auto">
            <div className="projects-header flex items-center gap-6 mb-16">
              <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight shrink-0">
                Client-Focused{" "}
                <span className="text-primary-container">Projects</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-primary-container to-transparent w-full" />
            </div>
            <ProjectGrid />
          </div>
        </section>

        {/* GitHub Activity Section */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="container mx-auto">
            <div className="github-header text-center mb-12">
              <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                Open Source + Private Contributions &amp; Daily Commits
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight">
                I Ship Code Every Day.
              </h2>
              <p className="text-on-surface-variant text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                365-day streak and counting. When you hire me, you get a developer
                who shows up and delivers, consistently.
          </p>
        </div>
            <GitHubActivity />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-8" id="contact">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* Left  - Info */}
              <div className="contact-left">
                <span className="text-on-surface-variant text-sm mb-4 block">
                  Start a Conversation
                </span>
                <h2 className="font-headline text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                  Ready to Ship?
                  <br />
                  <span className="text-primary-container italic">
                    Let&apos;s Get Started.
                  </span>
                </h2>
                <p className="text-on-surface-variant max-w-md mb-10 leading-relaxed">
                  Tell me about your project and I&apos;ll get back within 24
                  hours with a free estimate.
                </p>
                <div className="space-y-5">
                  {[
                    "Free project consultation",
                    "Transparent fixed-price or hourly",
                    "Dedicated communication channel",
                    "Post-launch support included",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-primary-container text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="text-on-surface text-sm font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right  - Form */}
              <div className="contact-right">
                {contact.status === "success" ? (
                  <div className="glass-card rounded-2xl border border-primary-container/20 p-12 text-center">
                    <span className="material-symbols-outlined text-primary-container text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <h3 className="font-headline text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-on-surface-variant mb-6">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={contact.reset}
                      className="text-primary-fixed font-bold text-sm underline underline-offset-4 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                <form
                  className="space-y-6"
                  onSubmit={(e) => { e.preventDefault(); contact.submit(); }}
                >
                  <input
                    type="text"
                    name="company_url"
                    value={contact.honeypot}
                    onChange={(e) => contact.setHoneypot(e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none"
                    style={{ position: "absolute", left: "-9999px" }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">
                        Full Name <span className="text-primary-container">*</span>
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-outline-variant/30 border rounded-xl px-6 py-4 focus:border-primary-fixed focus:ring-0 transition-all text-white outline-none"
                        placeholder="e.g. John Doe"
                        type="text"
                        value={contact.form.name}
                        onChange={(e) => contact.update("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">
                        Email Address <span className="text-primary-container">*</span>
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-outline-variant/30 border rounded-xl px-6 py-4 focus:border-primary-fixed focus:ring-0 transition-all text-white outline-none"
                        placeholder="you@company.com"
                        type="email"
                        value={contact.form.email}
                        onChange={(e) => contact.update("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">
                        Phone Number
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-outline-variant/30 border rounded-xl px-6 py-4 focus:border-primary-fixed focus:ring-0 transition-all text-white outline-none"
                        placeholder="e.g. +92 333 4039462"
                        type="tel"
                        value={contact.form.phone}
                        onChange={(e) => contact.update("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface">
                        Subject <span className="text-primary-container">*</span>
                      </label>
                      <input
                        className="w-full bg-surface-container-high border-outline-variant/30 border rounded-xl px-6 py-4 focus:border-primary-fixed focus:ring-0 transition-all text-white outline-none"
                        placeholder="I'd like to discuss a project"
                        type="text"
                        value={contact.form.subject}
                        onChange={(e) => contact.update("subject", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface">
                      Message <span className="text-primary-container">*</span>
                    </label>
                    <textarea
                      className="w-full bg-surface-container-high border-outline-variant/30 border rounded-xl px-6 py-4 focus:border-primary-fixed focus:ring-0 transition-all text-white outline-none resize-none"
                      placeholder="Tell me about your project, timeline, and budget..."
                      rows={5}
                      value={contact.form.message}
                      onChange={(e) => contact.update("message", e.target.value)}
                      required
                    />
                  </div>

                  {contact.status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <span className="material-symbols-outlined text-base">error</span>
                      {contact.errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contact.status === "sending"}
                    className="bg-primary-container text-on-primary-container px-8 py-4 rounded-full font-bold text-base hover:scale-[1.02] transition-all flex items-center gap-2 neon-glow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {contact.status === "sending" ? (
                      <>
                        Sending...
                        <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                      </>
                    ) : (
                      <>
                        Let&apos;s Talk!{" "}
                        <span className="material-symbols-outlined text-lg">chevron_right</span>
                      </>
                    )}
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] w-full pt-16 pb-0">
        <div className="container mx-auto px-8">
          {/* Top row  - 3 columns */}
          <div className="footer-content grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
            {/* Col 1  - Name + Email subscribe */}
            <div>
              <h3 className="text-2xl font-black text-white font-headline mb-8">
                Ali Raza
              </h3>
              <form
                className="flex items-center gap-0"
                onSubmit={(e) => { e.preventDefault(); submitQuery(); }}
              >
                <div className="flex items-center gap-3 bg-transparent border border-outline-variant/30 rounded-l-xl px-4 py-3 flex-1">
                  <span
                    className="material-symbols-outlined text-on-surface-variant text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent text-white text-sm outline-none w-full placeholder:text-on-surface-variant"
                    value={queryEmail}
                    onChange={(e) => { setQueryEmail(e.target.value); setQueryStatus("idle"); }}
                    disabled={queryStatus === "sending" || queryStatus === "sent"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={queryStatus === "sending" || queryStatus === "sent"}
                  className="bg-primary-container text-on-primary-container px-5 py-3 rounded-r-xl font-bold text-sm whitespace-nowrap hover:bg-surface-tint transition-all cursor-pointer flex items-center gap-1 disabled:opacity-60"
                >
                  {queryStatus === "sending" ? "Sending..." :
                   queryStatus === "sent" ? (
                    <><span className="material-symbols-outlined text-base">check</span> Sent</>
                   ) : (
                    <>For Query <span className="material-symbols-outlined text-base">chevron_right</span></>
                   )}
                </button>
              </form>
              {queryStatus === "error" && (
                <p className="text-red-400 text-xs mt-2">Please enter a valid email address.</p>
              )}
            </div>

            {/* Col 2  - Quick Links */}
            <div>
              <h4 className="text-base font-bold text-white mb-6">
                Quick Link
              </h4>
              <div className="flex gap-8 text-sm text-on-surface-variant">
                <a
                  href="#services"
                  className="hover:text-white transition-colors"
                >
                  Service
                </a>
                <a
                  href="#projects"
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Col 3  - Address */}
            <div>
              <h4 className="text-base font-bold text-white mb-6">Address</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary-container text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    home
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    Lahore, Punjab Pakistan
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary-container text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    mail
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    contact@aliraza.tech
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary-container text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    call
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    +92 (333) 4039462
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-outline-variant/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-on-surface-variant">
              Copyright @2026, All Rights Reserved
            </div>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant font-medium">
              <a
                href="https://www.upwork.com/freelancers/~01b8e90b25b218f09a"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Upwork
              </a>
              <a
                href="https://www.fiverr.com/aliraza019"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Fiverr
              </a>
              <a
                href="https://github.com/aliraza019-js"
            target="_blank"
            rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Github
          </a>
          <a
                href="https://www.linkedin.com/in/aliraza175/"
            target="_blank"
            rel="noopener noreferrer"
                className="hover:text-white transition-colors"
          >
                Linkedin
          </a>
            </div>
          </div>
        </div>
      </footer>

      </div>{/* end desktop wrapper */}
    </>
  );
}
