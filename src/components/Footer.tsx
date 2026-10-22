"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "../data/portfolioData";
import { ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 95%",
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-6 relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-xl font-bold tracking-tight text-white">
            Dharma<span className="text-emerald-400">.</span>
          </span>
          <p className="text-xs text-zinc-400">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js, Tailwind & GSAP.
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 transition-all shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
