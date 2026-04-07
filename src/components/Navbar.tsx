"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".site-nav",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const navLinks = isHome
    ? [
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Contact", href: "/#contact" },
      ];

  const isActive = (href: string) => {
    if (href === "/projects") return pathname.startsWith("/projects");
    if (href === "/" && isHome) return false;
    return false;
  };

  return (
    <>
      <nav
        className={`site-nav fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${
          scrolled
            ? "bg-[#0e0e0e]/90 backdrop-blur-xl shadow-lg"
            : "bg-transparent backdrop-blur-sm"
        } ${className}`}
      >
        {/* Logo mark */}
        {/* <Link href="/" className="flex items-center gap-2.5 group"> */}
          <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-95 transition-transform">
            {/* <span className="text-black font-black text-sm font-headline leading-none">
              AR
            </span> */}
          </div>
        {/* </Link> */}

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-md rounded-full px-2 py-1.5 border border-white/[0.06]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                isActive(link.href)
                  ? "bg-[#C9F31D] text-black"
                  : "text-white/60 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="bg-[#C9F31D] text-black px-5 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-[#d4f73e] transition-all duration-200 hidden sm:flex items-center gap-1.5"
          >
            Let&apos;s Talk
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              arrow_forward
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-xl pt-20 px-8 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-2xl font-headline font-bold tracking-tight py-2 border-b border-white/5 ${
                  isActive(link.href) ? "text-[#C9F31D]" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-[#C9F31D] text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider text-center"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
