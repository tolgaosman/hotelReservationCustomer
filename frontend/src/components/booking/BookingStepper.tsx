import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookingStepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, i) => {
        const isDone = i < current;
        const isCurrent = i === current;
        return (
          <li key={step} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] transition-colors",
                  isDone && "border-brand bg-brand text-white",
                  isCurrent && "border-brand text-brand",
                  !isDone && !isCurrent && "border-line text-label",
                )}
              >
                {isDone ? <Check className="size-3.5" strokeWidth={2} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] tracking-[0.1em] sm:inline",
                  isCurrent || isDone ? "text-ink" : "text-label",
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="h-px w-6 bg-line sm:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
