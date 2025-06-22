"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export type FilterPeriod =
  | "current_month"
  | "last_3_months"
  | "last_6_months"
  | "last_12_months";

interface DateFilterProps {
  onFilterChange: (period: FilterPeriod) => void;
  defaultPeriod?: FilterPeriod;
}

const filterOptions = [
  {
    value: "current_month" as FilterPeriod,
    label: "Current Month",
  },
  {
    value: "last_3_months" as FilterPeriod,
    label: "Last 3 Months",
  },
  {
    value: "last_6_months" as FilterPeriod,
    label: "Last 6 Months",
  },
  {
    value: "last_12_months" as FilterPeriod,
    label: "Last 12 Months",
  },
];

export default function DateFilter({
  onFilterChange,
  defaultPeriod = "current_month",
}: DateFilterProps) {
  const [selectedPeriod, setSelectedPeriod] =
    useState<FilterPeriod>(defaultPeriod);
  const [isOpen, setIsOpen] = useState(false);

  const handlePeriodChange = (period: FilterPeriod) => {
    setSelectedPeriod(period);
    onFilterChange(period);
    setIsOpen(false);
  };

  const selectedOption = filterOptions.find(
    (option) => option.value === selectedPeriod
  );

  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-400 mb-2 block">
        Time Period
      </label>

      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full min-w-[200px] px-4 py-3 
          bg-zinc-800/50 border border-zinc-700 rounded-xl
          text-white text-left text-sm
          hover:border-accent-mint/40 hover:bg-zinc-800/70
          focus:outline-none focus:ring-2 focus:ring-accent-mint/50
          transition-all duration-200
          flex items-center justify-between gap-3
        "
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-accent-mint" />
          <span className="font-medium">{selectedOption?.label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
          absolute top-full left-0 right-0 mt-2 z-50
          bg-zinc-800 border border-zinc-700 rounded-xl
          shadow-xl shadow-black/20
          overflow-hidden
        "
        >
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handlePeriodChange(option.value)}
              className={`
                w-full px-4 py-3 text-left text-sm
                transition-all duration-150
                flex items-center gap-3
                ${
                  selectedPeriod === option.value
                    ? "bg-accent-mint/20 text-accent-mint border-l-2 border-accent-mint"
                    : "text-gray-300 hover:text-white hover:bg-zinc-700/50"
                }
              `}
            >
              <span className="font-medium">{option.label}</span>
              {selectedPeriod === option.value && (
                <div className="ml-auto w-2 h-2 bg-accent-mint rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
