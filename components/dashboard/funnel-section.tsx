"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { FunnelWaveChart } from "@/components/dashboard/charts";
import { ConversionCards } from "@/components/dashboard/conversion-cards";
import { Youtube, Users, Phone, CheckCircle, Shield, Star } from "lucide-react";

export function FunnelSection() {
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

  const funnelData = [
    {
      stage: "YouTube Views",
      value: 27500,
      displayValue: "27.5k",
      icon: <Youtube />,
    },
    {
      stage: "Page Visits",
      value: 1200,
      displayValue: "1.2k",
      icon: <Users />,
    },
    {
      stage: "Calls Booked",
      value: 53,
      displayValue: "53",
      icon: <Phone />,
    },
    {
      stage: "Calls Accepted",
      value: 30,
      displayValue: "30",
      icon: <CheckCircle />,
    },
    {
      stage: "Show-ups",
      value: 26,
      displayValue: "26",
      icon: <Shield />,
    },
    {
      stage: "Closes",
      value: 7,
      displayValue: "7",
      icon: <Star />,
    },
  ];

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
