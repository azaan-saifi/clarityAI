"use client";

import { FadeUp } from "@/components/animations/fade-up";
import {
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightsCallToActionProps {
  onGenerate: () => void;
}

export function AIInsightsCallToAction({
  onGenerate,
}: AIInsightsCallToActionProps) {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Analysis",
      description: "AI-powered insights from your funnel data",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Opportunities",
      description: "Identify bottlenecks and optimization areas",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Actionable Recommendations",
      description: "Get specific steps to improve conversions",
    },
  ];

  return (
    <div className="relative">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#9df5c4] via-[#7de3a0]/10 to-[#9df5c4] rounded-3xl blur-3xl transform scale-95"></div>

      {/* Main Content */}
      <div className="relative bg-[#1a1a1a] border border-zinc-700 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#9df5c4]/20 rounded-2xl mb-4 sm:mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#9df5c4]" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              Unlock AI-Powered
              <span className="block text-[#9df5c4]">Business Insights</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
              Transform your funnel data into actionable strategies. Get
              personalized recommendations to boost conversions and accelerate
              your revenue growth.
            </p>
          </div>
        </FadeUp>

        {/* Features Grid */}
        <FadeUp delay={0.1}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#0f0f0f] border border-zinc-700 rounded-xl p-4 sm:p-6 text-center hover:border-[#9df5c4]/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#9df5c4]/20 rounded-xl mb-3 sm:mb-4">
                  <div className="text-[#9df5c4] text-base sm:text-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* CTA Button */}
        <FadeUp delay={0.2}>
          <div className="text-center">
            <button
              onClick={onGenerate}
              className={cn(
                "group relative inline-flex items-center justify-center",
                "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold",
                "bg-gradient-to-r from-[#9df5c4] to-[#7de3a0]",
                "text-[#1a1a1a] rounded-xl",
                "transition-all duration-300",
                "hover:shadow-lg hover:shadow-[#9df5c4]/25",
                "hover:transform hover:scale-105",
                "active:scale-95",
                "w-full sm:w-auto"
              )}
            >
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:animate-pulse" />
              Get AI Insights
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeUp>

        {/* Bottom Info */}
        <FadeUp delay={0.3}>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-700">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9df5c4] rounded-full"></div>
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9df5c4] rounded-full"></div>
                <span>Custom Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9df5c4] rounded-full"></div>
                <span>Performance Tracking</span>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
