import { useState, FormEvent } from "react";
import {
  Mail,
  Check,
  AlertCircle,
  Phone,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { sendEmail } from "../lib/email";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "Message sent successfully!"
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const result = await sendEmail(formData);

      if (result.success) {
        setSuccessMessage(
          result.queued
            ? "Message queued locally. If you configure a delivery provider it can be sent automatically."
            : "Message sent successfully!"
        );
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(
          result.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="section-padding surface-100">
      <div className="container-custom">
        <SectionHeader
          eyebrow="Let’s Collaborate"
          title="Partner With Infynix Solutions"
          description="Book a strategic clarity call with the Infynix Solutions leadership team and map the next high-impact sprint for your brand."
        />
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 items-start">
          <div className="glass rounded-3xl p-8 h-fit">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-300">
                  <Calendar size={22} />
                </span>
                <div>
                  <h3 className="text-foreground text-xl font-semibold mb-1">
                    Schedule a Strategy Call
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Secure a 30-minute discovery session to align Infynix
                    Solutions on your AI, automation, or growth roadmap. We
                    respond to every request within one business day.
                  </p>
                  <a
                    href="mailto:muteekhan06@gmail.com?subject=Schedule%20Infynix%20Solutions%20Strategy%20Call"
                    className="inline-flex items-center gap-2 mt-4 text-primary-300 hover:text-primary-200 text-sm font-semibold"
                    aria-label="Request a strategy call with Infynix Solutions"
                  >
                    <Mail size={18} />
                    Request a Calendar Invite
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-center text-primary-300">
                  <Phone size={22} />
                </span>
                <div>
                  <h3 className="text-foreground text-xl font-semibold mb-1">
                    Speak With Mutee ur Rehman
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Skip the queue and connect directly with the founder of
                    Infynix Solutions. Share your challenge, and we will
                    co-design the next step together.
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <a
                      href="tel:+923076739250"
                      className="block text-primary-300 hover:text-primary-200 font-semibold"
                      aria-label="Call Infynix Solutions at +92 307 673 9250"
                    >
                      +92 307 673 9250
                    </a>
                    <span className="block text-muted-foreground/80">
                      Lahore | GMT+5 | Available for global engagements
                    </span>
                  </div>
                </div>
              </div>

              <div className="border border-border/60 rounded-xl p-5 bg-surface-100/50">
                <h4 className="text-foreground text-base font-semibold mb-2">
                  What to Expect
                </h4>
                <div className="space-y-3">
                  {[
                    "Rapid audit of your AI, automation, or product roadmap by Infynix Solutions.",
                    "Clear next steps, timelines, and success metrics tailored to your business.",
                    "Priority onboarding into our production-grade delivery pipeline.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl bg-surface-100/60 border border-border/60 px-4 py-3"
                    >
                      <span className="mt-0.5">
                        <ShieldCheck className="w-5 h-5 text-primary-300" />
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border/60 rounded-xl p-5 bg-surface-100/50">
                <h4 className="text-foreground text-base font-semibold mb-3">
                  Frequently Asked Questions
                </h4>
                <div className="space-y-3 text-sm">
                  <details className="group rounded-lg border border-transparent bg-surface-100/40 px-4 py-3">
                    <summary className="font-semibold text-foreground cursor-pointer">
                      How quickly does Infynix Solutions respond to new
                      engagements?
                    </summary>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Mutee ur Rehman and the Infynix Solutions leadership pod
                      respond within one business day with an initial discovery
                      outline and next steps tailored to your roadmap.
                    </p>
                  </details>
                  <details className="group rounded-lg border border-transparent bg-surface-100/40 px-4 py-3">
                    <summary className="font-semibold text-foreground cursor-pointer">
                      What services can Infynix Solutions deliver end to end?
                    </summary>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      We architect AI copilots, computer vision platforms,
                      intelligent automation, and full-stack web systems—from
                      research and model ops to secure deployment and scaling.
                    </p>
                  </details>
                  <details className="group rounded-lg border border-transparent bg-surface-100/40 px-4 py-3">
                    <summary className="font-semibold text-foreground cursor-pointer">
                      How do we start a project with Infynix Solutions?
                    </summary>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      Share a project brief or book a strategy call above. We
                      will co-design scope, define measurable outcomes, and
                      schedule an execution sprint immediately.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <h3 className="text-foreground text-2xl font-semibold mb-2">
              Send a Project Brief
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Prefer a written overview? Share the context and we will return
              with a tailored Infynix Solutions proposal within 24 hours.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-foreground mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-surface-100/60 border border-border/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/60 disabled:opacity-50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-foreground mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-surface-100/60 border border-border/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/60 disabled:opacity-50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-foreground mb-2">Message</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full px-4 py-3 bg-surface-100/60 border border-border/60 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/60 disabled:opacity-50 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
                  role="status"
                  aria-live="polite"
                >
                  <Check size={20} />
                  <span>{successMessage}</span>
                </div>
              )}

              {status === "error" && (
                <div
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400"
                  role="alert"
                >
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
