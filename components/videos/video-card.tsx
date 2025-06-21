"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  MousePointer,
  Phone,
  Target,
  DollarSign,
  Calendar,
} from "lucide-react";

interface VideoMetrics {
  pageVisits: number;
  revenue: number;
  callsBooked: number;
  callsAccepted: number;
  showUps: number;
  closedDeals: number;
  conversionRate: {
    viewsToPageVisits: number;
    pageVisitsToBooked: number;
    bookedToClosed: number;
    viewsToClosed: number;
  };
  revenuePerView: number;
  revenuePaidInFull: number;
  revenueInstallment: number;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeViews: number;
  publishedAt: string;
  metrics: VideoMetrics;
  rank: number;
  rankingScore: number;
}

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="bg-[#1a1a1a] border border-zinc-700 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#9df5c4]/30 hover:shadow-glowLarge">
      {/* Main Card Content */}
      <div className="p-4 sm:p-6">
        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Thumbnail with rank overlay */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-28">
              <div className="w-full h-full rounded-lg overflow-hidden bg-zinc-800">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              {/* Rank number overlay - positioned half outside */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-[#9df5c4] to-[#7de3a0] rounded-lg flex items-center justify-center shadow-lg border-2 border-[#1a1a1a]">
                <span className="text-[#1a1a1a] font-bold text-sm">
                  #{video.rank}
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-semibold text-white mb-3 text-center overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.title}
          </h3>

          {/* Views and Date */}
          <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(video.youtubeViews)}</span>
            </div>
            <span>•</span>
            <span>{video.publishedAt}</span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex sm:items-center gap-6">
          {/* Thumbnail with rank overlay */}
          <div className="flex-shrink-0">
            <div className="relative w-40 h-32 rounded-lg">
              <div className="w-full h-full rounded-xl overflow-hidden bg-zinc-800">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
                <div className="absolute rounded-lg inset-0 bg-black/20"></div>
              </div>
              {/* Rank number overlay - positioned half outside */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#9df5c4] to-[#7de3a0] rounded-lg flex items-center justify-center shadow-lg border-2 border-[#1a1a1a]">
                <span className="text-[#1a1a1a] font-bold text-lg">
                  #{video.rank}
                </span>
              </div>
            </div>
          </div>

          {/* Video Info & Metrics - Desktop */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-lg font-semibold text-white mb-2 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {video.title}
            </h3>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatNumber(video.youtubeViews)} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{video.publishedAt}</span>
              </div>
            </div>

            {/* Key Metrics Grid - Desktop */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointer className="w-4 h-4 text-[#9df5c4]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Page Visits
                  </span>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  {formatNumber(video.metrics.pageVisits)}
                </div>
                <div className="text-xs text-[#9df5c4] font-medium">
                  {video.metrics.conversionRate.viewsToPageVisits.toFixed(1)}%
                  from views
                </div>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-[#9df5c4]" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    Revenue
                  </span>
                </div>
                <div className="text-xl font-bold text-white mb-1">
                  {formatCurrency(video.metrics.revenue)}
                </div>
                <div className="text-xs text-[#9df5c4] font-medium">
                  ${video.metrics.revenuePerView.toFixed(2)} per view
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid - Mobile */}
        <div className="sm:hidden mt-4 grid grid-cols-2 gap-3">
          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
            <div className="flex items-center gap-2 mb-1">
              <MousePointer className="w-3 h-3 text-[#9df5c4]" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Visits
              </span>
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {formatNumber(video.metrics.pageVisits)}
            </div>
            <div className="text-xs text-[#9df5c4] font-medium">
              {video.metrics.conversionRate.viewsToPageVisits.toFixed(1)}%
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3 h-3 text-[#9df5c4]" />
              <span className="text-xs text-gray-400 uppercase tracking-wider">
                Revenue
              </span>
            </div>
            <div className="text-lg font-bold text-white mb-1">
              {formatCurrency(video.metrics.revenue)}
            </div>
            <div className="text-xs text-[#9df5c4] font-medium">
              ${video.metrics.revenuePerView.toFixed(2)}/view
            </div>
          </div>
        </div>

        {/* Show Details Button */}
        <div className="flex justify-center mt-4 sm:mt-6 pt-4 border-t border-zinc-700/50">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-[#9df5c4]/10 hover:bg-[#9df5c4]/20 border border-[#9df5c4]/30 hover:border-[#9df5c4]/50 rounded-lg text-[#9df5c4] font-medium transition-all duration-200 hover:transform hover:scale-105 text-sm sm:text-base"
          >
            <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-zinc-700/50 p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Funnel Metrics */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#9df5c4]" />
                Funnel Performance
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Views → Page Visits
                  </span>
                  <span className="text-[#9df5c4] font-semibold">
                    {video.metrics.conversionRate.viewsToPageVisits.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Page Visits → Calls
                  </span>
                  <span className="text-[#9df5c4] font-semibold">
                    {video.metrics.conversionRate.pageVisitsToBooked.toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Calls → Closes</span>
                  <span className="text-[#9df5c4] font-semibold">
                    {video.metrics.conversionRate.bookedToClosed.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Overall Conversion
                  </span>
                  <span className="text-[#9df5c4] font-bold">
                    {(video.metrics.conversionRate.viewsToClosed * 100).toFixed(
                      2
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Call Details */}
            <div className="space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#9df5c4]" />
                Call Performance
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Calls Booked</span>
                  <span className="text-white font-semibold">
                    {video.metrics.callsBooked}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Calls Accepted</span>
                  <span className="text-white font-semibold">
                    {video.metrics.callsAccepted}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Show-up Rate</span>
                  <span className="text-[#9df5c4] font-semibold">
                    {(
                      (video.metrics.showUps / video.metrics.callsAccepted) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Close Rate</span>
                  <span className="text-[#9df5c4] font-semibold">
                    {(
                      (video.metrics.closedDeals / video.metrics.showUps) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Analysis */}
            <div className="space-y-4 md:col-span-2 xl:col-span-1">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-[#9df5c4]" />
                Revenue Analysis
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">Total Revenue</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(video.metrics.revenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Revenue per View
                  </span>
                  <span className="text-[#9df5c4] font-semibold">
                    ${video.metrics.revenuePerView.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Revenue Paid In Full
                  </span>
                  <span className="text-[#9df5c4] font-semibold">
                    ${video.metrics.revenuePaidInFull.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-gray-400 text-sm">
                    Revenue Installment
                  </span>
                  <span className="text-[#9df5c4] font-semibold">
                    {formatCurrency(video.metrics.revenueInstallment)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
