import { FadeUp } from "@/components/animations/fade-up";
import { AIInsightsCallToAction } from "@/components/insights/ai-insights-cta";

export default function Insights() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <AIInsightsCallToAction />
        </FadeUp>
      </div>
    </div>
  );
}
