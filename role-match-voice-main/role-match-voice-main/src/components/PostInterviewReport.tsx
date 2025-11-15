import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, Download, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PostInterviewReportProps {
  interviewId: string;
  onBackToHome: () => void;
}

interface Report {
  overall_score: number;
  technical_score: number;
  communication_score: number;
  confidence_score: number;
  evaluation: {
    strengths: string[];
    weaknesses: string[];
    technical_depth: string;
    problem_solving: string;
    communication_skills: string;
  };
  recommendations: string;
}

export default function PostInterviewReport({ interviewId, onBackToHome }: PostInterviewReportProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [interview, setInterview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    generateReport();
  }, [interviewId]);

  const generateReport = async () => {
    try {
      setLoading(true);

      // Fetch interview details
      const { data: interviewData } = await supabase
        .from('interviews')
        .select('*')
        .eq('id', interviewId)
        .single();

      setInterview(interviewData);

      // Generate report
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interviewId })
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const reportData = await response.json();
      setReport(reportData);

      toast({
        title: 'Report Generated',
        description: 'Your interview analysis is ready',
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate report',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="p-12 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Generating Your Report</h2>
          <p className="text-muted-foreground">AI is analyzing your interview performance...</p>
        </Card>
      </div>
    );
  }

  if (!report || !interview) return null;

  const ScoreCard = ({ title, score, color }: { title: string; score: number; color: string }) => (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold">{score}%</span>
        </div>
        <Progress value={score} className="h-2" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl mb-2">Interview Report</CardTitle>
                <CardDescription className="text-lg">
                  <strong>{interview.candidate_name}</strong> • {interview.role} • {interview.difficulty_level}
                </CardDescription>
                <p className="text-sm text-muted-foreground mt-1">
                  Completed on {new Date(interview.completed_at).toLocaleDateString()}
                </p>
              </div>
              <Button onClick={onBackToHome} variant="outline" size="lg">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
              <p className="text-6xl font-bold">{report.overall_score}%</p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-4">
          <ScoreCard title="Technical Skills" score={report.technical_score} color="blue" />
          <ScoreCard title="Communication" score={report.communication_score} color="green" />
          <ScoreCard title="Confidence" score={report.confidence_score} color="purple" />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-secondary">Key Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {report.evaluation.strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-secondary mr-2">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-destructive">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {report.evaluation.weaknesses.map((weakness, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-destructive mr-2">→</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Technical Depth</h4>
              <p className="text-muted-foreground">{report.evaluation.technical_depth}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Problem-Solving Approach</h4>
              <p className="text-muted-foreground">{report.evaluation.problem_solving}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Communication Skills</h4>
              <p className="text-muted-foreground">{report.evaluation.communication_skills}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-line">{report.recommendations}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}