import { useState, useEffect } from "react";
import { fetchExperience } from "../lib/data";
import { SectionHeader } from "./SectionHeader";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperience()
      .then((data: any) => {
        // Data is already an array in experience.json
        setExperiences(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load experience:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="section-padding surface-100">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Delivery Leadership"
          title="Experience"
          description="A proven track record leading AI, automation, and full-stack programs from MVPs to enterprise rollouts across Infynix Solutions engagements."
        />
        <div className="max-w-4xl mx-auto space-y-8">
          {loading ? (
            <p className="text-muted-foreground text-center">
              Loading experience data...
            </p>
          ) : experiences.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No experience data available.
            </p>
          ) : (
            experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-primary-300 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground mt-3 md:mt-0 md:text-right">
                    <p>{exp.location}</p>
                    <p>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </p>
                  </div>
                </div>
                <p className="text-foreground/80 mb-5">{exp.description}</p>
                <ul className="space-y-3 mb-5">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="flex items-start text-foreground/90">
                      <span className="text-primary-400 mr-2 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-300 border border-primary-500/30 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
