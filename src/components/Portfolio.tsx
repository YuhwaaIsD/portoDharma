"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { portfolioItems, PortfolioCategory } from "../data/portfolioData";
import { ArrowUpRight, FolderGit2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories: ("All" | PortfolioCategory)[] = [
  "All",
  "Projects",
  "Organizations",
  "Experiences",
  "Achievements",
];

export default function Portfolio() {
  // activeTab  → controls which cards are shown (click only)
  // activeVisual → controls pill + text color (click + scroll)
  const [activeTab, setActiveTab]       = useState<"All" | PortfolioCategory>("All");
  const [activeVisual, setActiveVisual] = useState<"All" | PortfolioCategory>("All");

  const sectionRef       = useRef<HTMLElement>(null);
  const trackRef         = useRef<HTMLDivElement>(null);
  const tabsRef          = useRef<HTMLDivElement>(null);
  const pillRef          = useRef<HTMLDivElement>(null);
  const btnRefs          = useRef<(HTMLButtonElement | null)[]>([]);

  // refs so GSAP callbacks read current values without stale closures
  const activeTabRef     = useRef<"All" | PortfolioCategory>("All");
  const activeVisualRef  = useRef<"All" | PortfolioCategory>("All");
  const filteredRef      = useRef(portfolioItems);

  const filteredItems = portfolioItems.filter(
    (item) => activeTab === "All" || item.category === activeTab
  );
  filteredRef.current = filteredItems;

  // ── pill helpers ─────────────────────────────────────────────────────────
  const movePill = useCallback((idx: number, animate: boolean) => {
    const pill = pillRef.current;
    const btn  = btnRefs.current[idx];
    if (!pill || !btn || !tabsRef.current) return;

    const btnRect  = btn.getBoundingClientRect();
    const wrapRect = tabsRef.current.getBoundingClientRect();
    const left  = btnRect.left - wrapRect.left;
    const width = btnRect.width;

    if (!animate) {
      gsap.set(pill, { left, width });
    } else {
      gsap.to(pill, { left, width, duration: 0.32, ease: "power3.out" });
    }
  }, []);

  // place pill on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => movePill(0, false));
    return () => cancelAnimationFrame(id);
  }, [movePill]);

  // ── click handler ────────────────────────────────────────────────────────
  const handleTabClick = (category: "All" | PortfolioCategory, idx: number) => {
    activeTabRef.current    = category;
    activeVisualRef.current = category;
    setActiveTab(category);
    setActiveVisual(category);
    movePill(idx, true);
  };

  // ── scroll-driven active tab (fires inside ScrollTrigger onUpdate) ───────
  const updateVisualFromProgress = useCallback((progress: number) => {
    // only auto-switch when showing ALL cards
    if (activeTabRef.current !== "All") return;

    const items = filteredRef.current;
    if (items.length === 0) return;

    const cardIdx  = Math.round(progress * (items.length - 1));
    const category = items[cardIdx]?.category ?? "All";

    // move pill to the matching tab
    const tabIdx = categories.indexOf(category);
    if (tabIdx !== -1) movePill(tabIdx, true);

    // update text color only when category actually changes
    if (category !== activeVisualRef.current) {
      activeVisualRef.current = category as "All" | PortfolioCategory;
      setActiveVisual(category as "All" | PortfolioCategory);
    }
  }, [movePill]);

  // ── horizontal scroll / pin ──────────────────────────────────────────────
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track   = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 120);

      const distance = getScrollDistance();
      if (distance > 0) {
        const totalCards = filteredItems.length;
        const snapPoints =
          totalCards > 1
            ? Array.from({ length: totalCards }, (_, i) => i / (totalCards - 1))
            : 0;

        gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            start: "top top",
            end: () => `+=${getScrollDistance() + 300}`,
            snap: {
              snapTo: snapPoints,
              duration: { min: 0.25, max: 0.5 },
              delay: 0.05,
              ease: "power2.out",
            },
            invalidateOnRefresh: true,
            onUpdate: (self) => updateVisualFromProgress(self.progress),
          },
        });
      }
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [activeTab, updateVisualFromProgress] });

  // ── card content ─────────────────────────────────────────────────────────
  const sharedClass =
    "glass-card glass-card-hover rounded-2xl p-7 flex flex-col justify-between w-full md:w-[440px] lg:w-[500px] shrink-0 relative overflow-hidden group min-h-[320px]";

  const cardContent = (item: (typeof portfolioItems)[number]) => (
    <>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          item.imageAccent || "from-emerald-500/10 via-transparent to-transparent"
        } opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 uppercase tracking-wider">
            {item.category}
          </span>
          <div
            className={`w-8 h-8 rounded-full bg-zinc-800/50 border border-zinc-700/50 flex items-center justify-center transition-colors ${
              item.link
                ? "text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/40"
                : "text-zinc-700 border-zinc-800/30"
            }`}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
          {item.title}
        </h3>

        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-zinc-800/80">
        {item.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative min-h-screen py-20 px-6 md:px-12 flex flex-col justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900/30 to-zinc-950"
    >
      <div className="max-w-7xl mx-auto w-full mb-8 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
              <FolderGit2 size={14} />
              <span>Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured <span className="text-gradient-emerald">Portfolio</span>
            </h2>
          </div>

          {/* ── filter tabs with sliding pill ── */}
          <div
            ref={tabsRef}
            className="relative flex items-center gap-1 border-b border-zinc-800 pb-2 md:pb-0 md:border-none"
          >
            {/* sliding pill — sits behind text */}
            <div
              ref={pillRef}
              className="absolute top-0 h-full rounded-lg bg-emerald-500/10 border border-emerald-500/25 pointer-events-none"
              style={{ left: 0, width: 0 }}
            />

            {categories.map((category, idx) => (
              <button
                key={category}
                ref={(el) => { btnRefs.current[idx] = el; }}
                onClick={() => handleTabClick(category, idx)}
                className={`relative z-10 px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeVisual === category
                    ? "text-emerald-300"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── cards track ── */}
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 pb-8 md:w-max min-w-full items-stretch"
        >
          {filteredItems.map((item) =>
            item.link ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={sharedClass}
              >
                {cardContent(item)}
              </a>
            ) : (
              <div key={item.id} className={sharedClass}>
                {cardContent(item)}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
