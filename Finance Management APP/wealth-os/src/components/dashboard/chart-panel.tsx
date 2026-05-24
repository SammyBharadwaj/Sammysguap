import { cn } from "@/lib/utils";

type ChartPanelProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChartPanel({ title, description, children, className }: ChartPanelProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-foreground/10 bg-card p-5",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </article>
  );
}
