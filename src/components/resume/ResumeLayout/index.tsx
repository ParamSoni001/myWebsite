import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Code, Languages } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

interface SkillItem {
  name: string;
  level?: string;
}

interface LanguageItem {
  name: string;
  proficiency: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ResumeLayoutProps {
  education?: EducationItem[];
  skills?: SkillItem[];
  languages?: LanguageItem[];
  experience?: ExperienceItem[];
}

const ResumeLayout = ({
  education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Example University",
      year: "2018-2022",
    },
    {
      degree: "Oracle Certified Professional Java SE11 Developer",
      institution: "Oracle",
      year: "2023",
    },
  ],
  skills = [
    { name: "IntelliJ Idea Community Edition" },
    { name: "MySQL Workbench" },
    { name: "Apache Tomcat" },
    { name: "Apache JMeter" },
    { name: "Java" },
    { name: "SQL" },
    { name: "HTML/CSS" },
    { name: "JavaScript" },
  ],
  languages = [
    { name: "English", proficiency: "Professional" },
    { name: "Hindi", proficiency: "Native" },
  ],
  experience = [
    {
      title: "Software Engineer Intern",
      company: "Tech Solutions Inc.",
      period: "May 2022 - Aug 2022",
      description:
        "Developed and maintained Java applications. Collaborated with senior developers on database optimization projects.",
    },
    {
      title: "Java Developer Trainee",
      company: "Code Academy",
      period: "Jan 2022 - Apr 2022",
      description:
        "Participated in intensive Java training program. Built several projects using Java SE11 features and database connectivity.",
    },
    {
      title: "Web Development Intern",
      company: "Digital Creations",
      period: "Jun 2021 - Aug 2021",
      description:
        "Assisted in developing responsive web applications. Gained experience with front-end technologies and basic back-end integration.",
    },
  ],
}: ResumeLayoutProps) => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-12 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Resume</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Education & Skills */}
          <div className="md:col-span-1 space-y-8">
            {/* Education Section */}
            <Card className="p-6 shadow-md bg-white">
              <div className="flex items-center mb-4">
                <GraduationCap className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Education
                </h2>
              </div>
              <div className="space-y-4">
                {education.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <h3 className="font-medium text-gray-900">{item.degree}</h3>
                    <p className="text-sm text-gray-600">{item.institution}</p>
                    <p className="text-sm text-gray-500">{item.year}</p>
                    {index < education.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Skills Section */}
            <Card className="p-6 shadow-md bg-white">
              <div className="flex items-center mb-4">
                <Code className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-gray-50 text-gray-800"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Languages Section */}
            <Card className="p-6 shadow-md bg-white">
              <div className="flex items-center mb-4">
                <Languages className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Languages
                </h2>
              </div>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-800">{language.name}</span>
                    <span className="text-gray-600 text-sm">
                      {language.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Experience */}
          <div className="md:col-span-2">
            <Card className="p-6 shadow-md bg-white">
              <div className="flex items-center mb-6">
                <Briefcase className="mr-2 h-5 w-5 text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Professional Experience
                </h2>
              </div>
              <div className="space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 text-lg">
                        {item.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium">{item.company}</p>
                    <p className="text-gray-600">{item.description}</p>
                    {index < experience.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeLayout;
