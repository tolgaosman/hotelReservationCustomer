import { useDictionary } from "@/lib/DictionaryContext";
import { cn } from "@/lib/utils";
import { GlassCard } from "./GlassCard";

export function StoryPanel({
  description,
  variant = "glass",
  className,
}: {
  description: string;
  variant?: "glass" | "plain" | "brand";
  className?: string;
}) {
  const tr = useDictionary();
  const inverted = variant === "brand";

  return (
    <GlassCard variant={variant} className={className}>
      <p className={cn("text-[11px] tracking-[0.14em]", inverted ? "text-white/85" : "text-brand")}>
        {tr.roomStage.storyLabel}
      </p>
      <p className={cn("mt-2 text-sm leading-relaxed", inverted ? "text-white/85" : "text-ink/80")}>
        {description}
      </p>
    </GlassCard>
  );
}
