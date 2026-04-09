"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useContactForm } from "@/hooks/useContactForm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GitHubActivity = dynamic(() => import("@/components/GitHubActivity"), { ssr: false });
import ProjectCover from "@/components/ProjectCover";
import MobileProjectList from "@/components/MobileProjectList";
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

export default function MobileView() {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const contact = useContactForm();

  /**
   * Mobile View
   * @description Mobile View is a component that is used to display the mobile view of the website.
   * @returns {React.ReactNode} Mobile View component
   * @example
   * <MobileView />
   * @example
   */

  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    const initTimer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hero entrance
        gsap.fromTo(".m-hero-img", { scale: 0.85, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.8, ease: "power2.out" });
        gsap.fromTo(".m-hero-text > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.2 });

        // Section fade-ups on scroll
        gsap.utils.toArray<HTMLElement>(".m-section").forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.fromTo(section, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
            },
          });
        });

        // Card staggers
        const mCards = gsap.utils.toArray<HTMLElement>(".m-card");
        if (mCards.length) {
          ScrollTrigger.create({
            trigger: "#m-about",
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(mCards, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.5 });
            },
          });
        }

        const mSkills = gsap.utils.toArray<HTMLElement>(".m-skill-card");
        if (mSkills.length) {
          ScrollTrigger.create({
            trigger: mSkills[0].closest("section") || mSkills[0],
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.fromTo(mSkills, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.4 });
            },
          });
        }

        ScrollTrigger.refresh();
      }, el);

      (el as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx = ctx;
    }, 2200); // After preloader finishes

    return () => {
      clearTimeout(initTimer);
      const ctx = (el as HTMLElement & { _gsapCtx?: gsap.Context })._gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen" ref={mobileRef}>
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md shadow-[0_0_15px_rgba(201,243,28,0.1)]">
        <div className="flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-2">
            {/* <span className="material-symbols-outlined text-[#C9F31D]">
              terminal
            </span> */}
            <h1 className="text-xl font-black tracking-tighter text-[#C9F31D] font-headline">
              Ali Raza
            </h1>
          </div>
          <button
            className="text-white/70 active:scale-95 transition-transform"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
        <div className="bg-gradient-to-r from-[#C9F31D] to-transparent h-px absolute bottom-0 w-full" />
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl pt-20 px-6">
          <div className="flex flex-col gap-6 font-headline text-lg font-bold uppercase">
            <a
              className="text-[#C9F31D]"
              href="#"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              className="text-white/70"
              href="#m-about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              className="text-white/70"
              href="#m-services"
              onClick={() => setMenuOpen(false)}
            >
              Services
            </a>
            <a
              className="text-white/70"
              href="#m-projects"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </a>
            <a
              className="text-white/70"
              href="#m-contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}

      <main className="flex-grow pt-20 pb-24">
        {/* Hero Section */}
        <section className="px-6 py-10 flex flex-col items-center text-center">
          <div className="m-hero-img relative mb-8">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-primary-fixed p-1 shadow-[0_0_30px_rgba(201,243,28,0.2)]">
              <Image
                src="/images/hero-profile.png"
                alt="Ali Raza - I Build What Scales"
                width={192}
                height={192}
                className="w-full h-full object-cover object-top rounded-full"
                priority
                sizes="192px"
                quality={75}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-kinetic-gradient p-2 rounded-xl shadow-lg">
              <span
                className="material-symbols-outlined text-on-primary-container font-bold"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>
          <div className="m-hero-text">
          <p className="uppercase tracking-[0.2em] text-primary-fixed mb-2 font-headline font-bold text-xs">
            Open for New Projects
          </p>
          <p className="text-sm font-body text-on-surface-variant mb-1">Hello, I&apos;m</p>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-6">
            Ali Raza{" "}
            <span className="text-primary-fixed-dim">I Build What Scales</span>
          </h2>
          <div className="flex flex-col gap-4 w-full mb-8">
            <div className="glass-card rounded-xl p-4 flex items-center justify-between">
              <div className="text-left">
                <p className="text-2xl font-black text-primary-fixed font-headline">
                  7+ YRS
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/50">
                  Experience
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-primary-fixed font-headline">
                  523+
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/50">
                  Delivered
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary-fixed font-headline">
                  100%
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/50">
                  On-Time
                </p>
              </div>
            </div>
          </div>
          <a
            href="#m-contact"
            className="bg-kinetic-gradient text-on-primary-container font-bold py-4 px-10 rounded-xl w-full text-lg shadow-[0_0_20px_rgba(201,243,28,0.3)] active:scale-95 transition-transform text-center block"
          >
            Let&apos;s Talk About Your Project
          </a>
          {/* Trust signals */}
          <div className="mt-8 flex flex-col items-center gap-3 w-full">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 rounded-full px-3 py-1.5">
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-[10px] text-white font-bold ml-1">5.0 on Upwork</span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/20 rounded-full px-3 py-1.5">
                <span className="material-symbols-outlined text-green-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-[10px] text-white font-semibold">Top Rated Plus</span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {["React / Next.js", "Node.js / NestJS", "TypeScript", "Full-Stack"].map((tag) => (
                <span key={tag} className="text-[10px] font-medium text-on-surface-variant border border-outline-variant/15 rounded-md px-2 py-1 bg-surface-container-lowest/40">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] text-on-surface-variant">Available for freelance &amp; full-time roles</span>
            </div>
          </div>
          </div>{/* end m-hero-text */}
        </section>

        <div className="kinetic-divider my-8" />

        {/* Professional Solutions */}
        <section className="m-section px-6 py-10" id="m-about">
          <h3 className="font-headline text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-8 h-1 bg-primary-fixed rounded-full" />
            Professional Solutions
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: "architecture",
                title: "Scalable Architecture",
                desc: "Your app won't break at 10K users. I design systems that handle growth without re-builds.",
              },
              {
                icon: "settings_input_component",
                title: "Reliable Infrastructure",
                desc: "Less downtime, faster load times. Cloud-native setups that keep your product online 24/7.",
              },
              {
                icon: "groups",
                title: "Dedicated Partnership",
                desc: "Direct communication, weekly updates, zero surprises. I work as an extension of your team.",
              },
              {
                icon: "speed",
                title: "Fast Delivery",
                desc: "Launch weeks earlier. Agile sprints with clear milestones so you see progress, not excuses.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="m-card bg-surface-container-low rounded-xl p-6 relative overflow-hidden group"
              >
                <span className="material-symbols-outlined text-primary-fixed text-4xl mb-4">
                  {card.icon}
                </span>
                <h4 className="font-headline font-bold text-lg mb-2">
                  {card.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {card.desc}
                </p>
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="material-symbols-outlined text-[80px]">
                    {card.icon}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modern Stack */}
        <section className="m-section px-6 py-10 bg-surface-container-lowest">
          <h3 className="font-headline text-2xl font-bold mb-8 text-center">
            Modern Stack
          </h3>
          <div className="grid grid-cols-3 gap-4">
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
              { name: "Three.js", Icon: ThreejsIcon, label: "3D" },
              { name: "Docker", Icon: DockerIcon, label: "DevOps" },
              { name: "Git", Icon: GitIcon, label: "VCS" },
            ].map((skill) => (
              <div
                key={skill.name}
                className="m-skill-card glass-card rounded-xl border border-outline-variant/10 flex flex-col items-center justify-center gap-2 p-4"
              >
                <div className="w-8 h-8 flex items-center justify-center text-white/70">
                  <skill.Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-center leading-tight">
                  {skill.name}
                </span>
                <span className="text-[8px] uppercase tracking-widest text-white/40">
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What I Can Build */}
        <section className="m-section px-6 py-10 bg-surface-container-lowest">
          <h3 className="font-headline text-2xl font-bold mb-2 text-center">
            What I Can Build <span className="text-primary-fixed">For You.</span>
          </h3>
          <p className="text-white/50 text-sm text-center mb-8">End-to-end development services designed to ship faster and earn more.</p>
          <div className="space-y-4">
            {[
              { icon: "psychology", title: "AI-Powered Features", desc: "Chatbots, smart search, content generation: AI features that automate workflows and boost engagement." },
              { icon: "rocket_launch", title: "MVP to Launch", desc: "Get to market fast. I build your first version in weeks, then iterate based on real user data." },
              { icon: "database", title: "Backend & APIs", desc: "Rock-solid APIs and databases that handle thousands of concurrent users without breaking a sweat." },
              { icon: "layers", title: "Full-Stack Apps", desc: "Pixel-perfect frontends wired to powerful backends. One developer, complete ownership." },
              { icon: "shopping_cart", title: "E-commerce", desc: "Stores that convert. Payment gateways, inventory, analytics, everything optimised for revenue." },
              { icon: "speed", title: "Performance Rescue", desc: "Slow site killing conversions? I audit, fix Core Web Vitals, and cut load times." },
            ].map((svc) => (
              <div key={svc.title} className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary-fixed text-xl">{svc.icon}</span>
                  <h4 className="font-bold text-sm">{svc.title}</h4>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="m-section px-6 py-10 bg-surface-container-low" id="m-projects">
          <h3 className="font-headline text-2xl font-bold mb-8">
            Selected Projects
          </h3>
          <MobileProjectList />
        </section>

        {/* GitHub Activity */}
        <section className="m-section px-6 py-10 bg-surface-container-low">
          <div className="text-center mb-6">
            <span className="text-primary-fixed font-bold tracking-[0.2em] uppercase text-[10px] block mb-1">
              Open Source + Private &amp; Daily Commits
            </span>
            <h3 className="font-headline text-2xl font-extrabold tracking-tight">
              I Ship Code Every Day.
            </h3>
          </div>
          <GitHubActivity compact />
        </section>

        {/* Contact Form */}
        <section className="m-section px-6 py-12" id="m-contact">
          <div className="bg-surface-container rounded-3xl p-8 border border-white/5 shadow-2xl">
            <h3 className="font-headline text-3xl font-extrabold mb-2">
              Ready to Ship? Let&apos;s Get Started.
            </h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              Tell me about your project and I&apos;ll get back within 24 hours
              with a free estimate.
            </p>
            {contact.status === "success" ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-primary-fixed text-5xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <h4 className="font-headline text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-white/50 text-sm mb-6">I&apos;ll get back to you within 24 hours.</p>
                <button onClick={contact.reset} className="text-primary-fixed font-bold text-sm underline underline-offset-4 cursor-pointer">
                  Send another message
                </button>
              </div>
            ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); contact.submit(); }}>
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
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Full Name *
                </label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed text-on-surface placeholder-white/20 outline-none transition-all"
                  placeholder="John Doe"
                  type="text"
                  value={contact.form.name}
                  onChange={(e) => contact.update("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Email Address *
                </label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed text-on-surface placeholder-white/20 outline-none transition-all"
                  placeholder="you@company.com"
                  type="email"
                  value={contact.form.email}
                  onChange={(e) => contact.update("email", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Subject *
                </label>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed text-on-surface placeholder-white/20 outline-none transition-all"
                  placeholder="I'd like to discuss a project"
                  type="text"
                  value={contact.form.subject}
                  onChange={(e) => contact.update("subject", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 ml-1">
                  Project Brief *
                </label>
                <textarea
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-4 focus:ring-1 focus:ring-primary-fixed focus:border-primary-fixed text-on-surface placeholder-white/20 outline-none transition-all resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                  rows={4}
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
                className="w-full bg-kinetic-gradient text-on-primary-container font-bold py-4 rounded-xl shadow-lg mt-4 active:scale-95 transition-transform cursor-pointer disabled:opacity-60"
                type="submit"
                disabled={contact.status === "sending"}
              >
                {contact.status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full pt-10 pb-8 bg-[#0E0E0E] border-t border-white/5">
          <div className="px-6 space-y-8">
            {/* Name */}
            <h4 className="text-[#C9F31D] font-bold text-xl font-headline tracking-tighter">
              Ali Raza
            </h4>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                <span className="text-sm text-white/50">Lahore, Punjab Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                <a href="mailto:contact@meetaliraza.com" className="text-sm text-white/50 hover:text-white transition-colors">contact@meetaliraza.com</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary-container text-base" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                <a href="tel:+923334039462" className="text-sm text-white/50 hover:text-white transition-colors">+92 (333) 4039462</a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#m-about" className="text-white/50 hover:text-white transition-colors">About</a>
              <a href="#m-services" className="text-white/50 hover:text-white transition-colors">Services</a>
              <a href="#m-projects" className="text-white/50 hover:text-white transition-colors">Projects</a>
              <a href="#m-contact" className="text-white/50 hover:text-white transition-colors">Contact</a>
            </div>

            {/* Platform + Social Links */}
            <div className="flex flex-wrap gap-4 text-xs font-medium">
              <a href="https://www.upwork.com/freelancers/~01b8e90b25b218f09a" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9F31D] transition-colors tracking-[0.1em] uppercase">Upwork</a>
              <a href="https://www.fiverr.com/aliraza019" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9F31D] transition-colors tracking-[0.1em] uppercase">Fiverr</a>
              <a href="https://github.com/aliraza019-js" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9F31D] transition-colors tracking-[0.1em] uppercase">Github</a>
              <a href="https://www.linkedin.com/in/aliraza175/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#C9F31D] transition-colors tracking-[0.1em] uppercase">LinkedIn</a>
            </div>

            {/* Copyright */}
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-white/30">Copyright @2026, All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
