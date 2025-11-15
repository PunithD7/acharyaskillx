import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Briefcase, 
  Trophy, 
  Brain, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useLocation } from "wouter";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: profile } = useQuery({
    queryKey: ['/api/profile'],
  });

  const { data: enrollments } = useQuery({
    queryKey: ['/api/my-enrollments'],
  });

  const { data: applications } = useQuery({
    queryKey: ['/api/my-applications'],
  });

  const { data: interviews } = useQuery({
    queryKey: ['/api/my-interviews'],
  });

  const stats = [
    {
      title: "Applications",
      value: applications?.length || 0,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Courses",
      value: enrollments?.length || 0,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Interviews",
      value: interviews?.filter((i: any) => i.status === 'completed').length || 0,
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Success Rate",
      value: "85%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'shortlisted':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold" data-testid="dashboard-title">
              Welcome back, {user?.firstName || user?.username}!
            </h1>
            <p className="text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} data-testid={`stat-${stat.title.toLowerCase()}`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with these popular activities
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                onClick={() => navigate('/ai-interview')}
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-start-interview"
              >
                <Brain className="h-8 w-8" />
                <span>Start AI Interview</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/courses')}
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-browse-courses"
              >
                <BookOpen className="h-8 w-8" />
                <span>Browse Courses</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/internships')}
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-find-internships"
              >
                <Briefcase className="h-8 w-8" />
                <span>Find Internships</span>
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/competitions')}
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-join-competitions"
              >
                <Trophy className="h-8 w-8" />
                <span>Join Competitions</span>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="interviews">Interview Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {interviews?.slice(0, 3).map((interview: any) => (
                      <div key={interview.id} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                          <Brain className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Completed AI Interview
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {interview.jobRole} • Score: {interview.overallScore}/100
                          </p>
                        </div>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                    )) || (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No recent activity
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Progress Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Completion</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Interview Performance</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Application Success Rate</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {enrollments?.map((enrollment: any) => (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">Course Progress</CardTitle>
                      <CardDescription>
                        Progress: {enrollment.progress}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Progress value={enrollment.progress} />
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(enrollment.completedAt ? 'completed' : 'in_progress')}>
                          {enrollment.completedAt ? 'Completed' : 'In Progress'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="col-span-full text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => navigate('/courses')}
                    >
                      Browse Courses
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <div className="space-y-4">
                {applications?.map((application: any) => (
                  <Card key={application.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold">Application #{application.id.slice(0, 8)}</h3>
                          <p className="text-sm text-muted-foreground">
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      You haven't applied to any internships yet.
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => navigate('/internships')}
                    >
                      Find Internships
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="space-y-4">
              <div className="space-y-4">
                {interviews?.map((interview: any) => (
                  <Card key={interview.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{interview.jobRole}</CardTitle>
                          <CardDescription>
                            {new Date(interview.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {interview.status === 'completed' && (
                        <>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {interview.overallScore}
                              </div>
                              <div className="text-xs text-muted-foreground">Overall</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {interview.communicationScore}
                              </div>
                              <div className="text-xs text-muted-foreground">Communication</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">
                                {interview.technicalScore}
                              </div>
                              <div className="text-xs text-muted-foreground">Technical</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">
                                {interview.confidenceScore}
                              </div>
                              <div className="text-xs text-muted-foreground">Confidence</div>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Download Report
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                )) || (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      You haven't completed any AI interviews yet.
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => navigate('/ai-interview')}
                    >
                      Start Your First Interview
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
