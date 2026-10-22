"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "../data/portfolioData";
import { Download, Mail, ArrowRight } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-portrait",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: "expo.out" },
          "-=1.0",
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".hero-glow",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          "-=1.0",
        );
    },
    { scope: container },
  );

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={container}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden"
    >
      <div className="hero-glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-purple-500/10 blur-[120px] rounded-full" />
      <div className="hero-glow pointer-events-none absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-emerald-500/10 blur-[90px] rounded-full" />

      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-end pb-32 opacity-75 md:pb-40">
        <div
          className="hero-portrait relative w-full max-w-[1000px] h-[100%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0) 30%, rgba(0,0,0,1) 60%)",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0) 15%, rgba(0,0,0,1) 50%)",
          }}
        >
          <img
            src="/portrait.png"
            alt="Dharma Santoso Portrait"
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.08]">
          Dharma <span className="text-gradient-emerald">Santoso</span>
        </h1>

        <p className="hero-desc text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed font-normal">
          {personalInfo.tagline}
        </p>

        <div className="hero-cta-wrapper flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => scrollTo("#portfolio")}
            className="hero-cta group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span>Explore Portfolio</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="hero-cta inline-flex items-center gap-2 bg-zinc-900/80 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-zinc-800/80 px-7 py-3.5 rounded-xl font-medium shadow-md transition-all duration-300"
          >
            <Mail size={18} className="text-emerald-400" />
            <span>Contact Me</span>
          </button>

          <a
            href={personalInfo.cvDriveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-flex items-center gap-2 bg-transparent text-zinc-400 hover:text-zinc-200 px-6 py-3.5 rounded-xl font-medium transition-all duration-300"
          >
            <Download size={18} />
            <span>Get C.V.</span>
          </a>
        </div>
      </div>
    </section>
  );
}
