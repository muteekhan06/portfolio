import { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = "",
  placeholderSrc,
  priority = false,
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || "");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={
          imageSrc ||
          placeholderSrc ||
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23334155" width="400" height="300"/%3E%3C/svg%3E'
        }
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`w-full h-full object-cover transition-all duration-700 ${
          imageLoaded ? "blur-0 scale-100" : "blur-lg scale-110"
        }`}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-surface-200/60 animate-pulse" />
      )}
    </div>
  );
}
