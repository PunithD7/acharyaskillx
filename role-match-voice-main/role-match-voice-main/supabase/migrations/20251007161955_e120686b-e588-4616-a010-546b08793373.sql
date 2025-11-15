-- Create interviews table to store interview sessions
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_name TEXT NOT NULL,
  role TEXT NOT NULL,
  experience_years INTEGER NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_messages table to store conversation
CREATE TABLE public.interview_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('ai', 'candidate')),
  content TEXT NOT NULL,
  audio_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_reports table to store AI analysis
CREATE TABLE public.interview_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  technical_score INTEGER CHECK (technical_score >= 0 AND technical_score <= 100),
  communication_score INTEGER CHECK (communication_score >= 0 AND communication_score <= 100),
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  evaluation JSONB,
  recommendations TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required for demo)
CREATE POLICY "Anyone can create interviews" 
ON public.interviews 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view interviews" 
ON public.interviews 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update interviews" 
ON public.interviews 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can create messages" 
ON public.interview_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view messages" 
ON public.interview_messages 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create reports" 
ON public.interview_reports 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view reports" 
ON public.interview_reports 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_interview_messages_interview_id ON public.interview_messages(interview_id);
CREATE INDEX idx_interview_messages_timestamp ON public.interview_messages(timestamp);
CREATE INDEX idx_interview_reports_interview_id ON public.interview_reports(interview_id);

-- Enable realtime for interview messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.interview_messages;