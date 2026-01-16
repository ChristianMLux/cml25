"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(63,94,251,0.08) 0%, rgba(70,252,208,0.04) 100%)",
        }}
      />

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r mix-blend-normal"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 60 + 40}px)`,
            background:
              i % 2 === 0
                ? "linear-gradient(to right, rgba(59, 130, 246, 0.08), rgba(20, 184, 166, 0.06))"
                : "linear-gradient(to right, rgba(20, 184, 166, 0.06), rgba(59, 130, 246, 0.08))",
            opacity: 0.8,
            willChange: "transform",
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            scale: [1, Math.random() * 0.4 + 0.8, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.01) 0%, rgba(15, 23, 42, 0.02) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      <motion.div
        className="absolute top-1/4 right-1/4 rounded-full"
        style={{
          width: "20vw",
          height: "20vw",
          filter: "blur(100px)",
          background: "rgba(59, 130, 246, 0.05)",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 rounded-full"
        style={{
          width: "25vw",
          height: "25vw",
          filter: "blur(120px)",
          background: "rgba(20, 184, 166, 0.05)",
          willChange: "transform, opacity",
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
