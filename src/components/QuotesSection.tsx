"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { quoteItems } from "../data/portfolioData";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function QuotesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLQuoteElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      ".quote-header",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true },
      }
    );

    gsap.fromTo(
      ".quote-content-wrapper",
      { opacity: 0, y: 40, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      }
    );

    gsap.fromTo(
      ".quote-text-reveal",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".quote-text-reveal", start: "top 90%", once: true },
      }
    );
  }, { scope: sectionRef });

  const nextQuote = () => {
    gsap.to(".quote-text-reveal", {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev + 1) % quoteItems.length);
        gsap.fromTo(
          ".quote-text-reveal",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      },
    });
  };

  const prevQuote = () => {
    gsap.to(".quote-text-reveal", {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex((prev) => (prev - 1 + quoteItems.length) % quoteItems.length);
        gsap.fromTo(
          ".quote-text-reveal",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      },
    });
  };

  const currentQuote = quoteItems[currentIndex];

  return (
    <section
      id="quotes"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden bg-gradient-to-b from-zinc-950 via-emerald-950/10 to-zinc-950"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/10 blur-[140px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="quote-header text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            <Quote size={16} />
            <span>Engineering Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Words That <span className="text-gradient-emerald">Inspire</span>
          </h2>
        </div>

        <div className="quote-content-wrapper glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-zinc-800/80 shadow-2xl relative">
          <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 text-emerald-500/15 w-16 h-16 sm:w-24 sm:h-24 pointer-events-none" />

          <div className="quote-text-reveal relative z-10 flex flex-col items-center text-center gap-6">
            <blockquote
              ref={textRef}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-100 leading-relaxed max-w-3xl italic tracking-wide"
            >
              &ldquo;{currentQuote.text}&rdquo;
            </blockquote>

            <div className="flex flex-col items-center gap-1 pt-4 border-t border-zinc-800/60 w-full max-w-xs">
              <span className="text-base sm:text-lg font-bold text-emerald-400">
                {currentQuote.author}
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-normal">
                {currentQuote.title}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800/40">
            <div className="flex gap-2">
              {quoteItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-emerald-400"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to quote ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevQuote}
                className="p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextQuote}
                className="p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
