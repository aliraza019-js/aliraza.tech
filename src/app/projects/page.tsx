"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import ProjectCover from "@/components/ProjectCover";

gsap.registerPlugin(ScrollTrigger);

const ALL_TAGS = [
  "All",
  "SaaS",
  "Fintech",
  "AI/ML",
  "Web3",
  "Corporate",
  "Cloud",
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter(
            (p) =>
              p.cardTags.some((t) =>
                t.toLowerCase().includes(activeFilter.toLowerCase())
              ) ||
              p.tags.some((t) =>
                t.toLowerCase().includes(activeFilter.toLowerCase())
              )
          ),
    [activeFilter]
  );

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".projects-hero-badge", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 })
        .fromTo(".projects-hero-title", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.3")
        .fromTo(".projects-hero-desc", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.3")
        .fromTo(".projects-hero-stats > div", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.1 }, "-=0.2")
        .fromTo(".filter-bar", { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.2");
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const cards = el.querySelectorAll(".project-list-card");
    gsap.fromTo(
      cards,
      { y: 40, autoAlpha: 0, scale: 0.97 },
      {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );
  }, [filtered]);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 px-8 md:px-20 overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,243,29,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,243,29,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />

        <div className="container mx-auto relative z-10">
          <span className="projects-hero-badge inline-block text-[#C9F31D] font-bold tracking-[0.25em] uppercase text-xs mb-4">
            Portfolio
          </span>
          <h1 className="projects-hero-title font-headline text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6 max-w-3xl">
            Projects I&apos;ve
            <br />
            <span className="text-[#C9F31D]">Shipped.</span>
          </h1>
          <p className="projects-hero-desc text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            From fintech platforms to AI-powered SaaS, every project is built
            for scale, speed, and real business impact.
          </p>

          {/* Quick stats */}
          <div className="projects-hero-stats flex flex-wrap gap-6 mb-12">
            {[
              { value: `${projects.length}+`, label: "Projects" },
              { value: "7+", label: "Years" },
              { value: "100%", label: "Delivered" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl px-5 py-3"
              >
                <span className="text-2xl font-black text-[#C9F31D] font-headline">
                  {s.value}
                </span>
                <span className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="filter-bar flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeFilter === tag
                    ? "bg-[#C9F31D] text-black border-[#C9F31D]"
                    : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-8 md:px-20 pb-32">
        <div className="container mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="project-list-card group block"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-surface-container-low hover:border-[#C9F31D]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(201,243,29,0.1)]">
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ProjectCover slug={project.slug} title={project.title} />
                    <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                      {project.cardTags.map((tag, j) => (
                        <span
                          key={j}
                          className={
                            j === 0
                              ? "px-3 py-1 rounded-full bg-[#C9F31D] text-black text-[10px] font-black uppercase"
                              : "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase"
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-[#C9F31D] transition-colors">
                      {project.subtitle}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-5 line-clamp-2">
                      {project.cardDesc}
                    </p>

                    {/* Tech pills */}
                    {project.techStack && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-medium text-white/40 border border-white/8 rounded-md px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="text-[10px] font-medium text-white/30 px-1">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[#C9F31D] text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                      View Case Study
                      <span className="material-symbols-outlined text-sm">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-5xl text-white/20 mb-4 block">
                search_off
              </span>
              <p className="text-on-surface-variant text-lg">
                No projects match this filter.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-[#C9F31D] font-bold text-sm uppercase tracking-wider hover:underline cursor-pointer"
              >
                Show all projects
              </button>
            </div>
          )}

          {/* Results count */}
          {filtered.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-white/20 text-sm font-mono">
                Showing {filtered.length} of {projects.length} projects
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-8 md:px-20 pb-20">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#0e0e0e] via-[#141414] to-[#0e0e0e] p-12 md:p-16 text-center">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,243,29,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,243,29,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            <div className="relative z-10">
              <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tighter mb-4">
                Have a project in mind?
              </h2>
              <p className="text-on-surface-variant text-lg mb-8 max-w-xl mx-auto">
                I build fast, scalable web apps that convert users and grow
                revenue. Let&apos;s talk about yours.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#C9F31D] text-black px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-[#d4f73e] transition-all"
              >
                Start a Conversation
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
