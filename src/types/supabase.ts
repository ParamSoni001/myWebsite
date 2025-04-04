export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          date: string;
          imageUrl: string;
          certificationUrl: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          date: string;
          imageUrl: string;
          certificationUrl: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          date?: string;
          imageUrl?: string;
          certificationUrl?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          process: string;
          tools: string[];
          images: string[];
          link?: string;
          codeLink?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          process: string;
          tools: string[];
          images: string[];
          link?: string;
          codeLink?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          process?: string;
          tools?: string[];
          images?: string[];
          link?: string;
          codeLink?: string;
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
        };
      };
    };
  };
}
