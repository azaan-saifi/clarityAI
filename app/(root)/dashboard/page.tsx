import { FadeUp } from "@/components/animations/fade-up";
import { MetricCard } from "@/components/dashboard/metric-card";
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

export default function Dashboard() {
  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-start mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#9df5c4] to-[#7de3a0] bg-clip-text text-transparent mb-4">
            Hello, Azaan
          </h1>
          <p className="text-gray-400 text-lg">
            Get real-time insights. Make smarter decisions.
          </p>
        </FadeUp>

        {/* First Row - 4 Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FadeUp delay={0.1}>
            <MetricCard
              title="YouTube Views"
              value={3781}
              change={{ value: "+12.5%", type: "positive" }}
              icon={<Youtube />}
              size="small"
              className="h-60"
            >
              <LineChart
                data={[1200, 1450, 1800, 2100, 2400, 3781]}
                labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
              />
            </MetricCard>
          </FadeUp>

          <FadeUp delay={0.2}>
            <MetricCard
              title="Website Visitors"
              value={159133}
              change={{ value: "+8.3%", type: "positive" }}
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
              value={1247}
              change={{ value: "+15.2%", type: "positive" }}
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
              value={1089}
              change={{ value: "87.3%", type: "positive" }}
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
              value="73.2%"
              change={{
                value: "-2.1%",
                type: "negative",
                label: "from last month",
              }}
              icon={<Shield />}
            >
              <StatGrid
                stats={[
                  { value: 797, label: "Showed Up" },
                  { value: 292, label: "No Show" },
                ]}
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
              value={342}
              change={{ value: "42.9%", type: "positive", label: "close rate" }}
              icon={<Star />}
            >
              <StatGrid
                stats={[
                  { value: 198, label: "High-ticket" },
                  { value: 144, label: "Discount" },
                ]}
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
              value="$1,247,890"
              change={{
                value: "+23.7%",
                type: "positive",
                label: "from last month",
              }}
              icon={<TrendingUp />}
              size="large"
            >
              {/* Revenue Split */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-[#9df5c4]/10 border border-[#9df5c4]/20 rounded-lg">
                  <div className="text-2xl font-bold text-[#9df5c4] mb-1">
                    $847,320
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Full Payment
                  </div>
                </div>
                <div className="text-center p-4 bg-[#9df5c4]/10 border border-[#9df5c4]/20 rounded-lg">
                  <div className="text-2xl font-bold text-[#9df5c4] mb-1">
                    $400,570
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Installments
                  </div>
                </div>
              </div>

              {/* Product List */}
              <div className="space-y-2">
                {[
                  { name: "Premium Course", revenue: "$687,450" },
                  { name: "Coaching Program", revenue: "$342,180" },
                  { name: "Masterclass", revenue: "$156,890" },
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
        <FunnelSection />
      </div>
    </div>
  );
}
