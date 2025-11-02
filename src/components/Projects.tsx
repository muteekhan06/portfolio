import { useState, useEffect } from "react";
import { fetchProjects } from "../lib/data";
import { LazyImage } from "./LazyImage";
import { SectionHeader } from "./SectionHeader";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  featured: boolean;
  links: {
    github?: string;
    demo?: string;
    live?: string;
  };
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchProjects()
      .then((data: any) => {
        // Data is already an array in projects.json
        setProjects(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load projects:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() === filter.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase()))
        );

  const categories = ["all", "AI/ML", "Web Development", "Other"];

  return (
    <section id="projects" className="section-padding surface-200">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Product Case Studies"
          title="Featured Projects"
          description="Production-grade launches by Infynix Solutions spanning AI, automation, and scalable web platforms."
        />

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === cat
                  ? "bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/40"
                  : "bg-surface-100/60 text-muted-foreground hover:text-foreground hover:border-primary-500/40"
              }`}
            >
              {cat === "all" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-muted-foreground text-center col-span-full">
              Loading projects...
            </p>
          ) : filteredProjects.length === 0 ? (
            <p className="text-muted-foreground text-center col-span-full">
              No projects found.
            </p>
          ) : (
            filteredProjects.map((project, index) => {
              const hasGithub = Boolean(project.links.github);
              const hasLive = Boolean(project.links.demo || project.links.live);

              return (
                <div
                  key={project.id}
                  className="card group animate-fade-in flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative mb-5">
                    <LazyImage
                      src={project.image}
                      alt={project.title}
                      priority={index < 2}
                      className="aspect-[16/10] rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-primary-500/40">
                        Featured
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 text-xs font-semibold tracking-[0.3em] uppercase text-white/80">
                      {project.category}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="text-primary-300 text-sm mb-3">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-foreground/80 mb-5 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-full bg-surface-200/70 border border-border/60 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div
                      className={`mt-auto grid gap-3 ${
                        hasGithub && hasLive ? "grid-cols-2" : "grid-cols-1"
                      }`}
                    >
                      {hasGithub && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost text-center text-sm"
                        >
                          GitHub
                        </a>
                      )}
                      {hasLive && (
                        <a
                          href={project.links.demo || project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-center text-sm"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
