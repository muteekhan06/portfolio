import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const WHATSAPP_NUMBER = "+923076739250";
const DEFAULT_MESSAGE =
  "Hi Mutee, I'd like to discuss a new project with Infynix Solutions.";

function openWhatsApp(): void {
  const url = `https://wa.me/${WHATSAPP_NUMBER.replace(
    /[^\d]/g,
    ""
  )}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="glass rounded-2xl p-4 w-72 mb-3 shadow-2xl border border-border/60">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">
                Chat with Infynix Solutions
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Ready to collaborate? Start a WhatsApp conversation with Mutee
                ur Rehman instantly.
              </p>
            </div>
            <button
              className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={openWhatsApp}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-green-500/25 hover:bg-green-600 transition-colors"
          >
            <Send className="w-4 h-4" />
            Continue on WhatsApp
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl shadow-green-500/40 hover:bg-green-600 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
        aria-label={
          isOpen ? "Hide WhatsApp chat widget" : "Open WhatsApp chat widget"
        }
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
