import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import HeroSection from "./home/HeroSection";

type HomeProps = {
  title?: string;
  name?: string;
  role?: string;
};

const Home = ({
  title = "PORTFOLIO",
  name = "Param Soni",
  role = "Software Engineer",
}: HomeProps) => {
  return (
    <div className="min-h-screen w-full bg-white overflow-y-auto">
      <Helmet>
        <title>{name} | Portfolio</title>
        <meta name="description" content={`${name} - ${role} Portfolio`} />
      </Helmet>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection title={title} name={name} role={role} />
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
