"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { educationInfo, hardSkills, softSkills, personalInfo } from "../data/portfolioData";
import { UserCheck, GraduationCap, Cpu, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-header", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".about-bio",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-bio", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".about-edu",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-edu", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".hard-skill-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".hard-skills-container", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".soft-skill-item",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".soft-skills-container", start: "top 95%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 relative bg-zinc-950/60">
      <div className="max-w-6xl mx-auto">
        <div className="about-header mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            <UserCheck size={14} />
            <span>Background</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-gradient-emerald">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <div className="about-bio glass-card rounded-2xl p-7 border border-zinc-800/80">
              <p className="text-zinc-300 text-base leading-relaxed font-normal">
                {personalInfo.description}
              </p>
            </div>

            <div className="about-edu glass-card rounded-2xl p-7 border border-zinc-800/80 space-y-5">
              <div className="flex items-center gap-3 text-emerald-400 font-semibold text-sm uppercase tracking-wide">
                <GraduationCap size={18} />
                <span>Education</span>
              </div>

              <div className="space-y-3">
                <div className="text-lg font-bold text-white">{educationInfo.institution}</div>
                <div className="text-sm font-semibold text-emerald-400">{educationInfo.major}</div>
                <ul className="mt-4 space-y-2.5">
                  {educationInfo.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-zinc-400 flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="soft-skills-container glass-card rounded-2xl p-7 border border-zinc-800/80 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide">
                Core Strengths
              </h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="soft-skill-item text-xs font-medium px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-emerald-400 font-semibold text-sm uppercase tracking-wide mb-6">
              <Cpu size={18} />
              <span>Technical Architecture</span>
            </div>

            <div className="hard-skills-container grid grid-cols-1 sm:grid-cols-2 gap-5">
              {hardSkills.map((group, idx) => (
                <div
                  key={idx}
                  className="hard-skill-card glass-card glass-card-hover rounded-2xl p-6 border border-zinc-800/80"
                >
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                      <group.icon size={20} />
                    </div>
                    <h4 className="text-base font-bold text-white">{group.category}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium px-3 py-1.5 bg-zinc-900/90 text-zinc-300 rounded-lg border border-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
