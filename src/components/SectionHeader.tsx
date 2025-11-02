interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses =
    align === "left" ? "text-left md:text-left" : "text-center md:text-center";

  const widthClasses =
    align === "left" ? "max-w-3xl" : "max-w-3xl md:max-w-4xl mx-auto";

  return (
    <div
      className={`space-y-4 mb-12 ${alignmentClasses} ${widthClasses} ${className}`}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.4em] text-primary-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
