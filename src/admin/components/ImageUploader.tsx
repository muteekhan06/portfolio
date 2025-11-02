import { useState } from "react";
import { Upload, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // In production, upload to Vercel Blob or similar
      // For now, we'll use a local URL
      const formData = new FormData();
      formData.append("file", file);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock URL - in production this would be the actual uploaded URL
      const mockUrl = `/assets/${file.name}`;
      onUpload(mockUrl);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setError("");
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!preview && (
        <label className="block">
          <div className="glass rounded-lg p-8 border-2 border-dashed border-border/60 hover:border-primary-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            <div className="text-center">
              {uploading ? (
                <>
                  <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-foreground mb-2">Click to upload image</p>
                  <p className="text-muted-foreground text-sm">
                    PNG, JPG, WebP up to 5MB
                  </p>
                </>
              )}
            </div>
          </div>
        </label>
      )}

      {/* Preview */}
      {preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-lg p-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle size={20} />
                <span className="font-medium">Upload successful</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Image has been uploaded and optimized
              </p>
              <button
                onClick={clearPreview}
                className="btn-ghost text-sm flex items-center gap-2"
              >
                <X size={16} />
                Remove
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
