"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "positive" | "negative";
    label?: string;
  };
  icon: ReactNode;
  children?: ReactNode;
  className?: string;
  size?: "small" | "default" | "large";
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  children,
  className,
  size = "default",
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return val.toLocaleString();
      }
      return val.toString();
    }
    return val;
  };

  return (
    <div
      className={cn(
        "relative bg-[#1a1a1a] border border-zinc-700 rounded-xl transition-all duration-300 overflow-hidden",
        "hover:transform hover:translate-y-[-4px] hover:shadow-glowLarge hover:border-[#9df5c4]/30",
        "before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]",
        "before:bg-gradient-to-r before:from-[#9df5c4] before:to-[#7de3a0]",
        "before:opacity-0 before:transition-opacity before:duration-300",
        "hover:before:opacity-100",
        "flex flex-col", // Make card a flex container
        size === "small" && "p-4",
        size === "default" && "p-6",
        size === "large" && "p-6",
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "bg-[#9df5c4]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#9df5c4]",
            size === "small" ? "w-8 h-8 text-sm" : "w-12 h-12 text-lg"
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-white font-semibold uppercase tracking-wider",
            size === "small" ? "text-xs" : "text-sm"
          )}
        >
          {title}
        </span>
      </div>

      {/* Metric Value */}
      <div
        className={cn(
          "text-white font-bold mb-2 leading-tight",
          size === "small" ? "text-2xl" : "text-4xl"
        )}
      >
        {formatValue(value)}
      </div>

      {/* Change Indicator */}
      {change && (
        <div
          className={cn(
            "flex items-center gap-2 mb-4 font-semibold",
            size === "small" ? "text-xs" : "text-sm",
            change.type === "positive" ? "text-[#9df5c4]" : "text-[#ff6b6b]"
          )}
        >
          <span className="text-lg">
            {change.type === "positive" ? "↗" : "↘"}
          </span>
          <span>{change.value}</span>
          {change.label && (
            <span className="text-gray-400 font-normal">{change.label}</span>
          )}
        </div>
      )}

      {/* Chart or Additional Content */}
      {children && (
        <div
          className={cn(
            "mt-auto flex-1 min-h-0",
            size === "small" ? "h-20" : "h-32"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
