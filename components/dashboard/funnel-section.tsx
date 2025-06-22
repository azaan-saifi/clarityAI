"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { FunnelWaveChart } from "@/components/dashboard/charts";
import { ConversionCards } from "@/components/dashboard/conversion-cards";
import { Youtube, Users, Phone, CheckCircle, Shield, Star } from "lucide-react";
import { Video } from "@/lib/actions/youtube";
import { FilterPeriod } from "./date-filter";
import { calculateViewsByPeriod } from "@/lib/utils/youtube-filter";

interface FunnelSectionProps {
  videos: Video[];
  selectedPeriod: FilterPeriod;
}

export function FunnelSection({ videos, selectedPeriod }: FunnelSectionProps) {
  const [hoveredConversion, setHoveredConversion] = useState<{
    fromStage: string;
    toStage: string;
    fromValue: number;
    toValue: number;
    conversionRate: number;
    fromIcon: React.ReactNode;
    toIcon: React.ReactNode;
  } | null>(null);

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Get real YouTube views based on selected period
  const youtubeViews = calculateViewsByPeriod(videos, selectedPeriod);

  // Mock data for other funnel stages (you can replace with real data later)
  const rawFunnelData = [
    { stage: "YouTube Views", value: youtubeViews, icon: <Youtube /> },
    {
      stage: "Page Visits",
      value: Math.floor(youtubeViews * 0.044),
      icon: <Users />,
    }, // ~4.4% conversion
    {
      stage: "Calls Booked",
      value: Math.floor(youtubeViews * 0.002),
      icon: <Phone />,
    }, // ~0.2% conversion
    {
      stage: "Calls Accepted",
      value: Math.floor(youtubeViews * 0.0011),
      icon: <CheckCircle />,
    }, // ~0.11% conversion
    {
      stage: "Show-ups",
      value: Math.floor(youtubeViews * 0.0009),
      icon: <Shield />,
    }, // ~0.09% conversion
    {
      stage: "Closes",
      value: Math.floor(youtubeViews * 0.0003),
      icon: <Star />,
    }, // ~0.03% conversion
  ];

  // Calculate conversion percentages for chart display
  const funnelData = rawFunnelData.map((item, index) => {
    if (index === 0) {
      // First stage shows 100% (starting point)
      return {
        ...item,
        value: 100,
        displayValue: `${item.value.toLocaleString()}`,
        rawValue: item.value,
      };
    } else {
      // Calculate conversion rate from previous stage
      const conversionRate =
        rawFunnelData[index - 1].value > 0
          ? (item.value / rawFunnelData[index - 1].value) * 100
          : 0;

      return {
        ...item,
        value: conversionRate,
        displayValue: `${item.value.toLocaleString()} (${conversionRate.toFixed(
          1
        )}%)`,
        rawValue: item.value,
      };
    }
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="mt-12" onMouseMove={handleMouseMove}>
      <FadeUp delay={0.8}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#9df5c4] to-[#7de3a0] bg-clip-text text-transparent mb-2">
            Sales Funnel Overview
          </h2>
          <p className="text-gray-400 text-lg">
            Track your complete customer journey from YouTube to revenue
          </p>
        </div>
      </FadeUp>

      <FadeUp delay={0.9}>
        <div className="bg-[#1a1a1a] border border-zinc-700 rounded-2xl p-8 hover:border-[#9df5c4]/30 transition-all duration-300 hover:shadow-glowLarge hover:-translate-y-2">
          <div className="h-96">
            <FunnelWaveChart data={funnelData} onHover={setHoveredConversion} />
          </div>
        </div>
      </FadeUp>

      {/* Conversion Cards Overlay */}
      <ConversionCards
        conversion={hoveredConversion}
        position={mousePosition}
      />
    </div>
  );
}
