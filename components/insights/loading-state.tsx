import { FadeUp } from "@/components/animations/fade-up";
import { Brain } from "lucide-react";

export function LoadingState() {
  return (
    <FadeUp>
      <div className="bg-[#1a1a1a] border border-zinc-700 rounded-2xl p-6 sm:p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#9df5c4]/20 rounded-2xl mb-4 sm:mb-6">
          <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-[#9df5c4] animate-pulse" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
          Analyzing Your Data...
        </h2>

        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
          Our AI is processing your funnel metrics and generating insights
        </p>

        <div className="flex justify-center space-x-1 mb-3 sm:mb-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#9df5c4] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        <div className="text-xs sm:text-sm text-gray-500">
          This usually takes 5-10 seconds...
        </div>
      </div>
    </FadeUp>
  );
}
