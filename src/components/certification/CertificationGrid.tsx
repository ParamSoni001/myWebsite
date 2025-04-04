import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CertificationCard from "./CertificationCard";
import { fetchCertifications } from "@/lib/supabase";

type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  certificationUrl: string;
};

type CertificationGridProps = {
  certifications?: Certification[];
};

const CertificationGrid = ({
  certifications: initialCertifications = [
    {
      id: "1",
      title: "Oracle Certified Professional Java SE11 Developer",
      issuer: "Oracle University",
      date: "October 2024",
      imageUrl: "https://i.imgur.com/3WfA99G.png",
      certificationUrl:
        "https://catalog-education.oracle.com/ords/certview/sharebadge?id=AB1CBB48460B50E194663E42509D3D74FCCE2635A711CC8936AAEA2811B1BF96",
    },
  ],
}: CertificationGridProps) => {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCertifications = async () => {
      try {
        setLoading(true);
        const data = await fetchCertifications();
        if (data && data.length > 0) {
          setCertifications(data as Certification[]);
        }
      } catch (error) {
        console.error("Error loading certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch from Supabase if we have the URL and key
    if (
      import.meta.env.VITE_SUPABASE_URL &&
      import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      loadCertifications();
    }
  }, []);

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
            {certifications.map((certification) => (
              <motion.div key={certification.id} variants={itemVariants}>
                <CertificationCard
                  title={certification.title}
                  issuer={certification.issuer}
                  date={certification.date}
                  imageUrl={certification.imageUrl}
                  certificationUrl={certification.certificationUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CertificationGrid;
