import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Calendar } from "lucide-react";

export default function CtaSection() {
  const [, navigate] = useLocation();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleScheduleDemo = () => {
    // Implement demo scheduling functionality
    console.log('Schedule demo clicked');
  };

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="mx-auto max-w-2xl text-center space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground md:text-xl">
            Join thousands of students who have successfully landed their dream jobs through our platform.
          </p>
          
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              size="lg"
              onClick={handleGetStarted}
              data-testid="button-get-started-cta"
              className="h-11 px-8"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleScheduleDemo}
              data-testid="button-schedule-demo"
              className="h-11 px-8"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Demo
            </Button>
          </motion.div>
          
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
