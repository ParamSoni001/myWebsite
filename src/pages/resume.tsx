import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import ResumeLayout from "@/components/resume/ResumeLayout";
import {
  Briefcase,
  GraduationCap,
  Languages,
  Code2,
  FileText,
  Award,
  Book,
  Cpu,
} from "lucide-react";

const ResumePage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e) => {
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

  // Education data
  const education = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "Swami Keshvanand Institute of Technology, Jaipur",
      year: "2021-2025",
    },
    {
      degree: "Intermediate",
      institution: "Shri Agrasen Public School, Jaipur",
      year: "2021",
    },
  ];

  // Skills data
  const skills = [
    { name: "IntelliJ Idea Community Edition" },
    { name: "Apache Tomcat" },
    { name: "Apache JMeter" },
    { name: "Core-Java" },
    { name: "Java Standard Edition 11" },
    { name: "MySQL" },
    { name: "MySQL Workbench" },
    { name: "Object Oriented Programming" },
  ];

  // Languages data
  const languages = [
    { name: "English", proficiency: "Professional" },
    { name: "Hindi", proficiency: "Native" },
  ];

  // Experience data
  const experience = [
    {
      title: "Trainee",
      company: "Oracle University",
      period: "April 2024 - November 2024",
      description:
        "• Completed a 6-month intensive training program under OEM Oracle, covering advanced Java SE 11 concepts and best practices.<br />Developed and strengthened skills in Java Standard Edition 11.<br />• Gained deep insights into core Java concepts and advanced features, which led to successfully clearing the Oracle Certified Professional Java SE11 Developer exam.<br />• Acquired a strong foundation in Object-Oriented Programming concepts and implementations.",
    },
    {
      title: "Java Developer Intern",
      company: "Cavisson Systems",
      period: "July 2023 - September 2023",
      description:
        "• Gained hands-on experience with Java Standard Edition 8 technologies, including AWT and Swing, by developing GUI components for interactive desktop applications.<br />•Designed and implemented user interface elements, improving application usability and responsiveness.<br />• Utilized Java Database Connectivity (JDBC) for data storage and retrieval, ensuring seamless integration with MySQL 8.2.0",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Floating icons - added more icons for enhanced visual effect
  const icons = [
    { Icon: Briefcase, delay: 0, x: -150, y: 100, size: 40 },
    { Icon: GraduationCap, delay: 1.5, x: 150, y: -120, size: 45 },
    { Icon: Languages, delay: 3, x: -100, y: -150, size: 40 },
    { Icon: Code2, delay: 2, x: 120, y: 150, size: 45 },
    { Icon: FileText, delay: 2.3, x: -180, y: -80, size: 38 },
    { Icon: Award, delay: 1.2, x: 180, y: 80, size: 42 },
    { Icon: Book, delay: 2.8, x: -120, y: 180, size: 36 },
    { Icon: Cpu, delay: 3.5, x: 140, y: -180, size: 40 },
  ];

  return (
    <div className="bg-white min-h-screen overflow-y-auto pt-20 relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1 }}
        >
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#000"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-red-100"
          style={{ filter: "blur(120px)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.08, 0.05],
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
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
          className="absolute top-40 left-20 w-64 h-64 rounded-full bg-blue-50"
          style={{ filter: "blur(80px)" }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.03, 0.07, 0.03],
            rotate: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-blue-50"
          style={{ filter: "blur(80px)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute bottom-60 right-40 w-72 h-72 rounded-full bg-red-50"
          style={{ filter: "blur(90px)" }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.02, 0.05, 0.02],
            rotate: [0, -20, 0],
          }}
          transition={{
            duration: 10,
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

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        <ResumeLayout
          education={education}
          skills={skills}
          languages={languages}
          experience={experience}
        />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="fixed bottom-10 right-10 opacity-30 z-0 pointer-events-none"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
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
          <path d="M20 6H4V8H20V6Z" fill="rgba(220, 38, 38, 0.5)" />
          <path d="M20 10H4V12H20V10Z" fill="rgba(220, 38, 38, 0.5)" />
          <path d="M20 14H4V16H20V14Z" fill="rgba(220, 38, 38, 0.5)" />
          <path d="M20 18H4V20H20V18Z" fill="rgba(220, 38, 38, 0.5)" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ResumePage;
