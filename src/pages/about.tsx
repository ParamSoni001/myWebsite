import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ProfileSection from "@/components/about/ProfileSection";
import { Helmet } from "react-helmet";
import {
  Code,
  Coffee,
  Database,
  Server,
  Cpu,
  Layers,
  GitBranch,
  Terminal,
} from "lucide-react";

export default function AboutPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

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

  // Particle animation setup - increased number of particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    color:
      i % 5 === 0
        ? "#ff0000"
        : i % 5 === 1
          ? "#000000"
          : i % 5 === 2
            ? "#ff6b6b"
            : i % 5 === 3
              ? "#ff3333"
              : "#990000",
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Floating icons - added more icons for enhanced visual effect
  const icons = [
    { Icon: Code, delay: 0, x: -150, y: 100, size: 40 },
    { Icon: Coffee, delay: 1.5, x: 150, y: -120, size: 45 },
    { Icon: Database, delay: 3, x: -100, y: -150, size: 50 },
    { Icon: Server, delay: 2, x: 120, y: 150, size: 45 },
    { Icon: Cpu, delay: 2.5, x: -180, y: -50, size: 40 },
    { Icon: Layers, delay: 1.8, x: 200, y: 80, size: 35 },
    { Icon: GitBranch, delay: 3.2, x: -220, y: 180, size: 42 },
    { Icon: Terminal, delay: 2.7, x: 180, y: -180, size: 38 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto relative">
      {/* Setting up the page metadata */}
      <Helmet>
        <title>About | Param Soni - Java Developer</title>
        <meta
          name="description"
          content="Learn more about Param Soni, Oracle Certified Professional Java SE11 Developer and Software Engineer."
        />
      </Helmet>

      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ y: parallaxY }}
      >
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: 0.1,
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              filter: "blur(1px)",
            }}
            animate={{
              x: [
                `${particle.x}%`,
                `${(particle.x + 10) % 100}%`,
                `${(particle.x - 5) % 100}%`,
                `${particle.x}%`,
              ],
              y: [
                `${particle.y}%`,
                `${(particle.y - 15) % 100}%`,
                `${(particle.y + 10) % 100}%`,
                `${particle.y}%`,
              ],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-red-50"
          style={{ filter: "blur(120px)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
          }}
          transition={{
            scale: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
            opacity: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            },
            x: { duration: 0.5 },
            y: { duration: 0.5 },
          }}
        />

        <motion.div
          className="absolute bottom-60 left-40 w-80 h-80 rounded-full bg-blue-50"
          style={{ filter: "blur(100px)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>

      {/* Floating icons */}
      {icons.map(({ Icon, delay, x, y, size }, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute text-red-500 opacity-10 z-0 pointer-events-none"
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

      {/* Main content */}
      <main className="pt-20 pb-16 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {/* Profile Section with dynamic data */}
          <ProfileSection
            name="Param Soni"
            title="Software Engineer"
            bio={[
              "Curious and passionate, I am interested in various technologies, including Java and Database Connectivity.",
              "Technology is where logic and strategy converge, and I am excited to apply my skills to real-world projects.",
              "This portfolio highlights my skills and proficiency in Java Standard Edition 11.",
            ]}
            certifications={[
              "Oracle Certified Professional Java SE11 Developer",
            ]}
            interests={[
              "Java",
              "Database Connectivity",
              "Spring",
              "Spring Boot",
              "Supabase",
              "Amazon Web Services",
              "MySQL",
              "Application Testing",
              "Software Architecture",
            ]}
            imageUrl="https://i.imgur.com/5LdZCnu.jpeg"
          />
        </motion.div>
      </main>

      {/* Decorative elements */}
      <motion.div
        className="fixed bottom-10 left-10 opacity-20 z-0 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="rgba(220, 38, 38, 0.5)"
          />
          <path
            d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
            fill="rgba(220, 38, 38, 0.5)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
