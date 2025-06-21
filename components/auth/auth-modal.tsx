"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { FadeUp } from "../animations/fade-up";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  onAuthenticate?: (key: string) => void;
  isLoading?: boolean;
}

export function AuthModal({
  onAuthenticate,
  isLoading = false,
}: AuthModalProps) {
  const [authKey, setAuthKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authKey.trim() && onAuthenticate) {
      onAuthenticate(authKey.trim());
    }
  };

  const isButtonDisabled = !authKey.trim() || isLoading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <FadeUp delay={0.1} className="w-full max-w-md mx-4">
        <div className="relative">
          {/* Shiny top border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#9df5c4] to-transparent shadow-[0_0_10px_rgba(157,245,196,0.5)]" />

          {/* Main card */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 shadow-2xl">
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-gradient-to-br from-[#9df5c4]/20 to-[#7de3a0]/20 border border-[#9df5c4]/30">
                <Lock className="w-6 h-6 text-[#9df5c4]" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                Admin Access Required
              </h1>
              <p className="text-sm text-gray-400">
                Please enter the authentication key to access the admin panel
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="auth-key"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Authentication Key
                </label>
                <input
                  id="auth-key"
                  type="password"
                  value={authKey}
                  onChange={(e) => setAuthKey(e.target.value)}
                  placeholder="Enter your access key"
                  className={cn(
                    "w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-zinc-700",
                    "text-white placeholder-gray-500 focus:outline-none focus:ring-2",
                    "focus:ring-[#9df5c4]/50 focus:border-[#9df5c4]/50 transition-all duration-200",
                    "hover:border-zinc-600"
                  )}
                  disabled={isLoading}
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isButtonDisabled}
                className={cn(
                  "w-full cursor-pointer py-3 px-4 rounded-lg font-medium transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-[#9df5c4]/50",
                  isButtonDisabled
                    ? "bg-[#1a1a1a] text-gray-400 border border-zinc-700 cursor-not-allowed"
                    : "bg-[#9df5c4] text-[#1a1a1a] hover:bg-[#7de3a0] hover:shadow-lg hover:shadow-[#9df5c4]/20 hover:-translate-y-0.5 active:scale-[0.98]"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#1a1a1a]/30 border-t-[#1a1a1a] rounded-full animate-spin mr-2" />
                    Authenticating...
                  </div>
                ) : (
                  "Authenticate"
                )}
              </button>
            </form>

            {/* Footer text */}
            <p className="text-xs text-gray-500 text-center mt-6">
              If you don&apos;t have access, please contact your administrator
            </p>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
