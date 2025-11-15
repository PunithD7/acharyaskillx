import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Briefcase, 
  Trophy, 
  Brain, 
  TrendingUp,
  Users,
  BarChart3 
} from "lucide-react";

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("student");

  const recentActivities = [
    {
      id: 1,
      icon: Brain,
      title: "Completed AI Interview",
      description: "Software Engineer - Google",
      time: "2h ago",
      score: 85
    },
    {
      id: 2,
      icon: Briefcase,
      title: "Applied for Data Science Intern",
      description: "Microsoft",
      time: "1d ago"
    },
    {
      id: 3,
      icon: Trophy,
      title: "Registered for AI Hackathon",
      description: "Team: CodeCrafters",
      time: "3d ago"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Dashboards for Every Role
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Get insights tailored to your needs with comprehensive analytics and management tools.
          </p>
        </motion.div>

        {/* Dashboard Tabs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="student" data-testid="tab-student">Student</TabsTrigger>
                <TabsTrigger value="faculty" data-testid="tab-faculty">Faculty</TabsTrigger>
                <TabsTrigger value="recruiter" data-testid="tab-recruiter">Recruiter</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="student">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid gap-6 lg:grid-cols-4">
                      {/* Stats Cards */}
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Applications</p>
                                <p className="text-2xl font-bold">12</p>
                              </div>
                              <Briefcase className="h-5 w-5 text-primary" />
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Interviews</p>
                                <p className="text-2xl font-bold">5</p>
                              </div>
                              <Brain className="h-5 w-5 text-accent" />
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground">Courses</p>
                                <p className="text-2xl font-bold">3</p>
                              </div>
                              <BookOpen className="h-5 w-5 text-chart-2" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Recent Activity */}
                      <div className="lg:col-span-2">
                        <h3 className="font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          {recentActivities.map((activity) => (
                            <motion.div
                              key={activity.id}
                              className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <activity.icon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{activity.description}</p>
                              </div>
                              <div className="text-right">
                                {activity.score && (
                                  <Badge variant="outline" className="mb-1">
                                    {activity.score}%
                                  </Badge>
                                )}
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Chart */}
                      <div>
                        <h3 className="font-semibold mb-4">Interview Performance</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Communication</span>
                              <span>85%</span>
                            </div>
                            <Progress value={85} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Technical</span>
                              <span>78%</span>
                            </div>
                            <Progress value={78} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Confidence</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="faculty">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                      {/* Faculty Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                            <p className="text-2xl font-bold">1,200</p>
                            <p className="text-sm text-muted-foreground">Students</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
                            <p className="text-2xl font-bold">45</p>
                            <p className="text-sm text-muted-foreground">Courses</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                            <p className="text-2xl font-bold">89%</p>
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <Trophy className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                            <p className="text-2xl font-bold">156</p>
                            <p className="text-sm text-muted-foreground">Placements</p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Analytics Chart */}
                      <div className="lg:col-span-2">
                        <h3 className="font-semibold mb-4">Performance Analytics</h3>
                        <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                            <p className="text-muted-foreground">Student performance trends</p>
                            <p className="text-sm text-muted-foreground">Interactive charts and analytics</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="recruiter">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      {/* Recruiter Dashboard */}
                      <div>
                        <h3 className="font-semibold mb-4">Recruitment Overview</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <Card>
                            <CardContent className="p-4 text-center">
                              <Briefcase className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                              <p className="text-2xl font-bold">24</p>
                              <p className="text-sm text-muted-foreground">Active Jobs</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="p-4 text-center">
                              <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                              <p className="text-2xl font-bold">387</p>
                              <p className="text-sm text-muted-foreground">Applications</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">Software Engineer</p>
                              <p className="text-sm text-muted-foreground">45 applicants</p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div>
                              <p className="font-medium">Data Scientist</p>
                              <p className="text-sm text-muted-foreground">23 applicants</p>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Candidate Pipeline */}
                      <div>
                        <h3 className="font-semibold mb-4">Candidate Pipeline</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Applications Received</span>
                              <span>387</span>
                            </div>
                            <Progress value={100} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Under Review</span>
                              <span>156</span>
                            </div>
                            <Progress value={40} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Interviews Scheduled</span>
                              <span>89</span>
                            </div>
                            <Progress value={23} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Offers Extended</span>
                              <span>34</span>
                            </div>
                            <Progress value={9} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
