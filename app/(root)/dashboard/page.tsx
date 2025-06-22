"use client";

import { useState, useEffect } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { MetricCard } from "@/components/dashboard/metric-card";
import DateFilter, { FilterPeriod } from "@/components/dashboard/date-filter";
import {
  LineChart,
  BarChart,
  DoughnutChart,
  StackedBarChart,
  ProgressBar,
} from "@/components/dashboard/charts";
import { StatGrid } from "@/components/dashboard/stat-grid";
import { FunnelSection } from "@/components/dashboard/funnel-section";
import {
  Youtube,
  Users,
  Phone,
  CheckCircle,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import { getVideosInfo, Video } from "@/lib/actions/youtube.actions";
import {
  calculateViewsByPeriod,
  getChartData,
  calculateDashboardMetrics,
} from "@/lib/utils/youtube-filter";

export default function Dashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedPeriod, setSelectedPeriod] =
    useState<FilterPeriod>("current_month");
  const [youtubeViews, setYoutubeViews] = useState(0);
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [dashboardMetrics, setDashboardMetrics] = useState<ReturnType<
    typeof calculateDashboardMetrics
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const videoData = await getVideosInfo();
        setVideos(videoData);
        setYoutubeViews(calculateViewsByPeriod(videoData, selectedPeriod));
        setChartData(getChartData(videoData, selectedPeriod));
        setDashboardMetrics(
          calculateDashboardMetrics(videoData, selectedPeriod)
        );
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      setYoutubeViews(calculateViewsByPeriod(videos, selectedPeriod));
      setChartData(getChartData(videos, selectedPeriod));
      setDashboardMetrics(calculateDashboardMetrics(videos, selectedPeriod));
    }
  }, [selectedPeriod, videos]);

  const handleFilterChange = (period: FilterPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section - Made Responsive */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8 lg:mb-12">
          <FadeUp className="text-start">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#9df5c4] to-[#7de3a0] bg-clip-text text-transparent mb-4">
              Hello, Azaan
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-lg">
              Get real-time insights. Make smarter decisions.
            </p>
          </FadeUp>

          {/* Filter Component - Made Responsive */}
          <FadeUp delay={0.1} className="w-full lg:min-w-[200px] lg:w-auto">
            <div className="bg-primary-dark border border-zinc-700 rounded-xl p-4">
              <DateFilter
                onFilterChange={handleFilterChange}
                defaultPeriod={selectedPeriod}
              />
            </div>
          </FadeUp>
        </div>

        {isLoading ? (
          /* Shimmer Loading State */
          <FadeUp>
            <div className="space-y-8">
              {/* First Row - 4 Small Cards Shimmer */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-6 animate-pulse h-60"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-zinc-700 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-zinc-700 rounded w-24 mb-2"></div>
                        <div className="h-6 bg-zinc-700 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="h-32 bg-zinc-700 rounded-lg"></div>
                  </div>
                ))}
              </div>

              {/* Second Row - 3 Cards Shimmer */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-6 animate-pulse"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-zinc-700 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-zinc-700 rounded w-32 mb-2"></div>
                        <div className="h-8 bg-zinc-700 rounded w-20"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {index === 2 ? (
                        /* Funnel Chart Shimmer */
                        <div className="space-y-3">
                          <div className="h-4 bg-zinc-700 rounded"></div>
                          <div className="h-4 bg-zinc-700 rounded w-5/6"></div>
                          <div className="h-4 bg-zinc-700 rounded w-4/6"></div>
                          <div className="h-4 bg-zinc-700 rounded w-3/6"></div>
                          <div className="h-4 bg-zinc-700 rounded w-2/6"></div>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center p-3 bg-zinc-700/30 rounded-lg">
                              <div className="h-6 bg-zinc-700 rounded w-12 mx-auto mb-2"></div>
                              <div className="h-3 bg-zinc-700 rounded w-16 mx-auto"></div>
                            </div>
                            <div className="text-center p-3 bg-zinc-700/30 rounded-lg">
                              <div className="h-6 bg-zinc-700 rounded w-12 mx-auto mb-2"></div>
                              <div className="h-3 bg-zinc-700 rounded w-16 mx-auto"></div>
                            </div>
                          </div>
                          <div className="h-20 bg-zinc-700 rounded-lg"></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        ) : (
          <>
            {/* First Row - 4 Small Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <FadeUp delay={0.1}>
                <MetricCard
                  title="YouTube Views"
                  value={isLoading ? "Loading..." : youtubeViews}
                  icon={<Youtube />}
                  size="small"
                  className="h-60"
                >
                  <LineChart
                    data={chartData.data.length > 0 ? chartData.data : [0]}
                    labels={
                      chartData.labels.length > 0
                        ? chartData.labels
                        : ["No Data"]
                    }
                  />
                </MetricCard>
              </FadeUp>

              <FadeUp delay={0.2}>
                <MetricCard
                  title="Website Visitors"
                  value={
                    isLoading
                      ? "Loading..."
                      : dashboardMetrics?.websiteVisitors || 0
                  }
                  icon={<Users />}
                  size="small"
                  className="h-60"
                >
                  <BarChart
                    data={[18500, 22300, 19800, 25600, 28900, 24200, 21400]}
                    labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
                  />
                </MetricCard>
              </FadeUp>

              <FadeUp delay={0.3}>
                <MetricCard
                  title="Calls Booked"
                  value={
                    isLoading
                      ? "Loading..."
                      : dashboardMetrics?.callsBooked || 0
                  }
                  icon={<Phone />}
                  size="small"
                  className="h-60"
                >
                  <ProgressBar percentage={78} />
                </MetricCard>
              </FadeUp>

              <FadeUp delay={0.4}>
                <MetricCard
                  title="Calls Accepted"
                  value={
                    isLoading
                      ? "Loading..."
                      : dashboardMetrics?.callsAccepted || 0
                  }
                  icon={<CheckCircle />}
                  size="small"
                  className="h-60"
                >
                  <DoughnutChart percentage={87.3} />
                </MetricCard>
              </FadeUp>
            </div>

            {/* Second Row - 3 Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Show-up Rate Card */}
              <FadeUp delay={0.5}>
                <MetricCard
                  title="Show-up Rate"
                  value={
                    isLoading
                      ? "Loading..."
                      : `${dashboardMetrics?.showUpRate.toFixed(1) || 0}%`
                  }
                  icon={<Shield />}
                >
                  <StatGrid
                    stats={
                      dashboardMetrics?.showUpStats || [
                        { value: 0, label: "Showed Up" },
                        { value: 0, label: "No Show" },
                      ]
                    }
                  />
                  <LineChart
                    data={[78.5, 75.2, 71.8, 73.2]}
                    labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                    color="#ff6b6b"
                  />
                </MetricCard>
              </FadeUp>

              {/* Closes Card */}
              <FadeUp delay={0.6}>
                <MetricCard
                  title="Closes"
                  value={
                    isLoading ? "Loading..." : dashboardMetrics?.closes || 0
                  }
                  icon={<Star />}
                >
                  <StatGrid
                    stats={
                      dashboardMetrics?.closesStats || [
                        { value: 0, label: "High-ticket" },
                        { value: 0, label: "Discount" },
                      ]
                    }
                  />
                  <StackedBarChart
                    data={{
                      primary: [45, 52, 48, 53],
                      secondary: [32, 38, 35, 39],
                    }}
                    labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                  />
                </MetricCard>
              </FadeUp>

              {/* Revenue Breakdown Card */}
              <FadeUp delay={0.7}>
                <MetricCard
                  title="Revenue Breakdown"
                  value={
                    isLoading
                      ? "Loading..."
                      : `$${
                          dashboardMetrics?.totalRevenue.toLocaleString() || 0
                        }`
                  }
                  icon={<TrendingUp />}
                  size="large"
                >
                  {/* Revenue Split */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-[#9df5c4]/10 border border-[#9df5c4]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#9df5c4] mb-1">
                        ${dashboardMetrics?.pifRevenue.toLocaleString() || 0}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        Full Payment
                      </div>
                    </div>
                    <div className="text-center p-4 bg-[#9df5c4]/10 border border-[#9df5c4]/20 rounded-lg">
                      <div className="text-2xl font-bold text-[#9df5c4] mb-1">
                        $
                        {dashboardMetrics?.installmentRevenue.toLocaleString() ||
                          0}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        Installments
                      </div>
                    </div>
                  </div>

                  {/* Product List */}
                  <div className="space-y-2">
                    {[
                      {
                        name: "Premium Course",
                        revenue: `$${Math.floor(
                          (dashboardMetrics?.totalRevenue || 0) * 0.55
                        ).toLocaleString()}`,
                      },
                      {
                        name: "Coaching Program",
                        revenue: `$${Math.floor(
                          (dashboardMetrics?.totalRevenue || 0) * 0.275
                        ).toLocaleString()}`,
                      },
                      {
                        name: "Masterclass",
                        revenue: `$${Math.floor(
                          (dashboardMetrics?.totalRevenue || 0) * 0.175
                        ).toLocaleString()}`,
                      },
                    ].map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-zinc-700 last:border-b-0"
                      >
                        <span className="text-sm text-white font-medium">
                          {product.name}
                        </span>
                        <span className="text-sm text-[#9df5c4] font-semibold">
                          {product.revenue}
                        </span>
                      </div>
                    ))}
                  </div>
                </MetricCard>
              </FadeUp>
            </div>

            {/* Third Section - Sales Funnel Wave Chart */}
            <FunnelSection videos={videos} selectedPeriod={selectedPeriod} />
          </>
        )}
      </div>
    </div>
  );
}
