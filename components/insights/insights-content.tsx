import { FadeUp } from "@/components/animations/fade-up";
import { FilterPeriod } from "@/components/dashboard/date-filter";
import { ArrowLeft, Download, Share2 } from "lucide-react";

interface InsightsContentProps {
  insights: string;
  onBack: () => void;
  period: FilterPeriod;
}

export function InsightsContent({
  insights,
  onBack,
  period,
}: InsightsContentProps) {
  const periodLabels = {
    current_month: "Current Month",
    last_3_months: "Last 3 Months",
    last_6_months: "Last 6 Months",
    last_12_months: "Last 12 Months",
  };

  // Simple markdown-like rendering
  const renderInsights = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let key = 0;

    for (const line of lines) {
      key++;

      if (line.startsWith("# ")) {
        elements.push(
          <h1
            key={key}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-[#9df5c4] mb-4 sm:mb-6 mt-6 sm:mt-8 first:mt-0"
          >
            {line.replace("# ", "")}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2
            key={key}
            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 mt-6 sm:mt-8 first:mt-0"
          >
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3
            key={key}
            className="text-base sm:text-lg md:text-xl font-semibold text-[#9df5c4] mb-2 sm:mb-3 mt-4 sm:mt-6"
          >
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.startsWith("- ")) {
        elements.push(
          <li
            key={key}
            className="text-gray-300 text-sm sm:text-base mb-2 ml-4"
          >
            {formatText(line.replace("- ", ""))}
          </li>
        );
      } else if (line.trim() === "---") {
        elements.push(
          <hr key={key} className="border-zinc-700 my-6 sm:my-8" />
        );
      } else if (line.trim() !== "") {
        elements.push(
          <p
            key={key}
            className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed"
          >
            {formatText(line)}
          </p>
        );
      }
    }

    return elements;
  };

  const formatText = (text: string) => {
    // Handle bold text **text**
    return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-bold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <FadeUp>
      <div className="bg-[#1a1a1a] border border-zinc-700 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-zinc-700 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#9df5c4] hover:text-[#7de3a0] transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Overview
              </button>
              <div className="hidden sm:block w-px h-6 bg-zinc-700" />
              <span className="text-gray-400 text-xs sm:text-sm">
                Analysis for {periodLabels[period]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors text-xs sm:text-sm">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 max-h-[70vh] overflow-y-auto">
          <div className="prose prose-invert prose-green max-w-none">
            {renderInsights(insights)}
          </div>
        </div>
      </div>
    </FadeUp>
  );
}
