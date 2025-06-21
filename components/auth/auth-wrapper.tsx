"use client";

import { useState, useEffect, ReactNode } from "react";
import { AuthModal } from "./auth-modal";

interface AuthWrapperProps {
  children: ReactNode;
}

const AUTH_KEY = "admin123"; // In production, this would be more secure
const STORAGE_KEY = "dashboard-auth";

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user was previously authenticated
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setIsInitializing(false);
  }, []);

  const handleAuthenticate = async (key: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (key === AUTH_KEY) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      // You could add error handling here
      alert("Invalid authentication key");
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Show loading state during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#9df5c4]/30 border-t-[#9df5c4] rounded-full animate-spin" />
      </div>
    );
  }

  // Show auth modal if not authenticated
  if (!isAuthenticated) {
    return (
      <AuthModal onAuthenticate={handleAuthenticate} isLoading={isLoading} />
    );
  }

  // Render protected content with logout functionality
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Add logout functionality to the context if needed */}
      <div data-auth-logout={handleLogout}>{children}</div>
    </div>
  );
}
