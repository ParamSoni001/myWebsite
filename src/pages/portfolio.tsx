import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import { Separator } from "@/components/ui/separator";
import { Code, Database, Server } from "lucide-react";

const PortfolioPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

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

  // Java code snippets for background
  const javaSnippets = [
    "public class Project {",
    "  private String title;",
    "  private String description;",
    "  private List<String> technologies;",
    "  public Project(String title) {",
    "    this.title = title;",
    "  }",
    "}",
    "@Entity",
    "public class Database {",
    "  @Id",
    "  private Long id;",
    "  private String name;",
    "}",
    "Connection conn = DriverManager.getConnection(url);",
    "PreparedStatement stmt = conn.prepareStatement(sql);",
  ];

  // Staggered animation for text elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  // Floating icons
  const icons = [
    { Icon: Code, delay: 0, x: -100, y: 100 },
    { Icon: Database, delay: 1.5, x: 100, y: -80 },
    { Icon: Server, delay: 3, x: -80, y: -120 },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 overflow-hidden relative">
      {/* Background code snippets */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
        {javaSnippets.map((snippet, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute text-black font-mono text-sm"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            }}
            transition={{
              opacity: {
                duration: Math.random() * 10 + 15,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 20,
              },
              y: {
                duration: Math.random() * 20 + 30,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 20,
              },
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #ff0000 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.05, 0.03],
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, #ff0000 0%, transparent 70%)`,
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
          opacity: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
          background: {
            duration: 0.5,
          },
        }}
      />

      {/* Floating icons */}
      {icons.map(({ Icon, delay, x, y }, index) => (
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
          <Icon size={60} />
        </motion.div>
      ))}

      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-y-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="mb-12 md:mb-16"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div className="overflow-hidden">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 inline-block"
              variants={itemVariants}
              style={{
                background: "linear-gradient(135deg, #000000 0%, #ff0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 10px 30px rgba(220, 38, 38, 0.2)",
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 15px 40px rgba(220, 38, 38, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              Portfolio
            </motion.h1>
          </motion.div>

          <motion.div className="overflow-hidden">
            <motion.p
              className="text-lg text-gray-600 max-w-3xl"
              variants={itemVariants}
            >
              A collection of my projects showcasing my skills and expertise in
              Java development, database design, and web applications. Each
              project represents a unique challenge and demonstrates different
              aspects of my technical abilities.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8">
            <Separator className="bg-gradient-to-r from-red-200 to-gray-200 h-0.5 rounded-full" />
          </motion.div>
        </motion.div>

        {/* Project Grid Component with enhanced animation */}
        <motion.div
          variants={itemVariants}
          className="relative z-10"
          style={{ perspective: 1000 }}
        >
          <ProjectGrid />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-red-50 opacity-20 z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ filter: "blur(40px)" }}
      />

      <motion.div
        className="absolute top-40 left-10 w-20 h-20 rounded-full bg-red-100 opacity-20 z-0"
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -10, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ filter: "blur(30px)" }}
      />
    </div>
  );
};

export default PortfolioPage;
