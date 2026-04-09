"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryTallCardProps {
  item: { src: string; caption: string; tall?: boolean };
}

export default function GalleryTallCard({ item }: GalleryTallCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-outline-variant/10 bg-surface-container">
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
          expanded ? "max-h-none" : "max-h-[600px]"
        }`}
      >
        <Image
          src={item.src}
          alt={item.caption}
          width={1280}
          height={5000}
          className="w-full h-auto"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={75}
        />
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 flex items-center justify-center gap-2 text-primary-fixed text-sm font-bold hover:bg-surface-container-high transition-colors"
      >
        <span className="material-symbols-outlined text-base">
          {expanded ? "expand_less" : "expand_more"}
        </span>
        {expanded ? "Collapse" : `View Full ${item.caption}`}
      </button>
    </div>
  );
}
