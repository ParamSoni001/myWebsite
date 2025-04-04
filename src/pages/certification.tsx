import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import CertificationGrid from "@/components/certification/CertificationGrid";
import { Separator } from "@/components/ui/separator";
import { Helmet } from "react-helmet";
import { Award, Medal, Trophy, Scroll } from "lucide-react";

const CertificationPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Normalize coordinates to be between -0.5 and 0.5
      const normalizedX = (clientX / windowWidth - 0.5) * 2;
      const normalizedY = (clientY / windowHeight - 0.5) * 2;

      setMousePosition({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating animation for certification badges
  const floatingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Floating icons
  const icons = [
    { Icon: Award, delay: 0, x: -150, y: 100, size: 60 },
    { Icon: Medal, delay: 1.5, x: 150, y: -120, size: 50 },
    { Icon: Trophy, delay: 3, x: -100, y: -150, size: 55 },
    { Icon: Scroll, delay: 2, x: 120, y: 150, size: 65 },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 overflow-hidden relative">
      <Helmet>
        <title>Certifications | Param Soni - Java Developer</title>
        <meta
          name="description"
          content="View Param Soni's professional certifications including Oracle Certified Professional Java SE11 Developer."
        />
      </Helmet>

      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-10 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-red-200"
          style={{ filter: "blur(80px)" }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-blue-100"
          style={{ filter: "blur(60px)" }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <svg width="100%" height="100%" className="absolute inset-0 opacity-5">
          <pattern
            id="certPattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
            patternTransform="rotate(45)"
          >
            <motion.rect
              width="100"
              height="100"
              fill="none"
              stroke="rgba(220, 38, 38, 0.3)"
              strokeWidth="1"
              strokeDasharray="10,10"
              animate={{ strokeDashoffset: [0, 100] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#certPattern)" />
        </svg>
      </motion.div>

      {/* Floating icons */}
      {icons.map(({ Icon, delay, x, y, size }, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute text-red-500 opacity-10 z-0"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            filter: "blur(1px)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.1,
            scale: 1,
            y: [0, -15, 0, 15, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1, delay },
            scale: { duration: 1, delay },
            y: { duration: 10, repeat: Infinity, repeatType: "loop" },
            rotate: { duration: 15, repeat: Infinity, repeatType: "loop" },
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Oracle logo floating in background */}
      <motion.div
        className="absolute opacity-5 z-0 pointer-events-none"
        style={{
          left: "calc(50% - 100px)",
          top: "calc(50% - 100px)",
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0.03, 0.05, 0.03],
          scale: 1,
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          opacity: { duration: 8, repeat: Infinity, repeatType: "reverse" },
          scale: { duration: 1 },
          rotate: { duration: 20, repeat: Infinity, repeatType: "loop" },
        }}
      >
        <img
          src="https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png"
          alt="Oracle Logo"
          className="w-[200px] h-auto"
        />
      </motion.div>

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-y-auto relative z-10"
        variants={floatingVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="mb-12 md:mb-16"
          style={{ scale: headerScale }}
          variants={itemVariants}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 inline-block"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #ff0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 10px 30px rgba(220, 38, 38, 0.1)",
              }}
            >
              Certifications
            </motion.h1>

            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-red-500 to-red-300 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className="text-lg text-gray-600 max-w-3xl mt-6"
            variants={itemVariants}
          >
            Professional certifications that validate my expertise and knowledge
            in Java development and related technologies. Each certification
            represents my commitment to maintaining industry standards and best
            practices.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Separator className="mt-8 bg-gradient-to-r from-red-200 to-gray-200 h-0.5 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Certification Grid Component with enhanced animation */}
        <motion.div
          variants={itemVariants}
          className="relative z-10"
          style={{ perspective: 1000 }}
        >
          <CertificationGrid />
        </motion.div>
      </motion.div>

      {/* Floating badge icon */}
      <motion.div
        className="absolute bottom-10 right-10 opacity-10 z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6.5L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15Z"
            fill="rgba(220, 38, 38, 0.5)"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default CertificationPage;
