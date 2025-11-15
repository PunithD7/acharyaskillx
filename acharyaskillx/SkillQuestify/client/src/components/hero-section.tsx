import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";

export default function HeroSection() {
  const [, navigate] = useLocation();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleWatchDemo = () => {
    // Implement demo video functionality
    console.log('Watch demo clicked');
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 gradient-bg opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Your Gateway to
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Career Success
                </span>
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Connect with top companies, master new skills, and ace interviews with our AI-powered platform. 
                Join thousands of students landing their dream internships and jobs.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={handleGetStarted}
                data-testid="button-get-started"
                className="h-11 px-8"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWatchDemo}
                data-testid="button-watch-demo"
                className="h-11 px-8"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <motion.div 
              className="flex items-center space-x-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Main dashboard mockup */}
              <motion.div 
                className="glass-card rounded-2xl p-6 animate-float"
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

              {/* Floating feature cards */}
              <motion.div 
                className="absolute -right-8 top-16 glass-card rounded-lg p-3"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  delay: 2
                }}
              >
                <div className="text-accent text-lg mb-1">🧠</div>
                <div className="text-xs text-white/90">AI Interview</div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-8 bottom-16 glass-card rounded-lg p-3"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, -2, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  delay: 4
                }}
              >
                <div className="text-yellow-400 text-lg mb-1">🏆</div>
                <div className="text-xs text-white/90">Competitions</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
