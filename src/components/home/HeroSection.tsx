import React from "react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  title?: string;
  name?: string;
  role?: string;
};

const HeroSection = ({
  title = "PORTFOLIO",
  name = "Param Soni",
  role = "Software Engineer",
}: HeroSectionProps) => {
  return (
    <section className="relative w-full h-[902px] flex items-center justify-center bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[10%] bg-gradient-to-br from-red-100 via-white to-red-50"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      {/* Animated 3D grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 0%, white 70%)",
            backgroundSize: "100% 100%",
            zIndex: 1,
          }}
        />
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <motion.rect
            width="100%"
            height="100%"
            fill="none"
            stroke="rgba(220, 38, 38, 0.1)"
            strokeWidth="1"
            strokeDasharray="10,10"
            animate={{ strokeDashoffset: [0, 100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0"
              y1={`${(i + 1) * 10}%`}
              x2="100%"
              y2={`${(i + 1) * 10}%`}
              stroke="rgba(220, 38, 38, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${(i + 1) * 10}%`}
              y1="0"
              x2={`${(i + 1) * 10}%`}
              y2="100%"
              stroke="rgba(220, 38, 38, 0.1)"
              strokeWidth="1"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </svg>
      </div>

      {/* Animated spotlight effect */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-red-50 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Main content container with 3D effect */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Portfolio text with 3D effect */}
        <motion.div
          className="relative"
          initial={{ perspective: 1000 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-8xl font-bold tracking-wider"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #ff0000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 10px 30px rgba(220, 38, 38, 0.2)",
            }}
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          >
            {title}
          </motion.h1>

          {/* Animated underline */}
          <motion.div
            className="h-1 bg-gradient-to-r from-black to-red-600 mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Animated subtitle */}
        <motion.p
          className="mt-8 text-xl text-gray-600 text-center max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Showcasing expertise in Java development and database technologies
        </motion.p>
      </motion.div>

      {/* Name and title with reveal effect */}
      <motion.div
        className="absolute bottom-16 left-16 z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <h2 className="text-3xl font-medium text-gray-800">{name}</h2>
        <div className="relative overflow-hidden h-8 mt-1">
          <motion.p
            className="text-xl text-gray-600 absolute"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
          >
            {role}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
