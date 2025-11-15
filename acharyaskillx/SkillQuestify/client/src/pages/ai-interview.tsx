import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import {
  Brain,
  Mic,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  Star,
  Download,
  MessageSquare,
  Award,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
//import { VideoRoom } from "@/components/videoroom"; // ✅ import your video room component

type InterviewSession = {
  id: string;
  jobRole: string;
  difficulty: string;
  questions: Array<{
    question: string;
    answer: string;
    timeSpent: number;
  }>;
  overallScore?: number;
  communicationScore?: number;
  technicalScore?: number;
  confidenceScore?: number;
  feedback?: string;
  status: string;
  createdAt: string;
  completedAt?: string;
};

export default function AiInterview() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<"setup" | "video" | "interview" | "results">("setup");
  const [currentSession, setCurrentSession] = useState<InterviewSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const { data: interviews } = useQuery({
    queryKey: ["/api/my-interviews"],
    enabled: !!user && user.role === "student",
  });

  const setupForm = useForm({
    defaultValues: {
      jobRole: "",
      difficulty: "medium" as "easy" | "medium" | "hard",
    },
  });

  const startInterviewMutation = useMutation({
    mutationFn: async (data: { jobRole: string; difficulty: string }) => {
      const res = await apiRequest("POST", "/api/ai-interview/start", data);
      return await res.json();
    },
    onSuccess: (session) => {
      setCurrentSession(session);
      setCurrentStep("interview");
      setCurrentQuestionIndex(0);
      setTimeLeft(180);
      toast({
        title: "Interview started!",
        description: "Good luck with your AI interview session.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to start interview",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateAnswerMutation = useMutation({
    mutationFn: async ({
      sessionId,
      questionIndex,
      answer,
      timeSpent,
    }: {
      sessionId: string;
      questionIndex: number;
      answer: string;
      timeSpent: number;
    }) => {
      const res = await apiRequest("PUT", `/api/ai-interview/${sessionId}/answer`, {
        questionIndex,
        answer,
        timeSpent,
      });
      return await res.json();
    },
    onSuccess: (updatedSession) => {
      setCurrentSession(updatedSession);
    },
  });

  const completeInterviewMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      const res = await apiRequest("POST", `/api/ai-interview/${sessionId}/complete`);
      return await res.json();
    },
    onSuccess: (completedSession) => {
      setCurrentSession(completedSession);
      setCurrentStep("results");
      queryClient.invalidateQueries({ queryKey: ["/api/my-interviews"] });
      toast({
        title: "Interview completed!",
        description: "Your performance report is ready.",
      });
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === "interview" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && currentStep === "interview") {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartInterview = (data: { jobRole: string; difficulty: string }) => {
    if (!user || user.role !== "student") {
      toast({
        title: "Access denied",
        description: "Only students can take AI interviews.",
        variant: "destructive",
      });
      return;
    }
    startInterviewMutation.mutate(data);
  };

  const handleNextQuestion = () => {
    if (!currentSession) return;
    const timeSpent = 180 - timeLeft;

    updateAnswerMutation.mutate({
      sessionId: currentSession.id,
      questionIndex: currentQuestionIndex,
      answer: currentAnswer,
      timeSpent,
    });

    if (currentQuestionIndex < currentSession.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer("");
      setTimeLeft(180);
    } else {
      completeInterviewMutation.mutate(currentSession.id);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      const prevAnswer = currentSession?.questions[currentQuestionIndex - 1]?.answer || "";
      setCurrentAnswer(prevAnswer);
      setTimeLeft(180);
    }
  };

  const handleRetakeInterview = () => {
    setCurrentStep("setup");
    setCurrentSession(null);
    setCurrentQuestionIndex(0);
    setCurrentAnswer("");
    setTimeLeft(180);
    setupForm.reset();
  };

  const jobRoles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UI/UX Designer",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Mobile Developer",
  ];

  if (!user || user.role !== "student") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container px-4 py-8 text-center">
          <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">AI Interview feature is only available for students.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container px-4 py-8">
        <AnimatePresence mode="wait">
          {/* --- Setup Step --- */}
          {currentStep === "setup" && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-primary" />
                    Interview Setup
                  </CardTitle>
                  <CardDescription>Configure your mock interview session</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={setupForm.handleSubmit(handleStartInterview)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="jobRole">Target Job Role</Label>
                      <Select
                        value={setupForm.watch("jobRole")}
                        onValueChange={(value) => setupForm.setValue("jobRole", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select the job role you're preparing for" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select
                        value={setupForm.watch("difficulty")}
                        onValueChange={(value) => setupForm.setValue("difficulty", value as any)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy - Entry level questions</SelectItem>
                          <SelectItem value="medium">Medium - Mid-level questions</SelectItem>
                          <SelectItem value="hard">Hard - Senior level questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* New Button to open video room */}
                    <Button
                      type="button"
                      className="w-full"
                      size="lg"
                      onClick={() => setCurrentStep("video")}
                      data-testid="start-interview-button"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Interview
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* --- Video Step --- */}
          {currentStep === "video" && (
            <div className="max-w-5xl mx-auto">
              {/* Replace this div with your actual VideoRoom component */}
            </div>
          )}

          {/* --- Interview Step --- */}
          {currentStep === "interview" && currentSession && (
            <motion.div key="interview" className="max-w-4xl mx-auto">
              {/* (keep your interview UI here exactly as before) */}
            </motion.div>
          )}

          {/* --- Results Step --- */}
          {currentStep === "results" && currentSession && (
            <motion.div key="results" className="max-w-4xl mx-auto">
              {/* (keep results UI as before) */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
