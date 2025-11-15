import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Acharya from "./acharya.jpeg"; 
import bg2 from "./bg2.jpeg";    
import bg3 from "./bg3.jpeg";     
import bg4 from "./bg4.jpeg";     

export default function HeroSection() {
  const [, navigate] = useLocation();
  const [showVideo, setShowVideo] = useState(false);

  // Background images
  const images = [Acharya, bg2, bg3, bg4];

  // Dynamic taglines for each slide
  const taglines = [
    "Your Gateway to Career Success",
    "Unlock Your Future With AI-Powered Learning",
    "Where Talent Meets Opportunity",
    "Build Skills. Crack Interviews. Get Hired."
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => navigate('/auth');
  const handleWatchDemo = () => setShowVideo(true);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">

      {/* BACKGROUND SLIDES */}
      <motion.div
        key={currentSlide}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${images[currentSlide]})`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      ></motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container relative px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div 
            className="space-y-6 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white">
                {taglines[currentSlide]}
              </h1>

              <p className="mx-auto max-w-[600px] md:text-xl text-gray-200">
                Connect with top companies, master new skills, and ace interviews 
                with our AI-powered platform.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="h-11 px-8"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchDemo}
                className="h-11 px-8 bg-white/20 text-white border-white hover:bg-white/30"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <motion.div 
              className="flex items-center space-x-8 pt-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE GRAPHICS */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-md">
              <motion.div 
                className="glass-card rounded-2xl p-6 animate-float backdrop-blur-md bg-white/10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">Student Dashboard</h3>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/10 p-3">
                      <div className="text-xs text-white/70">Applications</div>
                      <div className="text-lg font-bold text-white">12</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-3">
                      <div className="text-xs text-white/70">Interviews</div>
                      <div className="text-lg font-bold text-white">5</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Interview Score</span>
                      <span className="text-white">85%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/20">
                      <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-green-400 to-blue-400"></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating cards */}
              <motion.div 
                className="absolute -right-8 top-16 glass-card rounded-lg p-3 bg-white/10 backdrop-blur-md"
                animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              >
                <div className="text-accent text-lg mb-1">🧠</div>
                <div className="text-xs text-white/90">AI Interview</div>
              </motion.div>

              <motion.div 
                className="absolute -left-8 bottom-16 glass-card rounded-lg p-3 bg-white/10 backdrop-blur-md"
                animate={{ y: [0, -15, 0], rotate: [0, -2, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 4 }}
              >
                <div className="text-yellow-400 text-lg mb-1">🏆</div>
                <div className="text-xs text-white/90">Competitions</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black rounded-xl overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
            <div className="flex justify-end p-2">
              <button onClick={() => setShowVideo(false)} className="text-white text-2xl">
                ✖
              </button>
            </div>
            <iframe
              className="w-full h-64 md:h-96"
              src="https://www.youtube.com/embed/GJ3lYB_m42Q"
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}

