import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { Navbar } from "@/components/navbar/navbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthWrapper>
      <div className="min-h-screen bg-[#0f0f0f]">
        <Navbar />
        {children}
      </div>
    </AuthWrapper>
  );
};

export default layout;
