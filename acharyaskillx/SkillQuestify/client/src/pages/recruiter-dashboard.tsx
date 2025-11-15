import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  Building,
  MapPin,
  DollarSign,
  Clock
} from "lucide-react";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['/api/profile'],
  });

  const { data: myInternships } = useQuery({
    queryKey: ['/api/my-internships'],
    queryFn: async () => {
      const res = await fetch('/api/internships');
      if (!res.ok) throw new Error('Failed to fetch internships');
      const internships = await res.json();
      // Filter by posted by current user (would be implemented on backend)
      return internships.filter((i: any) => i.postedBy === user?.id);
    }
  });

  const stats = [
    {
      title: "Active Jobs",
      value: myInternships?.filter((i: any) => i.isActive).length || 0,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      change: "+3 this month"
    },
    {
      title: "Total Applications",
      value: "387",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      change: "+45 this week"
    },
    {
      title: "Interviews Scheduled",
      value: "89",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      change: "+12 pending"
    },
    {
      title: "Hire Rate",
      value: "23%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      change: "+5% from last month"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      position: "Software Engineer Intern",
      score: 95,
      appliedDate: "2024-01-15",
      status: "pending",
      skills: ["React", "Node.js", "Python"]
    },
    {
      id: 2,
      candidate: "Mike Chen",
      position: "Data Science Intern",
      score: 92,
      appliedDate: "2024-01-14",
      status: "interview_scheduled",
      skills: ["Python", "ML", "SQL"]
    },
    {
      id: 3,
      candidate: "Emily Davis",
      position: "Software Engineer Intern",
      score: 88,
      appliedDate: "2024-01-13",
      status: "under_review",
      skills: ["JavaScript", "React", "AWS"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview_scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'shortlisted':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interview_scheduled':
        return 'Interview Scheduled';
      case 'under_review':
        return 'Under Review';
      case 'shortlisted':
        return 'Shortlisted';
      default:
        return 'Pending';
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
              Recruiter Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your job postings and find the best talent
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
                Manage your recruitment process efficiently
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button 
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-post-job"
              >
                <Plus className="h-8 w-8" />
                <span>Post New Job</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-review-applications"
              >
                <Eye className="h-8 w-8" />
                <span>Review Applications</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-schedule-interviews"
              >
                <Calendar className="h-8 w-8" />
                <span>Schedule Interviews</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto p-4 flex flex-col space-y-2"
                data-testid="button-message-candidates"
              >
                <MessageSquare className="h-8 w-8" />
                <span>Message Candidates</span>
              </Button>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="jobs">My Job Postings</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest candidates who applied to your jobs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentApplications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{application.candidate}</h4>
                            <Badge className="text-xs bg-primary/10 text-primary">
                              AI Score: {application.score}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{application.position}</p>
                          <div className="flex space-x-1">
                            {application.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusText(application.status)}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Hiring Pipeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hiring Pipeline</CardTitle>
                    <CardDescription>Track your recruitment funnel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Applications</span>
                        <span className="text-sm text-muted-foreground">387</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Under Review</span>
                        <span className="text-sm text-muted-foreground">156</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Interviews</span>
                        <span className="text-sm text-muted-foreground">89</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Offers</span>
                        <span className="text-sm text-muted-foreground">34</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">My Job Postings</h3>
                <Button data-testid="button-create-job">
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </div>

              <div className="grid gap-4">
                {myInternships?.map((job: any) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <Badge variant={job.isActive ? "default" : "secondary"}>
                              {job.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{job.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            {job.skills?.slice(0, 3).map((skill: string) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )) || (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      You haven't posted any jobs yet.
                    </p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">All Applications</h3>
                
                <div className="space-y-4">
                  {recentApplications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold">{application.candidate}</h4>
                              <Badge className="bg-primary/10 text-primary">
                                AI Score: {application.score}%
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{application.position}</p>
                            <div className="flex space-x-2">
                              {application.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-x-2 flex items-center">
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusText(application.status)}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="space-y-4">
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Advanced candidate search and management coming soon.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
