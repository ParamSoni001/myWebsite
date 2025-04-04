import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Define types for props
type ProfileSectionProps = {
  name?: string;
  title?: string;
  bio?: string[];
  certifications?: string[];
  interests?: string[];
  imageUrl?: string;
};

const ProfileSection = ({
  name = "Param Soni",
  title = "Software Engineer",
  bio = [
    "Curious and passionate, I am interested in various technologies, including Java and Database Connectivity.",
    "Technology is a field where logics meets strategy, and I am excited to work on real-world projects.",
    "This portfolio highlights my skills and proficiency in Java Standard Edition 11.",
  ],
  certifications = ["Oracle Certified Professional Java SE11 Developer"],
  interests = [
    "Java",
    "Database Connectivity",
    "Spring",
    "Spring Boot",
    "Supabase",
    "Amazon Web Services",
    "Application Testing",
    "Software Development",
  ],
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
}: ProfileSectionProps) => {
  // Debugging the props to ensure they're passed correctly
  console.log("ProfileSection Props", {
    name,
    title,
    bio,
    certifications,
    interests,
    imageUrl,
  });

  return (
    <div className="w-full min-h-[600px] bg-white p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-12 items-start"
        >
          {/* Left Content - Bio */}
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-5xl font-bold mb-6">Hello!</h1>
            <h2 className="text-2xl font-medium text-gray-800 mb-8">
              I am {name}, {certifications[0]}.
            </h2>

            <div className="space-y-4 text-gray-600">
              {bio.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <Separator className="my-8" />

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">
                Technical Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 order-1 md:order-2">
            <Card className="overflow-hidden shadow-lg rounded-lg">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={imageUrl}
                  alt={`${name} - ${title}`}
                  className="w-full h-auto object-cover aspect-[3/4] rounded-lg"
                />
              </motion.div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileSection;
