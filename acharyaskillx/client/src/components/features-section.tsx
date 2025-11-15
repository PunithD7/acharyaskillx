
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star, Clock, ArrowRight, MapPin, DollarSign } from "lucide-react";

export default function FeaturesSection() {
  const [, navigate] = useLocation();

  const { data: courses } = useQuery({
    queryKey: ['/api/courses'],
  });

  const { data: internships } = useQuery({
    queryKey: ['/api/internships'],
  });

  const { data: competitions } = useQuery({
    queryKey: ['/api/competitions'],
  });

  const handleEnrollCourse = (courseId: string) => {
    navigate('/auth');
  };

  const handleApplyInternship = (internshipId: string) => {
    navigate('/auth');
  };

  const handleRegisterCompetition = (competitionId: string) => {
    navigate('/auth');
  };

  return (
    <section id="courses" className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Comprehensive Learning Ecosystem
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            From courses to competitions, everything you need to accelerate your career.
          </p>
        </motion.div>

        {/* Courses Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Featured Courses</h3>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/courses')}
              data-testid="view-all-courses"
            >
              View All Courses <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses?.slice(0, 3).map((course: any, index: number) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover-lift overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/60" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">
                        {course.category || 'General'}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.rating || '4.8'}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <Clock className="inline h-4 w-4 mr-1" />
                        <span>{course.duration || '12 weeks'}</span>
                      </div>
                      <Button 
                        onClick={() => handleEnrollCourse(course.id)}
                        data-testid={`enroll-course-${course.id}`}
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) || (
              // Fallback when no courses are loaded
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover-lift overflow-hidden">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/60" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">
                          {index === 0 ? 'Web Development' : index === 1 ? 'Data Science' : 'Mobile Dev'}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>4.8</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">
                        {index === 0 ? 'Full Stack Web Development' : 
                         index === 1 ? 'Machine Learning & AI' : 
                         'React Native Development'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {index === 0 ? 'Learn React, Node.js, and MongoDB to build complete web applications.' :
                         index === 1 ? 'Master Python, TensorFlow, and build intelligent applications.' :
                         'Build cross-platform mobile apps with React Native and Expo.'}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <Clock className="inline h-4 w-4 mr-1" />
                          <span>{index === 0 ? '12 weeks' : index === 1 ? '16 weeks' : '10 weeks'}</span>
                        </div>
                        <Button onClick={() => navigate('/auth')}>
                          Enroll Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Internships Section */}
        <motion.div 
          id="internships" 
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Latest Internships</h3>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/internships')}
              data-testid="view-all-internships"
            >
              View All Opportunities <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {internships?.slice(0, 2).map((internship: any, index: number) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {internship.company?.charAt(0) || 'C'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{internship.title}</h4>
                          <p className="text-sm text-muted-foreground">{internship.company}</p>
                        </div>
                      </div>
                      <Badge variant={internship.isRemote ? "default" : "secondary"}>
                        {internship.isRemote ? 'Remote' : 'On-site'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {internship.description || 'Exciting internship opportunity to work with cutting-edge technologies.'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{internship.location || 'Remote'}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{internship.salary || 'Competitive'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.skills?.slice(0, 3).map((skill: string) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      )) || (
                        <>
                          <Badge variant="outline" className="text-xs">React</Badge>
                          <Badge variant="outline" className="text-xs">Python</Badge>
                          <Badge variant="outline" className="text-xs">ML</Badge>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Posted {new Date(internship.createdAt).toLocaleDateString()}
                      </span>
                      <Button 
                        onClick={() => handleApplyInternship(internship.id)}
                        data-testid={`apply-internship-${internship.id}`}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )) || (
              // Fallback when no internships are loaded
              Array.from({ length: 2 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">
                              {index === 0 ? 'G' : 'M'}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {index === 0 ? 'Software Engineer Intern' : 'Data Science Intern'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {index === 0 ? 'Google' : 'Microsoft'}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default">
                          {index === 0 ? 'Remote' : 'Hybrid'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {index === 0 
                          ? 'Join our team to work on cutting-edge technologies and gain hands-on experience in software development.'
                          : 'Work with large datasets and machine learning models to solve real-world business problems.'
                        }
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{index === 0 ? 'Mountain View, CA' : 'Seattle, WA'}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{index === 0 ? '$8,000/month' : '$7,500/month'}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {index === 0 ? (
                          <>
                            <Badge variant="outline" className="text-xs">React</Badge>
                            <Badge variant="outline" className="text-xs">Python</Badge>
                            <Badge variant="outline" className="text-xs">ML</Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="text-xs">Python</Badge>
                            <Badge variant="outline" className="text-xs">SQL</Badge>
                            <Badge variant="outline" className="text-xs">Azure</Badge>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          <Clock className="inline h-4 w-4 mr-1" />
                          Posted {index === 0 ? '2 days ago' : '1 week ago'}
                        </span>
                        <Button onClick={() => navigate('/auth')}>
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Competitions Section */}
        <motion.div 
          id="hackathons"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Upcoming Competitions</h3>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/competitions')}
              data-testid="view-all-competitions"
            >
              View All Events <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {competitions?.slice(0, 3).map((competition: any, index: number) => (
              <motion.div
                key={competition.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group hover-lift overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                    <span className="text-4xl">🏆</span>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {competition.type || 'Hackathon'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {competition.duration || '48 hours'}
                      </span>
                    </div>
                    <h4 className="font-semibold mb-2">{competition.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {competition.description || 'Build innovative solutions and compete for amazing prizes.'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {competition.startDate 
                            ? new Date(competition.startDate).toLocaleDateString()
                            : 'Mar 15-17, 2024'
                          }
                        </span>
                      </div>
                      <div className="flex items-center">
                        👥 <span className="ml-1">500+ teams</span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      className="w-full"
                      onClick={() => handleRegisterCompetition(competition.id)}
                      data-testid={`register-competition-${competition.id}`}
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )) || (
              // Fallback when no competitions are loaded
              Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group hover-lift overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                      <span className="text-4xl">
                        {index === 0 ? '🧠' : index === 1 ? '🌱' : '⛓️'}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {index === 0 ? 'Hackathon' : index === 1 ? 'Sustainability' : 'Blockchain'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {index === 0 ? '48 hours' : index === 1 ? '7 days' : '30 days'}
                        </span>
                      </div>
                      <h4 className="font-semibold mb-2">
                        {index === 0 ? 'AI Innovation Challenge' :
                         index === 1 ? 'Green Tech Challenge' :
                         'Web3 Builder Contest'}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-3">
                        {index === 0 ? 'Build the next generation of AI applications. $50,000 in prizes.' :
                         index === 1 ? 'Create solutions for environmental sustainability. Make an impact.' :
                         'Develop decentralized applications. Join the future of web.'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {index === 0 ? 'Mar 15-17, 2024' :
                             index === 1 ? 'Apr 1-7, 2024' :
                             'May 1-31, 2024'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          👥 <span className="ml-1">
                            {index === 0 ? '500+ teams' :
                             index === 1 ? '200+ teams' :
                             '300+ teams'}
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        className="w-full"
                        onClick={() => navigate('/auth')}
                      >
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

