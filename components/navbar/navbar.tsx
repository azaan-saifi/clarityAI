"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle2Icon } from "lucide-react";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { cn } from "@/lib/utils";

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "videos", label: "Videos", href: "/videos" },
  { id: "analytics", label: "Analytics", href: "/analytics" },
  { id: "insights", label: "Insights", href: "/insights" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          ? "bg-[#0f0f0f]/80 backdrop-blur-md border-b border-b-zinc-700"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-8">
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
                quality={50}
              />
            </div>
          </Link>

          {/* Desktop Menu Items - Center */}
          <div className="hidden lg:flex items-center justify-center -ml-10">
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
                      "relative px-3 sm:px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
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
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <UserCircle2Icon className="w-8 h-8 text-[#9df5c4] font-light" />
            <p className="text-[#9df5c4] font-light">Azaan</p>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-zinc-700">
            <div className="flex flex-col space-y-2 mt-4">
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200",
                    pathname.startsWith(item.href)
                      ? "text-[#1a1a1a] bg-[#9df5c4] font-semibold"
                      : "text-gray-300 bg-[#1a1a1a]/30 hover:bg-[#9df5c4]/10 hover:text-[#9df5c4]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
