import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ContactForm from "../components/contact/ContactForm";
import SocialLinks from "../components/contact/SocialLinks";
import { Toaster } from "../components/ui/toaster";
import {
  Mail,
  MapPin,
  MessageSquare,
  Send,
  AtSign,
  Phone,
  Linkedin,
  Github,
} from "lucide-react";

const ContactPage = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    hidden: { opacity: 0, y: 20 },
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

  // Floating particles for background
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Floating icons
  const icons = [
    { Icon: Mail, delay: 0, x: -150, y: 100, size: 40 },
    { Icon: AtSign, delay: 1.5, x: 150, y: -120, size: 45 },
    { Icon: Send, delay: 3, x: -100, y: -150, size: 40 },
    { Icon: Phone, delay: 2, x: 120, y: 150, size: 45 },
    { Icon: Linkedin, delay: 2.5, x: -180, y: -50, size: 40 },
    { Icon: Github, delay: 1, x: 180, y: 50, size: 40 },
  ];

  return (
    <div className="min-h-screen bg-white overflow-y-auto pt-20 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-red-500"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
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
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-red-100"
          style={{ filter: "blur(120px)" }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
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
          className="absolute bottom-40 left-20 w-64 h-64 rounded-full bg-blue-50"
          style={{ filter: "blur(80px)" }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

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

      <main
        className="container mx-auto px-4 py-16 max-w-6xl relative z-10"
        ref={ref}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 inline-block"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #ff0000 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 10px 30px rgba(220, 38, 38, 0.1)",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Let's Connect
            </motion.h1>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={containerVariants}
              className="flex flex-col space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <motion.span
                    className="inline-block mr-2 text-red-500"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <MessageSquare size={24} />
                  </motion.span>
                  Contact Information
                </h2>
                <div className="space-y-4 text-gray-600">
                  <motion.p
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="mr-2 h-5 w-5 text-red-500" />
                    <span className="font-medium mr-2">Email:</span>{" "}
                    itsparamsoni@gmail.com
                  </motion.p>
                  <motion.p
                    className="flex items-center"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MapPin className="mr-2 h-5 w-5 text-red-500" />
                    <span className="font-medium mr-2">Location:</span> India
                  </motion.p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4">Connect with me</h2>
                <SocialLinks className="justify-start" />
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md border border-gray-100"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-medium mb-3 text-gray-800">
                  Looking for collaboration?
                </h3>
                <p className="text-gray-600 mb-4">
                  I'm currently available for freelance work and open to
                  discussing new opportunities.
                </p>
                <p className="text-gray-600">
                  Feel free to reach out if you're looking for a developer with
                  expertise in Java and database technologies.
                </p>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} style={{ perspective: 1000 }}>
              <motion.div
                whileHover={{ rotateY: 5, rotateX: 5 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Toaster />

      {/* Decorative elements */}
      <motion.div
        className="fixed bottom-10 right-10 opacity-20 z-0 pointer-events-none"
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
          <path
            d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z"
            stroke="rgba(220, 38, 38, 0.5)"
            strokeWidth="2"
          />
          <path d="M1 9H23" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="2" />
          <path d="M5 15H13" stroke="rgba(220, 38, 38, 0.5)" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
};

export default ContactPage;
