"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About",     href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "C.V.",      href: "#cv" },
  { name: "Quotes",    href: "#quotes" },
  { name: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]         = useState(false);
  const [activeSection, setActive]  = useState<string | null>(null);
  const navRef      = useRef<HTMLElement>(null);
  const pillRef     = useRef<HTMLDivElement>(null);
  const linkRefs    = useRef<(HTMLAnchorElement | null)[]>([]);
  const prevIdx     = useRef<number>(-1);

  // ── entrance animation ──────────────────────────────────────────────────
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80, opacity: 0, duration: 1, ease: "expo.out",
    });
  }, []);

  // ── move the pill to the active link ────────────────────────────────────
  const movePill = useCallback((idx: number) => {
    const pill   = pillRef.current;
    const anchor = linkRefs.current[idx];
    if (!pill || !anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const navRect    = anchor.offsetParent
      ? (anchor.offsetParent as HTMLElement).getBoundingClientRect()
      : anchorRect;

    const targetLeft  = anchorRect.left - navRect.left;
    const targetWidth = anchorRect.width;

    // first appearance — no animation, just place it
    if (prevIdx.current === -1) {
      gsap.set(pill, { left: targetLeft, width: targetWidth, opacity: 1 });
    } else {
      gsap.to(pill, {
        left: targetLeft,
        width: targetWidth,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
    }
    prevIdx.current = idx;
  }, []);

  const hidePill = useCallback(() => {
    gsap.to(pillRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
    prevIdx.current = -1;
  }, []);

  // ── IntersectionObserver — track which section is in view ───────────────
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    const observers: IntersectionObserver[] = [];
    // ratio per section — used to pick the "most visible" one
    const ratios: Record<string, number> = {};

    const pickActive = () => {
      let best = "";
      let bestRatio = 0;
      for (const id of sectionIds) {
        if ((ratios[id] ?? 0) > bestRatio) {
          bestRatio = ratios[id];
          best = id;
        }
      }
      setActive(bestRatio > 0 ? best : null);
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          pickActive();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── react to activeSection change ────────────────────────────────────────
  useEffect(() => {
    if (!activeSection) { hidePill(); return; }
    const idx = navLinks.findIndex((l) => l.href === `#${activeSection}`);
    if (idx === -1) { hidePill(); return; }
    movePill(idx);
  }, [activeSection, movePill, hidePill]);

  // ── click handler ────────────────────────────────────────────────────────
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/60 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="group text-xl font-black tracking-tight text-white flex items-center gap-1.5"
        >
          <span>Dharma</span>
          <span className="text-emerald-400 group-hover:rotate-12 transition-transform duration-300 inline-block">.</span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-1 relative">
          {/* sliding pill — sits behind the text */}
          <div
            ref={pillRef}
            className="absolute top-0 h-full rounded-lg bg-emerald-500/10 border border-emerald-500/25 opacity-0 pointer-events-none"
            style={{ left: 0, width: 0 }}
          />

          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              ref={(el) => { linkRefs.current[idx] = el; }}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? "text-emerald-300"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-800 flex flex-col p-6 shadow-2xl gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`py-3 px-4 text-base font-semibold rounded-xl transition-colors ${
                activeSection === link.href.slice(1)
                  ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/25"
                  : "text-zinc-200 hover:bg-emerald-500/10 hover:text-emerald-300"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
