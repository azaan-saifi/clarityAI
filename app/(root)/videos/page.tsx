import { FadeUp } from "@/components/animations/fade-up";
import { VideoCard } from "@/components/videos/video-card";

// Video data based on the provided image
const videosData = [
  {
    id: "codebender-3",
    title: "Office Tour | A Day in the Life of a Software Engineer in NYC",
    thumbnail: "/codebender-3.avif",
    youtubeViews: 50000,
    publishedAt: "4 months ago",
    metrics: {
      pageVisits: 3200,
      revenue: 18500,
      callsBooked: 98,
      callsAccepted: 64,
      showUps: 58,
      closedDeals: 11,
      conversionRate: {
        viewsToPageVisits: 6.4,
        pageVisitsToBooked: 3.06,
        bookedToClosed: 11.22,
        viewsToClosed: 0.022,
      },
      revenuePerView: 0.37,
      revenuePaidInFull: 5.78,
      revenueInstallment: 12400,
    },
  },
  {
    id: "codebender-2",
    title: "Become a $120k+ AI Developer in 2025 (Free Course, 2 Hours)",
    thumbnail: "/codebender-2.avif",
    youtubeViews: 10000,
    publishedAt: "4 months ago",
    metrics: {
      pageVisits: 1850,
      revenue: 15200,
      callsBooked: 67,
      callsAccepted: 42,
      showUps: 39,
      closedDeals: 8,
      conversionRate: {
        viewsToPageVisits: 18.5,
        pageVisitsToBooked: 3.62,
        bookedToClosed: 11.94,
        viewsToClosed: 0.08,
      },
      revenuePerView: 1.52,
      revenuePaidInFull: 8.22,
      revenueInstallment: 12400,
    },
  },
  {
    id: "codebender-1",
    title: "How to Build Effective AI Agents in 2025 (without the hype)",
    thumbnail: "/codebender-1.avif",
    youtubeViews: 4500,
    publishedAt: "3 months ago",
    metrics: {
      pageVisits: 890,
      revenue: 8400,
      callsBooked: 32,
      callsAccepted: 19,
      showUps: 17,
      closedDeals: 4,
      conversionRate: {
        viewsToPageVisits: 19.8,
        pageVisitsToBooked: 3.6,
        bookedToClosed: 12.5,
        viewsToClosed: 0.089,
      },
      revenuePerView: 1.87,
      revenuePaidInFull: 9.44,
      revenueInstallment: 12400,
    },
  },
];

// Calculate ranking score (combination of page visits and revenue)
const rankedVideos = videosData
  .map((video) => ({
    ...video,
    rankingScore: video.metrics.pageVisits * 0.4 + video.metrics.revenue * 0.6,
  }))
  .sort((a, b) => b.rankingScore - a.rankingScore)
  .map((video, index) => ({ ...video, rank: index + 1 }));

export default function Videos() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <FadeUp>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Video Performance
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              Analyze the full funnel from views to revenue
            </p>
          </div>
        </FadeUp>

        {/* Videos List */}
        <div className="space-y-4 sm:space-y-6">
          {rankedVideos.map((video, index) => (
            <FadeUp key={video.id} delay={0.2 + index * 0.1}>
              <VideoCard video={video} />
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
