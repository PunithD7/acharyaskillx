import { GraduationCap } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">AcharyaSkillX</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Empowering students and connecting talent with opportunities through innovative technology.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-linkedin"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-github"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#courses" className="hover:text-primary">Courses</a></li>
              <li><a href="#internships" className="hover:text-primary">Internships</a></li>
              <li><a href="#hackathons" className="hover:text-primary">Competitions</a></li>
              <li><a href="#ai-interviews" className="hover:text-primary">AI Interviews</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Organizations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Faculty Dashboard</a></li>
              <li><a href="#" className="hover:text-primary">Recruiter Portal</a></li>
              <li><a href="#" className="hover:text-primary">Analytics</a></li>
              <li><a href="#" className="hover:text-primary">API Access</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AcharyaSkillX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
