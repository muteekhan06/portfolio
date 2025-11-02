import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchProfile } from "../lib/data";
import { SectionHeader } from "./SectionHeader";

interface ProfileData {
  bio: string;
  education?: Array<{
    degree: string;
    institution: string;
    duration: string;
  }>;
}

export default function About() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile()
      .then((data: any) => setProfile(data))
      .catch((err) => console.error("Failed to load profile:", err));
  }, []);

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="section-padding surface-200">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            eyebrow="Infynix Solutions DNA"
            title="About Mutee ur Rehman"
            description="Founder of Infynix Solutions architecting intelligent products, automation ecosystems, and brand-defining digital experiences."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-foreground/80 mb-10">
              {profile.bio}
            </p>

            {profile.education && profile.education.length > 0 && (
              <div className="mt-10 pt-10 border-t border-border/60">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Education
                </h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-xl bg-surface-100/60 border border-border/60 p-4"
                    >
                      <div>
                        <h4 className="text-foreground font-semibold">
                          {edu.degree}
                        </h4>
                        <p className="text-primary-300">{edu.institution}</p>
                      </div>
                      <p className="text-muted-foreground text-sm mt-2 sm:mt-0">
                        {edu.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
