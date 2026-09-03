import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-(--color-accent-300) uppercase">
        <span aria-hidden className="h-px w-6 bg-(--color-accent-500)" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold text-(--color-ink-0) sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-(--color-ink-2)">{description}</p>
      ) : null}
    </div>
  );
}
