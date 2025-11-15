import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";

// Pages
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";
import StudentDashboard from "@/pages/student-dashboard";
import FacultyDashboard from "@/pages/faculty-dashboard";
import RecruiterDashboard from "@/pages/recruiter-dashboard";
import Courses from "@/pages/courses";
import Internships from "@/pages/internships";
import Competitions from "@/pages/competitions";
import AiInterview from "@/pages/ai-interview";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="educonnect-theme">
        <AuthProvider> {/* ✅ AuthProvider wraps everything */}
          <TooltipProvider>
            <Toaster />
            <Switch>
              <Route path="/" component={Landing} />
              <Route path="/auth" component={AuthPage} />
              <Route path="/student-dashboard" component={StudentDashboard} />
              <Route path="/faculty-dashboard" component={FacultyDashboard} />
              <Route path="/recruiter-dashboard" component={RecruiterDashboard} />
              <Route path="/courses" component={Courses} />
              <Route path="/internships" component={Internships} />
              <Route path="/competitions" component={Competitions} />
              <Route path="/ai-interview" component={AiInterview} />
              
              <Route component={NotFound} />
            </Switch>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
