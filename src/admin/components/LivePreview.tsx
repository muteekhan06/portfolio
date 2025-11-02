import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LivePreviewProps {
  onClose: () => void;
}

export default function LivePreview({ onClose }: LivePreviewProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col text-foreground"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            <h3 className="text-lg font-semibold text-foreground">
              Live Preview
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-surface-200/70 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          {/* iframe */}
          <div className="flex-1 p-4">
            <iframe
              src="/"
              className="w-full h-full rounded-lg bg-background"
              title="Live Preview"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
