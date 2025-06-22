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

export function AIInsightsCallToAction() {
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
      <div className="relative bg-[#1a1a1a] border border-zinc-700 rounded-2xl p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#9df5c4]/20 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-[#9df5c4]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Unlock AI-Powered
              <span className="block text-[#9df5c4]">Business Insights</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Transform your funnel data into actionable strategies. Get
              personalized recommendations to boost conversions and accelerate
              your revenue growth.
            </p>
          </div>
        </FadeUp>

        {/* Features Grid */}
        <FadeUp delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[#0f0f0f] border border-zinc-700 rounded-xl p-6 text-center hover:border-[#9df5c4]/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#9df5c4]/20 rounded-xl mb-4">
                  <div className="text-[#9df5c4]">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* CTA Button */}
        <FadeUp delay={0.2}>
          <button
            className={cn(
              "group relative inline-flex items-center justify-center",
              "px-8 py-4 text-lg font-semibold",
              "bg-gradient-to-r from-[#9df5c4] to-[#7de3a0]",
              "text-[#1a1a1a] rounded-xl",
              "transition-all duration-300",
              "hover:shadow-lg hover:shadow-[#9df5c4]/25",
              "hover:transform hover:scale-105",
              "active:scale-95"
            )}
          >
            <Lightbulb className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Get AI Insights
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeUp>

        {/* Bottom Info */}
        <FadeUp delay={0.3}>
          <div className="mt-8 pt-6 border-t border-zinc-700">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
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
