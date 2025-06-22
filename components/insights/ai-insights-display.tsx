"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/fade-up";
import { FilterPeriod } from "@/components/dashboard/date-filter";
import { generateAIInsights } from "@/lib/actions/ai-insights.actions";
import { getInsightsData } from "@/lib/actions/insights.actions";
import { LoadingState } from "./loading-state";
import { InsightsContent } from "./insights-content";
import { AIInsightsCallToAction } from "./ai-insights-cta";

interface AIInsightsDisplayProps {
  period: FilterPeriod;
}

export function AIInsightsDisplay({ period }: AIInsightsDisplayProps) {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getInsightsData(period);
      const aiInsights = await generateAIInsights(data);
      setInsights(aiInsights);
    } catch (err) {
      console.error("Error generating insights:", err);
      setError("Failed to generate insights. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToOverview = () => {
    setInsights(null);
    setError(null);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <FadeUp>
        <div className="bg-[#1a1a1a] border border-red-500/20 rounded-2xl p-8 text-center">
          <div className="text-red-400 text-lg font-semibold mb-4">{error}</div>
          <button
            onClick={handleGenerateInsights}
            className="bg-[#9df5c4] text-[#1a1a1a] px-6 py-2 rounded-lg font-semibold hover:bg-[#7de3a0] transition-colors"
          >
            Try Again
          </button>
        </div>
      </FadeUp>
    );
  }

  if (insights) {
    return (
      <InsightsContent
        insights={insights}
        onBack={handleBackToOverview}
        period={period}
      />
    );
  }

  return <AIInsightsCallToAction onGenerate={handleGenerateInsights} />;
}
