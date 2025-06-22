"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle2Icon, Menu, X } from "lucide-react";
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
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
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 relative z-50"
            >
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/clarityAI.png"
                  alt="ClarityAI"
                  width={150}
                  height={150}
                  className="object-contain"
                  quality={100}
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
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Info - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-2">
                <UserCircle2Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#9df5c4] font-light" />
                <p className="text-[#9df5c4] font-light text-sm sm:text-base">
                  Azaan
                </p>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden relative z-50 p-2 rounded-lg bg-[#1a1a1a] border border-zinc-700 text-[#9df5c4] hover:bg-[#9df5c4]/10 transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={cn(
                      "absolute inset-0 w-6 h-6 transition-all duration-300",
                      isMobileMenuOpen
                        ? "opacity-0 rotate-180"
                        : "opacity-100 rotate-0"
                    )}
                  />
                  <X
                    className={cn(
                      "absolute inset-0 w-6 h-6 transition-all duration-300",
                      isMobileMenuOpen
                        ? "opacity-100 rotate-0"
                        : "opacity-0 -rotate-180"
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0f0f0f] border-l border-zinc-700 transform transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-700">
            <div className="flex items-center gap-3">
              <UserCircle2Icon className="w-8 h-8 text-[#9df5c4]" />
              <div>
                <p className="text-[#9df5c4] font-semibold">Azaan</p>
                <p className="text-xs text-gray-400">Dashboard User</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col p-6 space-y-2">
            {MENU_ITEMS.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "group relative px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 transform",
                  "hover:scale-105 active:scale-95",
                  pathname.startsWith(item.href)
                    ? "text-[#1a1a1a] bg-[#9df5c4] font-semibold shadow-lg shadow-[#9df5c4]/25"
                    : "text-gray-300 bg-[#1a1a1a]/30 hover:bg-[#9df5c4]/10 hover:text-[#9df5c4] border border-zinc-700/50 hover:border-[#9df5c4]/30"
                )}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isMobileMenuOpen
                    ? `slideInFromRight 0.4s ease-out forwards`
                    : "none",
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {pathname.startsWith(item.href) && (
                    <div className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-[#1a1a1a]/30 border border-zinc-700/50 rounded-xl">
              <p className="text-xs text-gray-400 text-center">
                ClarityAI Dashboard v2.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom keyframes for mobile menu animation */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
