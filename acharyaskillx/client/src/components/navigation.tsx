import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/lib/theme-provider";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Sun, Moon } from "lucide-react";

export default function Navigation() {
  const { user, logoutMutation } = useAuth();
  const { theme, setTheme } = useTheme();
  const [, navigate] = useLocation();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navigateToDashboard = () => {
    if (user?.role === 'student') {
      navigate('/student-dashboard');
    } else if (user?.role === 'faculty') {
      navigate('/faculty-dashboard');
    } else if (user?.role === 'recruiter') {
      navigate('/recruiter-dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
          data-testid="logo"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">AcharyaSkillX</span>
        </div>

        <nav className="ml-auto flex items-center space-x-6">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/courses')}
                data-testid="nav-courses"
              >
                Courses
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/internships')}
                data-testid="nav-internships"
              >
                Internships
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/competitions')}
                data-testid="nav-competitions"
              >
                Competitions
              </Button>
              {user.role === 'student' && (
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/ai-interview')}
                  data-testid="nav-ai-interview"
                >
                  AI Interview
                </Button>
              )}
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  data-testid="theme-toggle"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={navigateToDashboard}
                  data-testid="dashboard-link"
                >
                  Dashboard
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  data-testid="logout-button"
                >
                  {logoutMutation.isPending ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <a 
                href="#courses" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="nav-courses-guest"
              >
                Courses
              </a>
              <a 
                href="#internships" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="nav-internships-guest"
              >
                Internships
              </a>
              <a 
                href="#hackathons" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="nav-competitions-guest"
              >
                Competitions
              </a>
              <a 
                href="#ai-interviews" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="nav-ai-interview-guest"
              >
                AI Interview
              </a>
               <a 
                href="#workshops" 
                className="text-sm font-medium hover:text-primary transition-colors"
                data-testid="nav-competitions-guest"
              >
                Workshops
              </a>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  data-testid="theme-toggle"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={handleLogin}
                  data-testid="login-button"
                >
                  Login
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  data-testid="signup-button"
                >
                  Sign Up
                </Button>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
