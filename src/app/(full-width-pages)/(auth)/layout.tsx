import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-screen bg-[#26A69A]">
      <ThemeProvider>
        <div className="flex items-center justify-center w-full h-full">
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
