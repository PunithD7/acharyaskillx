import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  BarChart3,
  UserCheck,
  GraduationCap,
  Target
} from "lucide-react";

export default function FacultyDashboard() {
  const { user } = useAuth();

  const { data: analytics } = useQuery({
    queryKey: ['/api/analytics/overview'],
  });

  const stats = [
    {
      title: "Total Students",
      value: analytics?.students?.totalStudents || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      change: "+12% from last month"
    },
    {
      title: "Active Courses",
      value: analytics?.courses?.totalCourses || 0,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      change: "+3 new courses"
    },
    {
      title: "Enrollments",
      value: analytics?.courses?.totalEnrollments || 0,
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      change: "+45% completion rate"
    },
    {
      title: "Job Placements",
      value: "89%",
      icon: Target,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      change: "+5% from last quarter"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "enrollment",
      title: "New course enrollment spike",
      description: "Web Development course gained 25 new students",
      time: "2 hours ago",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "interview",
      title: "High-performing interview results",
      description: "Sarah Johnson scored 95% in AI interview",
      time: "4 hours ago",
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "achievement",
      title: "Competition winners announced",
      description: "AI Innovation Challenge results published",
      time: "1 day ago",
      icon: Award,
      color: "text-purple-600"
    }
  ];

  const topPerformers = [
    { name: "Sarah Johnson", score: 95, course: "Data Science", improvement: "+15%" },
    { name: "Mike Chen", score: 92, course: "Web Development", improvement: "+12%" },
    { name: "Emily Davis", score: 90, course: "Mobile Development", improvement: "+8%" },
    { name: "Alex Kumar", score: 88, course: "AI/ML", improvement: "+10%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold" data-testid="dashboard-title">
              Faculty Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor student progress and manage academic programs
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} data-testid={`stat-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage courses, competitions, and student progress
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-create-course"
              >
                <BookOpen className="h-8 w-8" />
                <span>Create Course</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-manage-competitions"
              >
                <Award className="h-8 w-8" />
                <span>Manage Competitions</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-view-analytics"
              >
                <BarChart3 className="h-8 w-8" />
                <span>View Analytics</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-student-reports"
              >
                <UserCheck className="h-8 w-8" />
                <span>Student Reports</span>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full bg-muted`}>
                          <activity.icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Top Performers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Students with highest interview scores</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topPerformers.map((student, index) => (
                      <div key={student.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-medium text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{student.score}%</p>
                          <p className="text-xs text-green-600">{student.improvement}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Performance Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Monthly student performance analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Performance chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage student profiles and progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Student management interface will be implemented here
                    </p>
                    <Button className="mt-4">View All Students</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Create and manage courses and curriculum</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Course management interface will be implemented here
                    </p>
                    <Button className="mt-4">Create New Course</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Enrollment chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Completion chart</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Placement Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Placement chart</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
