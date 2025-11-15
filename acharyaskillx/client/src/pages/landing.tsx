"use client";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AiInterviewSection from "@/components/ai-interview-section";
import DashboardPreview from "@/components/dashboard-preview";
import StatsSection from "@/components/stats-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

import { BookOpen, Users, Trophy, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FullstackImage from './Fullstack.jpeg';
import UIUX from './UIUX.jpeg';
import Data from './Datascience.jpeg';
import Analyst from './DataAnalist.jpeg';
import Frontend from './Frontend.jpeg';
import AIhack from './AIhack.jpeg';
import WebDev from './WebDev.jpeg';
import Market from './Market.jpeg';
import Cyber from './Cyber.jpeg';


export default function Landing() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "student") {
        navigate("/student-dashboard");
      } else if (user.role === "faculty") {
        navigate("/faculty-dashboard");
      } else if (user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />

        {/* Hero Section Text */}
        <section className="container flex flex-col items-center justify-center gap-6 py-20 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to AcharyaSkillX
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Explore courses, internships, and hackathons to upskill and grow your career.
          </motion.p>
        </section>

        {/* ================= Courses Section ================= */}
        <motion.div
          className="container px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Popular Courses</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: "UI/UX Design Fundamentals",
                description: "Master design principles and create stunning user experiences.",
                category: "Design",
                duration: "8 weeks",
                rating: "4.9",
                image: UIUX,
              },
              {
                id: 2,
                title: "Full Stack Web Development",
                description: "Learn React, Node.js, and databases to build real-world apps.",
                category: "Development",
                duration: "12 weeks",
                rating: "4.8",
                image: FullstackImage,
              },
              {
                id: 3,
                title: "Data Science & Machine Learning",
                description: "Hands-on Python, ML models, and AI projects.",
                category: "Data Science",
                duration: "10 weeks",
                rating: "4.7",
                image: Data,
              },
            ].map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Clock className="inline h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      <Button>Enroll Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= Internships Section ================= */}
        <motion.div
          className="container px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Internships</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: "Frontend Development Intern",
                description: "Work on React-based projects and improve UI/UX.",
                company: "TechSoft",
                duration: "3 months",
                image: Frontend,
              },
              {
                id: 2,
                title: "Data Analyst Intern",
                description: "Assist in data cleaning and visualization projects.",
                company: "DataWorks",
                duration: "2 months",
                image: Analyst,
              },
              {
                id: 3,
                title: "Marketing Intern",
                description: "Manage social media campaigns and SEO strategies.",
                company: "MarketHub",
                duration: "2 months",
                image: Market,
              },
            ].map((intern, index) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={intern.image} alt={intern.title} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{intern.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{intern.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{intern.company} · {intern.duration}</div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= Hackathons Section ================= */}
        <motion.div
          className="container px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Hackathons</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: 1,
                title: "AI Innovation Hackathon",
                description: "Build AI-powered solutions to solve real-world problems.",
                type: "48 hours",
                image: AIhack,
              },
              {
                id: 2,
                title: "Web Dev Challenge",
                description: "Showcase your frontend & backend skills in 36 hours.",
                type: "36 hours",
                image: WebDev,
              },
              {
                id: 3,
                title: "Cybersecurity CTF",
                description: "Compete in solving security puzzles and capture-the-flag challenges.",
                type: "24 hours",
                image: Cyber,
              },
            ].map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-lg overflow-hidden">
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={hackathon.image} alt={hackathon.title} className="h-full w-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{hackathon.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{hackathon.type}</div>
                      <Button>Register Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Keep the rest */}
        
        <AiInterviewSection />
        <DashboardPreview />
        <StatsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
