import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

type CertificationCardProps = {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  certificationUrl: string;
  onClick?: () => void;
};

const CertificationCard = ({
  title = "Oracle Certified Professional Java SE11 Developer",
  issuer = "Oracle",
  date = "April 2024",
  imageUrl = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  certificationUrl = "https://catalog-education.oracle.com/ords/certview/sharebadge?id=AB1CBB48460B50E194663E42509D3D74FCCE2635A711CC8936AAEA2811B1BF96",
  onClick = () => {},
}: CertificationCardProps) => {
  const handleClick = () => {
    window.open(certificationUrl, "_blank");
    onClick();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden h-full cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
        onClick={handleClick}
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
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">{issuer}</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
            <ExternalLink className="h-5 w-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CertificationCard;
