import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Youtube } from "lucide-react";
import { fetchProfile } from "../lib/data";

interface ProfileData {
  name: string;
  title: string;
  tagline: string;
  professionalTagline?: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
    youtube?: string;
    portfolio?: string;
  };
  stats?: {
    githubRepos?: string;
    openSourceContribution?: string;
    yearsOfExperience?: number;
  };
}

export default function Hero() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    fetchProfile()
      .then((data: any) => setProfile(data))
      .catch((err) => console.error("Failed to load profile:", err));
  }, []);

  if (!profile) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </section>
    );
  }

  const stats = profile.stats;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-24"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div
          className={`absolute w-96 h-96 bg-primary-500/20 rounded-full blur-3xl top-1/4 left-1/4 ${
            prefersReducedMotion ? "" : "animate-float"
          }`}
        />
        <div
          className={`absolute w-96 h-96 bg-primary-600/20 rounded-full blur-3xl bottom-1/4 right-1/4 ${
            prefersReducedMotion ? "" : "animate-float animation-delay-200"
          }`}
        />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-100/70 border border-border/60 text-sm text-primary-200 font-medium mb-6">
            <span
              className={`w-2 h-2 rounded-full bg-primary-400 ${
                prefersReducedMotion ? "" : "animate-pulse"
              }`}
              aria-hidden="true"
            />
            Infynix Solutions · Production-grade AI & Automation Studio
          </div>
          {/* Greeting */}
          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.5 }}
            className="text-primary-300 text-lg mb-4 tracking-[0.4em] uppercase"
          >
            Hi, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.1 }
            }
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6"
          >
            {profile.name}
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.2 }
            }
            className="text-2xl sm:text-3xl md:text-4xl text-foreground/80 mb-8"
          >
            {profile.title}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.3 }
            }
            className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6"
          >
            {profile.professionalTagline || profile.tagline}
          </motion.p>

          <motion.p
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.35 }
            }
            className="text-foreground/70 max-w-3xl mx-auto mb-12"
          >
            Infynix Solutions engineers measurable outcomes for venture-backed
            teams—shipping AI copilots, computer vision platforms, and
            full-stack automation that plugs directly into revenue.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.4 }
            }
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#projects" className="btn-primary flex items-center gap-2">
              View Projects
              <ArrowDown size={20} />
            </a>
            <a
              href="/assets/resume.pdf"
              download
              className="btn-ghost flex items-center gap-2"
            >
              <Download size={20} />
              Download Resume
            </a>
          </motion.div>

          {stats && (
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.5 }
              }
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl mx-auto"
            >
              <div className="glass rounded-2xl p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary-300 mb-2">
                  Infynix Shipments
                </p>
                <p className="text-3xl font-semibold text-foreground">
                  {stats.githubRepos || "12+"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Public builds and case studies delivered with Infynix
                  Solutions.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary-300 mb-2">
                  Open Source Impact
                </p>
                <p className="text-3xl font-semibold text-foreground">
                  {stats.openSourceContribution || "100%"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Infynix Solutions commits production tooling back to the
                  community.
                </p>
              </div>
              <div className="glass rounded-2xl p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary-300 mb-2">
                  Delivery Experience
                </p>
                <p className="text-3xl font-semibold text-foreground">
                  {typeof stats.yearsOfExperience === "number"
                    ? `${stats.yearsOfExperience}+`
                    : "4+"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Years architecting AI, automation, and full-stack systems end
                  to end.
                </p>
              </div>
            </motion.div>
          )}

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex gap-4 justify-center mt-12"
          >
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            {profile.socials.youtube && (
              <a
                href={profile.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground/60"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
