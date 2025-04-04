import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
};

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project showcasing the key features and technologies used.",
  imageUrl = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  onClick = () => {},
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden h-full cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
        onClick={onClick}
      >
        <AspectRatio ratio={4 / 3}>
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </AspectRatio>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            whileHover={{ opacity: 1, height: "auto" }}
            className="text-sm text-gray-600 overflow-hidden"
          >
            {description}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
