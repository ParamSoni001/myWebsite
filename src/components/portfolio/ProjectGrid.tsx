import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";
import { fetchProjects } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  process: string;
  tools: string[];
  images: string[];
  link?: string;
  codeLink?: string;
};

type ProjectGridProps = {
  projects?: Project[];
};

const ProjectGrid = ({
  projects: initialProjects = [
    {
      id: "1",
      title: "Java Database Application",
      description:
        "A robust database application built with Java SE11 and MySQL",
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
      link: "https://example.com/project1",
      codeLink: "https://github.com/example/project1",
    },
    {
      id: "2",
      title: "RESTful API Service",
      description: "A scalable REST API built with Spring Boot and MongoDB",
      process:
        "Designed and implemented a RESTful API service following best practices for resource naming, HTTP methods, and status codes. Implemented authentication, rate limiting, and comprehensive documentation with Swagger.",
      tools: ["IntelliJ IDEA", "MongoDB", "Spring Boot", "Swagger"],
      images: [
        "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=800&q=80",
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
      ],
      link: "https://example.com/project2",
      codeLink: "https://github.com/example/project2",
    },
    {
      id: "3",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with Java backend and React frontend",
      process:
        "Built a complete e-commerce platform with user authentication, product catalog, shopping cart, and payment processing integration. Implemented responsive design and optimized performance for mobile devices.",
      tools: ["Java", "React", "MySQL", "Stripe API"],
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
        "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&q=80",
      ],
      link: "https://example.com/project3",
      codeLink: "https://github.com/example/project3",
    },
    {
      id: "4",
      title: "Data Analysis Dashboard",
      description:
        "Interactive data visualization dashboard using Java and D3.js",
      process:
        "Created a data analysis tool that processes large datasets and presents insights through interactive visualizations. Implemented filtering, sorting, and export capabilities for enhanced user experience.",
      tools: ["Java", "D3.js", "PostgreSQL", "Apache Spark"],
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80",
      ],
      link: "https://example.com/project4",
      codeLink: "https://github.com/example/project4",
    },
    {
      id: "5",
      title: "Mobile Banking App",
      description: "Secure mobile banking application with Java backend",
      process:
        "Developed a secure mobile banking application with features like account management, fund transfers, bill payments, and transaction history. Implemented multi-factor authentication and encryption for data security.",
      tools: ["Java", "Spring Security", "Oracle DB", "JWT"],
      images: [
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
      ],
      link: "https://example.com/project5",
      codeLink: "https://github.com/example/project5",
    },
    {
      id: "6",
      title: "Inventory Management System",
      description:
        "Enterprise inventory tracking system with barcode integration",
      process:
        "Built an inventory management system for tracking stock levels, orders, sales, and deliveries. Integrated barcode scanning functionality and implemented automated reordering based on configurable thresholds.",
      tools: ["Java", "JavaFX", "MySQL", "iText PDF"],
      images: [
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
      ],
      link: "https://example.com/project6",
      codeLink: "https://github.com/example/project6",
    },
  ],
}: ProjectGridProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        if (data && data.length > 0) {
          setProjects(data as Project[]);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch from Supabase if we have the URL and key
    if (
      import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      loadProjects();
    }
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  // Animation variants for the grid container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation variants for each grid item
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.images[0]}
                  onClick={() => handleProjectClick(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <ProjectDetail
          isOpen={!!selectedProject}
          onClose={handleCloseDetail}
          project={selectedProject}
        />
      )}
    </div>
  );
};

export default ProjectGrid;
