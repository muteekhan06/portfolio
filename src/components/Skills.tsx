import { useState, useEffect, useRef } from "react";
import { fetchSkills } from "../lib/data";
import { SectionHeader } from "./SectionHeader";

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchSkills()
      .then((data: any) => {
        // Data has a "technical" array in skills.json
        if (data.technical && Array.isArray(data.technical)) {
          setSkillCategories(data.technical);
        }
      })
      .catch((err) => console.error("Failed to load skills:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSkills((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.5 }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-skill]");
    elements.forEach((el) => observerRef.current?.observe(el));
  }, [skillCategories]);

  return (
    <section id="skills" className="section-padding surface-100">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Technical Accelerators"
          title="Skills"
          description="Tooling and technologies powering Infynix Solutions engagements across AI, automation, and full-stack product delivery."
        />
        <div className="max-w-5xl mx-auto space-y-12">
          {loading ? (
            <p className="text-muted-foreground text-center">
              Loading skills data...
            </p>
          ) : skillCategories.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No skills data available.
            </p>
          ) : (
            skillCategories.map((category, catIndex) => (
              <div
                key={category.category}
                className="animate-fade-in"
                style={{ animationDelay: `${catIndex * 200}ms` }}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center md:text-left">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill) => {
                    const skillId = `skill-${category.category}-${skill.name}`;
                    const isVisible = visibleSkills.has(skillId);

                    return (
                      <div
                        key={skill.name}
                        id={skillId}
                        data-skill
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-foreground font-medium">
                            {skill.name}
                          </span>
                          <span className="text-primary-300 text-sm">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-surface-200/70 border border-border/60">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 via-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${skill.level}%` : "0%",
                              transitionDelay: "200ms",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
