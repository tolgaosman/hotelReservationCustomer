import { tr } from "@/lib/dictionary";
import { GlassCard } from "./GlassCard";

export function StoryPanel({
  description,
  className,
}: {
  description: string;
  className?: string;
}) {
  return (
    <GlassCard className={className}>
      <p className="text-[11px] tracking-[0.14em] text-brand">
        {tr.roomStage.storyLabel}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink/80">{description}</p>
    </GlassCard>
  );
}
