"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { AIInsightsDisplay } from "@/components/insights/ai-insights-display";
import DateFilter, { FilterPeriod } from "@/components/dashboard/date-filter";

export default function Insights() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<FilterPeriod>("current_month");

  const handleFilterChange = (period: FilterPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="text-start">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9df5c4] mb-2">
                AI Insights
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Get AI-powered analysis of your funnel performance
              </p>
            </div>

            <div className="w-full lg:w-auto bg-[#1a1a1a] border border-zinc-700 rounded-xl p-4">
              <DateFilter
                onFilterChange={handleFilterChange}
                defaultPeriod={selectedPeriod}
              />
            </div>
          </div>
        </FadeUp>

        <AIInsightsDisplay period={selectedPeriod} />
      </div>
    </div>
  );
}
