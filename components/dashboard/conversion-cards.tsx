"use client";

import { FadeUp } from "@/components/animations/fade-up";
import { ArrowRight } from "lucide-react";

interface ConversionCard {
  fromStage: string;
  toStage: string;
  fromValue: number;
  toValue: number;
  conversionRate: number;
  fromIcon: React.ReactNode;
  toIcon: React.ReactNode;
}

interface ConversionCardsProps {
  conversion: ConversionCard | null;
  position?: { x: number; y: number };
}

export function ConversionCards({
  conversion,
  position,
}: ConversionCardsProps) {
  if (!conversion) return null;

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position?.x || 0,
        top: position?.y || 0,
        transform: "translate(-50%, -120%)",
      }}
    >
      <FadeUp>
        <div className="flex items-center gap-4">
          {/* From Card */}
          <div className="bg-[#1a1a1a] border border-[#9df5c4]/30 rounded-xl p-4 min-w-[140px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#9df5c4]/20 rounded-lg flex items-center justify-center text-[#9df5c4] text-sm">
                {conversion.fromIcon}
              </div>
              <div className="text-[#9df5c4] font-semibold text-sm">
                {conversion.fromStage}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatValue(conversion.fromValue)}
            </div>
          </div>

          {/* Arrow with conversion rate */}
          <div className="flex flex-col items-center">
            <div className="bg-[#9df5c4] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-bold mb-1">
              {conversion.conversionRate.toFixed(1)}%
            </div>
            <ArrowRight className="text-[#9df5c4] w-6 h-6" />
          </div>

          {/* To Card */}
          <div className="bg-[#1a1a1a] border border-[#9df5c4]/30 rounded-xl p-4 min-w-[140px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-[#9df5c4]/20 rounded-lg flex items-center justify-center text-[#9df5c4] text-sm">
                {conversion.toIcon}
              </div>
              <div className="text-[#9df5c4] font-semibold text-sm">
                {conversion.toStage}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatValue(conversion.toValue)}
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
