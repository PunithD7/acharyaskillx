import { useState } from 'react';
import PreInterviewForm from '@/components/PreInterviewForm';
import InterviewInterface from '@/components/InterviewInterface';
import PostInterviewReport from '@/components/PostInterviewReport';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AppState = 'form' | 'interview' | 'report';

export default function Index() {
  const [appState, setAppState] = useState<AppState>('form');
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [interviewData, setInterviewData] = useState<any>(null);
  const { toast } = useToast();

  const handleStartInterview = async (data: {
    candidateName: string;
    role: string;
    experienceYears: number;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  }) => {
    try {
      const { data: interview, error } = await supabase
        .from('interviews')
        .insert({
          candidate_name: data.candidateName,
          role: data.role,
          experience_years: data.experienceYears,
          difficulty_level: data.difficultyLevel,
          status: 'in_progress'
        })
        .select()
        .single();

      if (error) throw error;

      setInterviewId(interview.id);
      setInterviewData(data);
      setAppState('interview');

      toast({
        title: 'Interview Started',
        description: 'Your AI-powered interview has begun',
      });
    } catch (error) {
      console.error('Error starting interview:', error);
      toast({
        title: 'Error',
        description: 'Failed to start interview',
        variant: 'destructive'
      });
    }
  };

  const handleEndInterview = () => {
    setAppState('report');
  };

  const handleBackToHome = () => {
    setAppState('form');
    setInterviewId(null);
    setInterviewData(null);
  };

  return (
    <>
      {appState === 'form' && (
        <PreInterviewForm onStartInterview={handleStartInterview} />
      )}
      {appState === 'interview' && interviewId && interviewData && (
        <InterviewInterface
          interviewId={interviewId}
          candidateName={interviewData.candidateName}
          role={interviewData.role}
          experienceYears={interviewData.experienceYears}
          difficultyLevel={interviewData.difficultyLevel}
          onEndInterview={handleEndInterview}
        />
      )}
      {appState === 'report' && interviewId && (
        <PostInterviewReport
          interviewId={interviewId}
          onBackToHome={handleBackToHome}
        />
      )}
    </>
  );
}