"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "videos", label: "Videos", href: "/videos" },
  { id: "analytics", label: "Analytics", href: "/analytics" },
  { id: "insights", label: "Insights", href: "/insights" },
];

const MONTHS = [
  { value: "2024-12", label: "December 2024" },
  { value: "2024-11", label: "November 2024" },
  { value: "2024-10", label: "October 2024" },
  { value: "2024-09", label: "September 2024" },
  { value: "2024-08", label: "August 2024" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current active menu item based on pathname
  const getActiveMenuId = () => {
    const currentItem = MENU_ITEMS.find((item) =>
      pathname.startsWith(item.href)
    );
    return currentItem?.id || "dashboard";
  };

  const handleMenuChange = (activeId: string | null) => {
    // Handle menu change if needed
    console.log("Active menu:", activeId);
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#0f0f0f]/80 backdrop-blur-md border-b"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/clarityAI.png"
                alt="ClarityAI"
                width={150}
                height={150}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Menu Items - Center */}
          <div
            className={cn(
              "flex items-center justify-center transition-all duration-300 gap-1",
              isScrolled
                ? "bg-[#1a1a1a] backdrop-blur-md border border-zinc-700 rounded-full px-2 py-1"
                : "bg-[#1a1a1a] backdrop-blur-sm border border-zinc-700 rounded-full px-2 py-1"
            )}
          >
            <AnimatedBackground
              defaultValue={getActiveMenuId()}
              onValueChange={handleMenuChange}
              className="rounded-full bg-[#9df5c4] border border-[#9df5c4]/30"
              transition={{
                type: "spring",
                bounce: 0.15,
                duration: 0.4,
              }}
              enableHover
            >
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  data-id={item.id}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
                    pathname.startsWith(item.href)
                      ? "text-[#1a1a1a] bg-[#9df5c4] font-semibold"
                      : "text-gray-300 hover:text-black"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </AnimatedBackground>
          </div>

          {/* Month Dropdown - Right */}
          <div className="relative">
            <button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                "bg-[#1a1a1a]/60 backdrop-blur-sm border border-white/10",
                "hover:bg-[#2a2a2a]/60 hover:border-white/20",
                "focus:outline-none focus:ring-2 focus:ring-[#9df5c4]/50"
              )}
            >
              <span className="text-sm font-medium text-white">
                {selectedMonth.label}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-gray-400 transition-transform duration-200",
                  isMonthDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isMonthDropdownOpen && (
              <div
                className={cn(
                  "absolute right-0 mt-2 w-56 py-2",
                  "bg-[#1a1a1a]/95 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl",
                  "animate-in fade-in slide-in-from-top-2 duration-200"
                )}
              >
                {MONTHS.map((month) => (
                  <button
                    key={month.value}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2 text-left text-sm transition-colors duration-150",
                      "hover:bg-[#9df5c4]/10 hover:text-[#9df5c4]",
                      selectedMonth.value === month.value
                        ? "text-[#9df5c4] bg-[#9df5c4]/10"
                        : "text-gray-300"
                    )}
                  >
                    {month.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isMonthDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMonthDropdownOpen(false)}
        />
      )}
    </nav>
  );
}
