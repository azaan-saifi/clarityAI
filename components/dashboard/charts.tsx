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
    <div className={cn("mt-4", className)}>
      <div className="w-full bg-zinc-700 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}CC 100%)`,
          }}
        />
      </div>
    </div>
  );
}

interface FunnelDataPoint {
  stage: string;
  value: number;
  displayValue: string;
  icon: React.ReactNode;
  rawValue?: number;
}

interface ConversionCard {
  fromStage: string;
  toStage: string;
  fromValue: number;
  toValue: number;
  conversionRate: number;
  fromIcon: React.ReactNode;
  toIcon: React.ReactNode;
}

interface FunnelWaveChartProps {
  data: FunnelDataPoint[];
  className?: string;
  onHover?: (conversion: ConversionCard | null) => void;
}

export function FunnelWaveChart({
  data,
  className,
  onHover,
}: FunnelWaveChartProps) {
  const chartData = {
    labels: data.map((point) => point.stage),
    datasets: [
      {
        data: data.map((point) => point.value),
        borderColor: "#9df5c4",
        backgroundColor: "rgba(157, 245, 196, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.6, // Higher tension for more wave-like curves
        pointBackgroundColor: "#9df5c4",
        pointBorderColor: "#1a1a1a",
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBackgroundColor: "#7de3a0",
        pointHoverBorderColor: "#9df5c4",
        pointHoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }, // Disable default tooltip since we'll use custom cards
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 12,
            weight: 500,
          },
          padding: 20,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: "left" as const,
        grid: {
          color: "rgba(63, 63, 70, 0.3)",
          drawBorder: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 11,
          },
          callback: function (value: string | number) {
            const numValue = Number(value);
            return numValue.toFixed(1) + "%";
          },
          padding: 15,
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 8,
        hoverRadius: 12,
        backgroundColor: "#9df5c4",
        borderColor: "#1a1a1a",
        borderWidth: 3,
      },
    },
    interaction: {
      intersect: false,
      mode: "point" as const,
    },
    onHover: (event: ChartEvent, elements: ActiveElement[]) => {
      const target = event.native?.target as HTMLElement;
      if (target) {
        target.style.cursor = elements.length > 0 ? "pointer" : "default";
      }

      if (elements.length > 0 && onHover) {
        const pointIndex = elements[0].index;

        // Show conversion for all points except the first one
        if (pointIndex > 0) {
          const fromPoint = data[pointIndex - 1];
          const toPoint = data[pointIndex];

          // Use rawValue if available, otherwise use value
          const fromValue = fromPoint.rawValue ?? fromPoint.value;
          const toValue = toPoint.rawValue ?? toPoint.value;
          const conversionRate = toPoint.value; // This is already the conversion percentage

          const conversion: ConversionCard = {
            fromStage: fromPoint.stage,
            toStage: toPoint.stage,
            fromValue,
            toValue,
            conversionRate,
            fromIcon: fromPoint.icon,
            toIcon: toPoint.icon,
          };

          onHover(conversion);
        } else {
          onHover(null);
        }
      } else if (onHover) {
        onHover(null);
      }
    },
  };

  return (
    <div className={cn("w-full h-full relative", className)}>
      <Line data={chartData} options={options} />
    </div>
  );
}
