import { cn } from "@/lib/utils";

interface StatItem {
  value: string | number;
  label: string;
}

interface StatGridProps {
  stats: StatItem[];
  className?: string;
  columns?: number;
}

export function StatGrid({ stats, className, columns = 2 }: StatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3 mb-4",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
        className
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-3 bg-zinc-700/30 border border-zinc-700 rounded-lg"
        >
          <div className="text-lg font-semibold text-white mb-1">
            {typeof stat.value === "number"
              ? stat.value.toLocaleString()
              : stat.value}
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
