import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";

// Default mock data for development without Supabase
const mockCertifications = [
  {
    id: "1",
    title: "Oracle Certified Professional Java SE11 Developer",
    issuer: "Oracle University",
    date: "April 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    certificationUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=AB1CBB48460B50E194663E42509D3D74FCCE2635A711CC8936AAEA2811B1BF96",
    created_at: new Date().toISOString(),
  },
];

const mockProjects = [
  {
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
    link: "https://example.com/project1",
    codeLink: "https://github.com/example/project1",
    created_at: new Date().toISOString(),
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
    created_at: new Date().toISOString(),
  },
];

// Create a single supabase client for the entire app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set (for development/preview)
let supabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not found. Using mock client with sample data.",
  );
  // Create a mock client that returns predefined mock data
  supabaseClient = {
    from: (table: string) => ({
      select: () => ({
        order: () =>
          Promise.resolve({
            data:
              table === "certifications"
                ? mockCertifications
                : table === "projects"
                  ? mockProjects
                  : [],
            error: null,
          }),
      }),
      insert: () => Promise.resolve({ error: null }),
    }),
  } as any;
} else {
  try {
    supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client initialized successfully");
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    // Fallback to mock client if initialization fails
    supabaseClient = {
      from: (table: string) => ({
        select: () => ({
          order: () =>
            Promise.resolve({
              data:
                table === "certifications"
                  ? mockCertifications
                  : table === "projects"
                    ? mockProjects
                    : [],
              error: null,
            }),
        }),
        insert: () => Promise.resolve({ error: null }),
      }),
    } as any;
  }
}

export const supabase = supabaseClient;

// Helper functions for common operations
export async function fetchCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching certifications:", error);
    return [];
  }

  return data || [];
}

export async function fetchProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

export async function submitContactForm(formData: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_messages").insert([formData]);

  if (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }

  return { success: true };
}
