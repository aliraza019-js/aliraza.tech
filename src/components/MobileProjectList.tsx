"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ProjectCover = dynamic(() => import("@/components/ProjectCover"), {
  ssr: false,
});

const ALL_PROJECTS = [
  { slug: "custom-enterprise-crm", category: "SaaS / ESG", title: "Ethos ESG Platform" },
  { slug: "self-hosted-gateway", category: "Fintech", title: "Self-Hosted Payment Gateway" },
  { slug: "sparkdoc-ai", category: "AI/ML", title: "SparkDoc AI" },
  { slug: "3d-generative-nft-builder", category: "Web3", title: "3D NFT Builder" },
  { slug: "ducorr", category: "Corporate", title: "Ducorr" },
  { slug: "autogather", category: "AI / SaaS", title: "AutoGather" },
  { slug: "forborga", category: "Fintech", title: "Forborga" },
  { slug: "managed-hosting-dashboard", category: "SaaS / Cloud", title: "Hosting Management" },
  { slug: "crypto-wallet", category: "Web3 / Fintech", title: "CryptoVault Dashboard" },
  { slug: "nft-marketplace", category: "Web3 / Marketplace", title: "NFT Nexus Marketplace" },
  { slug: "campaign-builder", category: "SaaS / AI", title: "ScribeAI Campaign Manager" },
  { slug: "aladdin-catering", category: "E-commerce / Vue.js", title: "Aladdin Mediterranean" },
];

const PAGE_SIZE = 4;

export default function MobileProjectList() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const listRef = useRef<HTMLDivElement>(null);
  const hasMore = visibleCount < ALL_PROJECTS.length;
  const visibleProjects = ALL_PROJECTS.slice(0, visibleCount);

  const animateNewCards = useCallback((startIdx: number) => {
    if (!listRef.current) return;
    const cards = listRef.current.querySelectorAll(".m-project-card");
    const newCards = Array.from(cards).slice(startIdx);
    if (!newCards.length) return;

    gsap.fromTo(
      newCards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }
    );
  }, []);

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
      <div ref={listRef} className="space-y-8">
        {visibleProjects.map((project) => (
          <div key={project.slug} className="m-project-card group">
            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video">
              <ProjectCover slug={project.slug} title={project.title} />
            </div>
            <p className="text-primary-fixed text-xs font-bold uppercase tracking-widest mb-1">
              {project.category}
            </p>
            <h4 className="font-headline font-bold text-xl mb-3">
              {project.title}
            </h4>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 text-on-surface text-sm font-bold border-b border-primary-fixed pb-1"
            >
              View Project{" "}
              <span className="material-symbols-outlined text-sm">north_east</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 mt-10">
        {hasMore && (
          <button
            onClick={loadMore}
            className="w-full py-3 rounded-xl border border-outline-variant/20 text-on-surface font-bold text-sm active:bg-surface-container-high transition-all"
          >
            Load More Projects
          </button>
        )}
        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary-container text-on-primary-container font-bold text-sm transition-all"
        >
          View All Projects
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>
    </>
  );
}
