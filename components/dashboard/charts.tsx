"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart default styling
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      display: false,
      grid: { display: false },
    },
    y: {
      display: false,
      grid: { display: false },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 6,
      backgroundColor: "#9df5c4",
      borderColor: "#9df5c4",
      borderWidth: 2,
    },
  },
  interaction: {
    intersect: false,
    mode: "index" as const,
  },
  onHover: (event: ChartEvent, elements: ActiveElement[]) => {
    const target = event.native?.target as HTMLElement;
    if (target) {
      target.style.cursor = elements.length > 0 ? "pointer" : "default";
    }
  },
};

interface LineChartProps {
  data: number[];
  labels?: string[];
  color?: string;
  className?: string;
}

export function LineChart({
  data,
  labels,
  color = "#9df5c4",
  className,
}: LineChartProps) {
  const chartData = {
    labels: labels || data.map((_, i) => `Point ${i + 1}`),
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: color,
        pointBorderColor: color,
      },
    ],
  };

  const options = {
    ...chartDefaults,
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            const value = context.parsed.y;
            return `${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`;
          },
        },
      },
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Line data={chartData} options={options} />
    </div>
  );
}

interface BarChartProps {
  data: number[];
  labels?: string[];
  color?: string;
  className?: string;
}

export function BarChart({
  data,
  labels,
  color = "#9df5c4",
  className,
}: BarChartProps) {
  const chartData = {
    labels: labels || data.map((_, i) => `Bar ${i + 1}`),
    datasets: [
      {
        data,
        backgroundColor: `${color}CC`,
        borderColor: color,
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...chartDefaults,
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: {
          label: (context: { parsed: { y: number } }) => {
            const value = context.parsed.y;
            return `${value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}`;
          },
        },
      },
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

interface DoughnutChartProps {
  percentage: number;
  color?: string;
  className?: string;
}

export function DoughnutChart({
  percentage,
  color = "#9df5c4",
  className,
}: DoughnutChartProps) {
  const chartData = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "rgba(255, 255, 255, 0.1)"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    ...chartDefaults,
    scales: undefined, // Remove scales for doughnut chart
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: {
          label: (context: { parsed: number }) => {
            return `${context.parsed.toFixed(1)}%`;
          },
        },
      },
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

interface StackedBarChartProps {
  data: { primary: number[]; secondary: number[] };
  labels?: string[];
  colors?: { primary: string; secondary: string };
  className?: string;
}

export function StackedBarChart({
  data,
  labels,
  colors = { primary: "#9df5c4", secondary: "#9df5c480" },
  className,
}: StackedBarChartProps) {
  const chartData = {
    labels: labels || data.primary.map((_, i) => `Bar ${i + 1}`),
    datasets: [
      {
        label: "High-ticket",
        data: data.primary,
        backgroundColor: colors.primary,
        borderRadius: 4,
      },
      {
        label: "Discount",
        data: data.secondary,
        backgroundColor: colors.secondary,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    ...chartDefaults,
    plugins: {
      ...chartDefaults.plugins,
      tooltip: {
        ...chartDefaults.plugins.tooltip,
        callbacks: {
          label: (context: {
            dataset: { label?: string };
            parsed: { y: number };
          }) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
        stacked: true,
      },
      y: {
        display: false,
        grid: { display: false },
        stacked: true,
      },
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

interface ProgressBarProps {
  percentage: number;
  color?: string;
  className?: string;
}

export function ProgressBar({
  percentage,
  color = "#9df5c4",
  className,
}: ProgressBarProps) {
  return (
    <div className={cn("w-full flex items-end h-full", className)}>
      <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, #7de3a0 100%)`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
