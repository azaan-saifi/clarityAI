"use client";

import { useState, useEffect } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { VideoCard } from "@/components/videos/video-card";
import DateFilter, { FilterPeriod } from "@/components/dashboard/date-filter";
import { getVideosInfo, Video } from "@/lib/actions/youtube";
import {
  calculateVideoMetrics,
  calculateViewsByPeriod,
} from "@/lib/utils/youtube-filter";

interface ProcessedVideo {
  id: string;
  title: string;
  thumbnail: string;
  youtubeViews: number;
  publishedAt: string;
  metrics: ReturnType<typeof calculateVideoMetrics>;
  rank: number;
  rankingScore: number;
}

export default function Videos() {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [selectedPeriod, setSelectedPeriod] =
    useState<FilterPeriod>("current_month");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all videos initially
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const rawVideos = await getVideosInfo();
        setAllVideos(rawVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Process and filter videos when period changes
  useEffect(() => {
    if (allVideos.length > 0) {
      const processVideos = () => {
        // Filter videos by selected period first
        const filteredVideos = allVideos.filter((video) => {
          const totalViews = calculateViewsByPeriod([video], selectedPeriod);
          return totalViews > 0; // Only include videos that have views in the selected period
        });

        // Process filtered videos and calculate metrics
        const processedVideos = filteredVideos
          .map((video: Video) => {
            const metrics = calculateVideoMetrics(video);
            return {
              id: video.video_id,
              title: video.title,
              thumbnail:
                video.thumbnail.length > 0
                  ? video.thumbnail[0].url
                  : "/placeholder-thumbnail.jpg",
              youtubeViews: video.view_count,
              publishedAt: video.published_at,
              metrics,
              rankingScore: 0, // Will be calculated next
              rank: 0, // Will be assigned after sorting
            };
          })
          // Sort by view count and take top 10
          .sort((a, b) => b.youtubeViews - a.youtubeViews)
          .slice(0, 10)
          // Calculate ranking score and assign ranks
          .map((video) => ({
            ...video,
            rankingScore:
              video.metrics.pageVisits * 0.4 + video.metrics.revenue * 0.6,
          }))
          .sort((a, b) => b.rankingScore - a.rankingScore)
          .map((video, index) => ({ ...video, rank: index + 1 }));

        setVideos(processedVideos);
      };

      processVideos();
    }
  }, [allVideos, selectedPeriod]);

  const handleFilterChange = (period: FilterPeriod) => {
    setSelectedPeriod(period);
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          <FadeUp>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#9df5c4]">
                Video Performance
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Analyze the full funnel from views to revenue
              </p>
            </div>
          </FadeUp>

          {/* Filter Component */}
          <FadeUp delay={0.1} className="lg:min-w-[200px]">
            <div className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-4">
              <DateFilter
                onFilterChange={handleFilterChange}
                defaultPeriod={selectedPeriod}
              />
            </div>
          </FadeUp>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-4 sm:space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] border border-zinc-700 rounded-xl p-6 animate-pulse"
              >
                <div className="flex gap-6">
                  <div className="w-40 h-32 bg-zinc-700 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
                    <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-zinc-700 rounded-lg"></div>
                      <div className="h-20 bg-zinc-700 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Videos List */
          <div className="space-y-4 sm:space-y-6">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <FadeUp key={video.id} delay={0.2 + index * 0.1}>
                  <VideoCard video={video} />
                </FadeUp>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No videos found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
