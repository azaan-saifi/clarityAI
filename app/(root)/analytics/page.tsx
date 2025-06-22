import { FadeUp } from "@/components/animations/fade-up";
import { AnalyticsWaveChart } from "@/components/analytics/analytics-wave-chart";

// Mock analytics data - in real app this would come from API
const analyticsData = {
  summary: {
    title: "All Metrics",
    value: "100%",
    change: {
      value: "+12.5%",
      type: "positive" as const,
      label: "vs last month",
    },
    trends: [85, 90, 88, 95, 100, 105, 110, 108, 112, 115, 118, 122],
  },
  pageVisits: {
    title: "Page Visits",
    value: 824200,
    change: {
      value: "+19.1%",
      type: "positive" as const,
      label: "vs last 30 days",
    },
    trends: [
      680000, 720000, 750000, 780000, 800000, 810000, 790000, 805000, 815000,
      820000, 824000, 824200,
    ],
  },
  calls: {
    title: "Calls",
    value: 311000,
    change: {
      value: "+9.3%",
      type: "positive" as const,
      label: "vs last 30 days",
    },
    trends: [
      280000, 285000, 290000, 295000, 300000, 305000, 308000, 310000, 309000,
      310500, 310800, 311000,
    ],
  },
  revenue: {
    title: "Revenue",
    value: 80000,
    change: {
      value: "+152.0%",
      type: "positive" as const,
      label: "vs last 30 days",
    },
    trends: [
      32000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
      78000, 80000,
    ],
  },
};

export default function Analytics() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6">
      <div className="max-w-7xl mx-auto space-y-8 lg:px-6">
        {/* Header */}
        <FadeUp>
          <div className="text-start mb-12">
            <h1 className="text-4xl font-bold text-[#9df5c4] mb-4">
              Analytics Dashboard
            </h1>
            <p className="text-gray-400 text-lg">
              Track your funnel performance and conversion trends
            </p>
          </div>
        </FadeUp>

        {/* Wave Chart Section */}
        <FadeUp delay={0.2}>
          <AnalyticsWaveChart data={analyticsData} />
        </FadeUp>
      </div>
    </div>
  );
}
