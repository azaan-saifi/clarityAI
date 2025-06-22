"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { TrendingUp, Eye, Phone, DollarSign, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnalyticsData {
  summary: {
    title: string;
    value: string | number;
    change: { value: string; type: "positive" | "negative"; label: string };
    trends: number[];
  };
  pageVisits: {
    title: string;
    value: string | number;
    change: { value: string; type: "positive" | "negative"; label: string };
    trends: number[];
  };
  calls: {
    title: string;
    value: string | number;
    change: { value: string; type: "positive" | "negative"; label: string };
    trends: number[];
  };
  revenue: {
    title: string;
    value: string | number;
    change: { value: string; type: "positive" | "negative"; label: string };
    trends: number[];
  };
}

interface AnalyticsWaveChartProps {
  data: AnalyticsData;
}

type MetricKey = "summary" | "pageVisits" | "calls" | "revenue";

// Custom LineChart with visible axes for analytics
function AnalyticsLineChart({
  data,
  labels,
  color = "#9df5c4",
  className,
}: {
  data: number[];
  labels?: string[];
  color?: string;
  className?: string;
}) {
  const chartData = {
    labels: labels || data.map((_, i) => `Point ${i + 1}`),
    datasets: [
      {
        data,
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: color,
        pointBorderColor: color,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1a1a1a",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#9df5c4",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(63, 63, 70, 0.3)",
          drawBorder: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
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
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Line data={chartData} options={options} />
    </div>
  );
}

// Multi-line chart for summary view
function MultiLineChart({
  datasets,
  labels,
  className,
}: {
  datasets: Array<{
    data: number[];
    color: string;
    label: string;
  }>;
  labels?: string[];
  className?: string;
}) {
  const chartData = {
    labels: labels || datasets[0].data.map((_, i) => `Point ${i + 1}`),
    datasets: datasets.map((dataset) => ({
      data: dataset.data,
      borderColor: dataset.color,
      backgroundColor: `${dataset.color}20`,
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: dataset.color,
      pointBorderColor: dataset.color,
      pointRadius: 4,
      pointHoverRadius: 6,
      label: dataset.label,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // We'll create our own legend
      tooltip: {
        enabled: true,
        backgroundColor: "#1a1a1a",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#9df5c4",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(63, 63, 70, 0.3)",
          drawBorder: false,
        },
        ticks: {
          color: "#888888",
          font: {
            size: 11,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
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
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className={cn("w-full h-full relative min-h-[60px]", className)}>
      <Line data={chartData} options={options} />
    </div>
  );
}

export function AnalyticsWaveChart({ data }: AnalyticsWaveChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("summary");

  const metrics = [
    {
      key: "summary" as MetricKey,
      title: "Summary",
      subtitle: "All Metrics",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "#9df5c4",
      change: data.summary.change,
    },
    {
      key: "pageVisits" as MetricKey,
      title: "Page Visits",
      subtitle: "824.2K",
      icon: <Eye className="w-5 h-5" />,
      color: "#64b5f6",
      change: data.pageVisits.change,
    },
    {
      key: "calls" as MetricKey,
      title: "Calls",
      subtitle: "31.1K",
      icon: <Phone className="w-5 h-5" />,
      color: "#ffd700",
      change: data.calls.change,
    },
    {
      key: "revenue" as MetricKey,
      title: "Revenue",
      subtitle: "8.0K",
      icon: <DollarSign className="w-5 h-5" />,
      color: "#ff6b6b",
      change: data.revenue.change,
    },
  ];

  // Conversion rates between metrics
  const conversionRates = [
    { from: "pageVisits", to: "calls", rate: 37.7 },
    { from: "calls", to: "revenue", rate: 25.7 },
  ];

  const getConversionRate = (fromKey: string, toKey: string) => {
    const conversion = conversionRates.find(
      (rate) => rate.from === fromKey && rate.to === toKey
    );
    return conversion?.rate;
  };

  // Convert raw data to percentage changes for wave chart
  const getPercentageChanges = (trends: number[]) => {
    return trends.slice(1).map((value, index) => {
      const previousValue = trends[index];
      return ((value - previousValue) / previousValue) * 100;
    });
  };

  const chartLabels = [
    "1/19",
    "1/19",
    "1/22",
    "1/23",
    "2/9",
    "2/14",
    "2/21",
    "2/22",
    "2/26",
    "3/12",
    "3/14",
    "3/20",
    "3/24",
    "3/26",
    "4/1",
    "4/4",
    "4/7",
    "4/12",
  ];

  return (
    <div className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-3 sm:p-6">
      <FadeUp>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Page Visits, Calls & Revenue
          </h2>
        </div>
      </FadeUp>

      {/* Metric Selection Tabs with Conversion Arrows */}
      <FadeUp delay={0.1}>
        <div className="relative mb-6 sm:mb-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-4 relative">
              {metrics.map((metric) => (
                <div key={metric.key} className="relative">
                  <button
                    onClick={() => setSelectedMetric(metric.key)}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left",
                      selectedMetric === metric.key
                        ? "border-[#9df5c4] bg-[#9df5c4]/10 transform scale-105"
                        : "border-zinc-700 bg-transparent hover:border-zinc-600 hover:bg-zinc-800/50"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${metric.color}20` }}
                      >
                        <div style={{ color: metric.color }}>{metric.icon}</div>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">
                          {metric.title}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {metric.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          metric.change.type === "positive"
                            ? "text-[#9df5c4]"
                            : "text-[#ff6b6b]"
                        )}
                      >
                        {metric.change.value}
                      </span>
                      <span className="text-xs">
                        {metric.change.type === "positive" ? "↗" : "↘"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {metric.change.label?.split("vs ")[1]}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            {/* Conversion Arrows positioned between tabs */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Arrow between Page Visits and Calls */}
              <div
                className="absolute top-1 transform -translate-y-1/2"
                style={{ left: "calc(50% - 2rem)" }}
              >
                <FadeUp delay={0.1}>
                  <div className="flex flex-col items-center">
                    <div className="mb-10 bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg">
                      <span className="text-[#9df5c4] font-semibold text-sm">
                        {getConversionRate("pageVisits", "calls")}%
                      </span>
                    </div>
                    <div className="bg-[#9df5c4] rounded-full p-2 shadow-lg">
                      <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Arrow between Calls and Revenue */}
              <div
                className="absolute top-1 transform -translate-y-1/2"
                style={{ left: "calc(75% - 2rem)" }}
              >
                <FadeUp delay={0.15}>
                  <div className="flex flex-col items-center">
                    <div className="mb-10 bg-[#1a1a1a] border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg">
                      <span className="text-[#9df5c4] font-semibold text-sm">
                        {getConversionRate("calls", "revenue")}%
                      </span>
                    </div>
                    <div className="bg-[#9df5c4] rounded-full p-2 shadow-lg">
                      <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={cn(
                    "p-2 sm:p-3 rounded-lg border-2 transition-all duration-300 text-left",
                    selectedMetric === metric.key
                      ? "border-[#9df5c4] bg-[#9df5c4]/10"
                      : "border-zinc-700 bg-transparent hover:border-zinc-600"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="p-1.5 rounded"
                      style={{ backgroundColor: `${metric.color}20` }}
                    >
                      <div style={{ color: metric.color }} className="text-sm">
                        {metric.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-xs">
                        {metric.title}
                      </div>
                      <div className="text-gray-400 text-xs">
                        {metric.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        metric.change.type === "positive"
                          ? "text-[#9df5c4]"
                          : "text-[#ff6b6b]"
                      )}
                    >
                      {metric.change.value}
                    </span>
                    <span className="text-xs">
                      {metric.change.type === "positive" ? "↗" : "↘"}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile Conversion Indicators */}
            <div className="mt-4 space-y-2">
              {conversionRates.map((rate, index) => (
                <FadeUp
                  key={`${rate.from}-${rate.to}`}
                  delay={0.3 + index * 0.05}
                >
                  <div className="flex items-center justify-center space-x-3 p-2 bg-[#2a2a2a] border border-zinc-700 rounded-lg">
                    <span className="text-white text-xs font-medium capitalize">
                      {rate.from.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#9df5c4]" />
                    <span className="text-white text-xs font-medium capitalize">
                      {rate.to.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="bg-[#9df5c4]/20 px-2 py-1 rounded-full">
                      <span className="text-[#9df5c4] font-semibold text-xs">
                        {rate.rate}%
                      </span>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Wave Chart */}
      <FadeUp delay={0.2}>
        <div className="bg-[#0f0f0f] rounded-xl p-3 sm:p-6 h-64 sm:h-80">
          {selectedMetric === "summary" ? (
            // Show all metrics when summary is selected - NO overlapping legends
            <div className="relative w-full h-full">
              <MultiLineChart
                datasets={[
                  {
                    data: getPercentageChanges(data.pageVisits.trends),
                    color: "#64b5f6",
                    label: "Page Visits",
                  },
                  {
                    data: getPercentageChanges(data.calls.trends),
                    color: "#ffd700",
                    label: "Calls",
                  },
                  {
                    data: getPercentageChanges(data.revenue.trends),
                    color: "#ff6b6b",
                    label: "Revenue",
                  },
                ]}
                labels={chartLabels}
                className="w-full h-full"
              />

              {/* Single Clean Legend for Summary */}
              <div className="absolute top-4 right-4 bg-[#1a1a1a]/80 backdrop-blur-sm border border-zinc-700 rounded-lg p-3 space-y-2">
                {[
                  { label: "Page Visits", color: "#64b5f6" },
                  { label: "Calls", color: "#ffd700" },
                  { label: "Revenue", color: "#ff6b6b" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Show individual metric
            <AnalyticsLineChart
              data={getPercentageChanges(data[selectedMetric].trends)}
              labels={chartLabels}
              color={
                metrics.find((m) => m.key === selectedMetric)?.color ||
                "#9df5c4"
              }
              className="w-full h-full"
            />
          )}
        </div>
      </FadeUp>

      {/* Chart Info */}
      <FadeUp delay={0.3}>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#64b5f6] rounded-full"></div>
              <span>Page Visits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#ffd700] rounded-full"></div>
              <span>Calls</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-1 bg-[#ff6b6b] rounded-full"></div>
              <span>Revenue</span>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
