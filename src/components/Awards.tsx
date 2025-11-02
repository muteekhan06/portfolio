import { useState, useEffect } from "react";
import { fetchAwards } from "../lib/data";
import { SectionHeader } from "./SectionHeader";

interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image?: string;
  credentialUrl?: string;
}

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards()
      .then((data: any) => {
        // Data is already an array in awards.json
        setAwards(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load awards:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="awards" className="section-padding surface-200">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Recognition"
          title="Awards & Certifications"
          description="Highlights from global programs validating Infynix Solutions craftsmanship and strategic delivery."
        />
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-muted-foreground text-center">
              Loading awards...
            </p>
          ) : awards.length === 0 ? (
            <p className="text-muted-foreground text-center">
              No awards data available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award, index) => (
                <div
                  key={award.id}
                  className="card animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {award.image && (
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {award.title}
                  </h3>
                  <p className="text-primary-300 font-medium mb-2">
                    {award.issuer}
                  </p>
                  <p className="text-muted-foreground text-sm mb-3">
                    {award.date}
                  </p>
                  <p className="text-foreground/80 mb-4">{award.description}</p>
                  {award.credentialUrl && (
                    <a
                      href={award.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex btn-primary text-sm"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
