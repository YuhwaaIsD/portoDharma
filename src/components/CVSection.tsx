"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "../data/portfolioData";
import { Download, FileText, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CVSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cv-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cv-header", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".cv-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: ".cv-card", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".cv-summary-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cv-summary", start: "top 90%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cv" ref={sectionRef} className="py-28 px-6 relative bg-zinc-950/40">
      <div className="max-w-6xl mx-auto">
        <div className="cv-header mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            <FileText size={14} />
            <span>Credentials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Curriculum <span className="text-gradient-emerald">Vitae</span>
          </h2>
        </div>

        <div className="cv-card glass-card rounded-3xl p-8 sm:p-12 border border-zinc-800/80 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 cv-summary space-y-6">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed">
                My official C.V. provides an in-depth breakdown of my academic qualifications, core development skills, engineering projects, and leadership milestones.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Vocational Software Engineering graduate credentials",
                  "Full-stack web development & database architecture",
                  "Organizational leadership and mentoring history",
                  "Verified project showcase & internship achievements",
                ].map((item) => (
                  <div key={item} className="cv-summary-item flex items-center gap-3 text-sm md:text-base text-zinc-300">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center gap-5 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-zinc-800/80 lg:pl-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                Direct Document Access
              </span>

              <a
                href={personalInfo.cvDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <FileText size={20} />
                <span>Open Official C.V.</span>
                <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
