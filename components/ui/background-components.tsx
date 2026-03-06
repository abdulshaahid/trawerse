"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = ({ className, children }: { className?: string, children?: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  return (
   <div className={cn("min-h-screen w-full relative", className)}>
  {/* Soft Green Glow */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, rgba(74, 222, 128, 0.175) 0%, transparent 65%)
      `,
    }}
  />
     {children}
</div>
  );
};
