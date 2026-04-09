"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ProjectCover = dynamic(() => import("@/components/ProjectCover"), {
  ssr: false,
});

const ALL_PROJECTS = [
  {
    slug: "custom-enterprise-crm",
    title: "Ethos ESG Platform",
    desc: "Enterprise ESG compliance platform with environmental reporting, dynamic forms, and shared packages for multi-company governance.",
    tags: ["SaaS", "React"],
  },
  {
    slug: "self-hosted-gateway",
    title: "Self-Hosted Payment Gateway",
    desc: "Removing friction between merchants and customers while encrypting transactional data for a risk-free payment experience.",
    tags: ["Fintech", "Vue.js"],
  },
  {
    slug: "sparkdoc-ai",
    title: "SparkDoc AI",
    desc: "AI-powered collaborative editor with summarization, knowledge extraction, and real-time document insights.",
    tags: ["AI/ML", "Next.js"],
  },
  {
    slug: "3d-generative-nft-builder",
    title: "3D NFT Builder",
    desc: "Design and personalize your 3D avatar with unique assets, accessories, and outfits in a seamless NFT marketplace.",
    tags: ["Web3", "Three.js"],
  },
  {
    slug: "ducorr",
    title: "Ducorr",
    desc: "Digital platform for UAE & KSA's leading cathodic protection specialists with product catalog, project showcase, and e-commerce.",
    tags: ["Corporate", "Next.js"],
  },
  {
    slug: "autogather",
    title: "AutoGather",
    desc: "AI-powered platform that helps marketers search, evaluate, and collect influencers across Instagram, YouTube, and TikTok.",
    tags: ["AI/ML", "SaaS"],
  },
  {
    slug: "forborga",
    title: "Forborga",
    desc: "Virtual card platform with spend limits, subscription management, and secure crypto transactions via QB.se.",
    tags: ["Fintech", "Vue.js"],
  },
  {
    slug: "managed-hosting-dashboard",
    title: "Hosting Management",
    desc: "Fully managed WordPress hosting platform serving 17,000+ clients with real-time monitoring and 24/7 expert support.",
    tags: ["SaaS", "Cloud"],
  },
  {
    slug: "crypto-wallet",
    title: "CryptoVault Dashboard",
    desc: "Web3 crypto management dashboard for sending, receiving, portfolio tracking, and DApp access in one interface.",
    tags: ["Web3", "Fintech"],
  },
  {
    slug: "nft-marketplace",
    title: "NFT Nexus Marketplace",
    desc: "Futuristic NFT marketplace for trading digital art, gaming assets, music, and collectibles with ERC-721 integration.",
    tags: ["Web3", "Marketplace"],
  },
  {
    slug: "campaign-builder",
    title: "ScribeAI Campaign Manager",
    desc: "AI-powered campaign management platform with 3-module system and 6-step workflow for data-driven marketing at scale.",
    tags: ["SaaS", "AI/ML"],
  },
  {
    slug: "aladdin-catering",
    title: "Aladdin Mediterranean",
    desc: "Full-stack restaurant website and catering ordering system for Houston's beloved halal Mediterranean restaurant since 2006.",
    tags: ["E-commerce", "Vue.js"],
  },
];

const PAGE_SIZE = 6;

export default function ProjectGrid() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < ALL_PROJECTS.length;
  const visibleProjects = ALL_PROJECTS.slice(0, visibleCount);

  const animateNewCards = useCallback(
    (startIdx: number) => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll(".project-card");
      const newCards = Array.from(cards).slice(startIdx);
      if (!newCards.length) return;

      gsap.fromTo(
        newCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    },
    []
  );

  useEffect(() => {
    if (visibleCount > PAGE_SIZE) {
      animateNewCards(visibleCount - PAGE_SIZE);
    }
  }, [visibleCount, animateNewCards]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, ALL_PROJECTS.length));
  };

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {visibleProjects.map((project) => (
          <div
            key={project.slug}
            className="project-card group relative bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10"
          >
            <div className="relative aspect-video overflow-hidden">
              <ProjectCover slug={project.slug} title={project.title} />
              <div className="absolute bottom-6 left-6 flex gap-2 z-10">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className={
                      j === 0
                        ? "px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-black uppercase"
                        : "px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase"
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-headline font-bold text-xl mb-3">
                {project.title}
              </h3>
              <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                {project.desc}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="block w-full py-3 rounded-xl border border-primary-container/20 text-primary-fixed font-bold hover:bg-primary-container hover:text-on-primary-container transition-all text-center"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-14">
        {hasMore && (
          <button
            onClick={loadMore}
            className="px-8 py-3.5 rounded-xl border border-outline-variant/20 text-on-surface font-bold hover:bg-surface-container-high transition-all"
          >
            Load More Projects
          </button>
        )}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-bold hover:opacity-90 transition-all"
        >
          View All Projects
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </Link>
      </div>
    </>
  );
}
