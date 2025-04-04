import React, { useState } from "react";
import { X, ExternalLink, Code, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tool = {
  name: string;
  icon: React.ReactNode;
};

type ProjectDetailProps = {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    process: string;
    tools: string[];
    images: string[];
    link?: string;
    codeLink?: string;
  };
};

const ProjectDetail = ({
  isOpen = true,
  onClose = () => {},
  project = {
    id: "1",
    title: "Java Database Application",
    description: "A robust database application built with Java SE11 and MySQL",
    process:
      "This project involved designing a normalized database schema, implementing JDBC connectivity, and creating a clean user interface for database operations. The application supports CRUD operations with transaction management and prepared statements for security.",
    tools: [
      "IntelliJ IDEA",
      "MySQL Workbench",
      "Apache Tomcat",
      "Apache JMeter",
    ],
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      "https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=800&q=80",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    ],
    link: "https://example.com/project",
    codeLink: "https://github.com/example/project",
  },
}: ProjectDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const toolIcons: Record<string, React.ReactNode> = {
    "IntelliJ IDEA": <Code size={18} />,
    "MySQL Workbench": <Layers size={18} />,
    "Apache Tomcat": <Code size={18} />,
    "Apache JMeter": <Layers size={18} />,
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />

            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white/50",
                    )}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {project.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
                  aria-label="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-colors hover:bg-white"
                  aria-label="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h2>
            <p className="mt-2 text-gray-600">{project.description}</p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Design Process
            </h3>
            <p className="mt-2 text-gray-600">{project.process}</p>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              Tools Used
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <div
                  key={tool}
                  className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {toolIcons[tool] && (
                    <span className="mr-1.5">{toolIcons[tool]}</span>
                  )}
                  {tool}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 flex gap-4">
              {project.link && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <ExternalLink size={16} />
                  View Project
                </Button>
              )}
              {project.codeLink && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => window.open(project.codeLink, "_blank")}
                >
                  <Code size={16} />
                  View Code
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
