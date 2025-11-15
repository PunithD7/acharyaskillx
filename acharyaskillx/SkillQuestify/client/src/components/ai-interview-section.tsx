import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, FileText, Mic } from "lucide-react";

export default function AiInterviewSection() {
  const [, navigate] = useLocation();

  const handleStartInterview = () => {
    navigate('/auth');
  };

  return (
    <section id="ai-interviews" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                AI-Powered Mock Interviews
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Practice with our advanced AI system that adapts to your role and provides detailed performance analysis. 
                Get ready for real interviews with confidence.
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="mt-1">
                  <Brain className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold">Role-Specific Questions</h4>
                  <p className="text-sm text-muted-foreground">Get tailored questions based on your target position and industry.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mt-1">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Detailed Analytics</h4>
                  <p className="text-sm text-muted-foreground">Receive comprehensive feedback on communication, technical skills, and confidence.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="mt-1">
                  <FileText className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <h4 className="font-semibold">PDF Reports</h4>
                  <p className="text-sm text-muted-foreground">Download professional reports to track your progress and share with recruiters.</p>
                </div>
              </motion.div>
            </div>
            
            <Button 
              size="lg"
              onClick={handleStartInterview}
              data-testid="button-start-interview"
              className="h-11 px-8"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Mock Interview
            </Button>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* AI Interview Interface Mockup */}
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>AI Interview Session</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm text-muted-foreground">Recording</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm">
                    <strong>AI Interviewer:</strong> "Tell me about a challenging project you worked on and how you overcame the obstacles."
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-4 py-8">
                  <motion.button 
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="h-6 w-6" />
                  </motion.button>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Speak your answer</div>
                    <div className="text-xs text-muted-foreground">Time remaining: 2:30</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Live Performance Metrics</h4>
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-sm">Communication</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm">85%</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <span className="text-sm">Technical Accuracy</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-24" />
                        <span className="text-sm">78%</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <span className="text-sm">Confidence</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-24" />
                        <span className="text-sm">92%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
