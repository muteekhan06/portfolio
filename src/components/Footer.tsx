import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-200 border-t border-border/60">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-base">IS</span>
              </div>
              <span className="text-foreground font-bold text-lg">
                Infynix Solutions
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Infynix Solutions is the AI-first studio led by Mutee ur Rehman,
              delivering production-grade automation, intelligent products, and
              measurable growth for venture-backed teams worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Book a Call</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Coordinate a strategy session with the Infynix Solutions delivery
              pod to fast-track your AI and automation roadmap.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href="mailto:muteekhan06@gmail.com?subject=Infynix%20Solutions%20Discovery%20Call"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                muteekhan06@gmail.com
              </a>
              <a
                href="tel:+923076739250"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Phone size={18} />
                +92 307 673 9250
              </a>
              <span className="flex items-center gap-2">
                <CalendarDays size={18} />
                Response within one business day
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={18} />
                Lahore, Pakistan · Global delivery
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/muteeurrehman28"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                aria-label="Infynix Solutions on GitHub"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/mutee-ur-rehman-714110282"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                aria-label="Infynix Solutions on LinkedIn"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/MuteeAI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                aria-label="Infynix Solutions on Twitter"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="mailto:muteekhan06@gmail.com"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                aria-label="Email Infynix Solutions"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Infynix Solutions. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Engineered by Mutee ur Rehman for teams that demand production-grade
            outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
}
