"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "../data/portfolioData";
import { Mail, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-header", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".contact-info-card",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-content", start: "top 90%", once: true },
        }
      );

      gsap.fromTo(
        ".contact-form-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-content", start: "top 90%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        (e.target as HTMLFormElement).reset();
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative bg-zinc-950/80">
      <div className="max-w-6xl mx-auto">
        <div className="contact-header mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">
            <MessageSquare size={14} />
            <span>Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get In <span className="text-gradient-emerald">Touch</span>
          </h2>
        </div>

        <div className="contact-content grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-zinc-300 text-base leading-relaxed mb-6 font-normal">
              Whether you have an inquiry, potential collaboration, software project, or career opportunity, feel free to reach out directly.
            </p>

            <a
              href={`mailto:${personalInfo.email}`}
              className="contact-info-card glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Mail size={22} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-1">Direct Email</p>
                <p className="text-base text-white font-semibold group-hover:text-emerald-300 transition-colors">{personalInfo.email}</p>
              </div>
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-card glass-card glass-card-hover rounded-2xl p-6 flex items-center gap-5 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <LinkedinIcon size={22} />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-1">LinkedIn Profile</p>
                <p className="text-base text-white font-semibold group-hover:text-cyan-300 transition-colors">www.linkedin.com/in/dharmasantoso</p>
              </div>
            </a>
          </div>

          <div className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-zinc-800/80 shadow-2xl">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="contact-form-item">
                <label htmlFor="name" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="contact-form-item">
                <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-colors"
                  placeholder="your.email@domain.com"
                />
              </div>

              <div className="contact-form-item">
                <label htmlFor="message" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              {formStatus === "success" && (
                <div className="contact-form-item flex items-center gap-3 text-sm text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 rounded-xl px-4 py-3">
                  <CheckCircle size={18} className="text-emerald-400 shrink-0" />
                  <span>Message sent successfully! I will respond promptly.</span>
                </div>
              )}
              {formStatus === "error" && (
                <div className="contact-form-item flex items-center gap-3 text-sm text-rose-300 bg-rose-950/50 border border-rose-500/30 rounded-xl px-4 py-3">
                  <AlertCircle size={18} className="text-rose-400 shrink-0" />
                  <span>Unable to dispatch message. Please try emailing directly.</span>
                </div>
              )}

              <div className="contact-form-item pt-2">
                <button
                  type="submit"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-bold rounded-xl px-6 py-4 text-sm hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-60"
                >
                  {formStatus === "submitting" ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
