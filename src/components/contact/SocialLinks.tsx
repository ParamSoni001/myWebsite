import React from "react";
import { Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface SocialLinksProps {
  links?: SocialLink[]; // Optional prop for links
  className?: string; // Optional className for styling
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links = [
    // Default value for links
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/param-soni-20024b226/",
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/ParamSoni001",
    },
  ],
  className = "",
}: SocialLinksProps) => {
  return (
    <div className={`flex items-center space-x-4 bg-white ${className}`}>
      <TooltipProvider>
        {links.map((link, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all"
                onClick={() => window.open(link.url, "_blank")}
                aria-label={link.name}
              >
                {link.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default SocialLinks;
