"use client";

import { motion } from "framer-motion";

export const AmbientLightWrapper = () => {
  return (
    <>
      {/* Top Left Pulsing Ambient Light — fixed to viewport */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-[1] pointer-events-none -translate-x-1/3 -translate-y-1/3"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(74, 222, 128, 0.3) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Bottom Right Pulsing Ambient Light — fixed to viewport */}
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] z-[1] pointer-events-none translate-x-1/3 translate-y-1/3"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(74, 222, 128, 0.3) 0%, transparent 65%)`,
          filter: "blur(60px)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </>
  );
};
