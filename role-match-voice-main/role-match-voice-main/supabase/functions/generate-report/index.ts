import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { interviewId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Required environment variables are not configured');
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch interview details and messages
    const { data: interview, error: interviewError } = await supabase
      .from('interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (interviewError) throw interviewError;

    const { data: messages, error: messagesError } = await supabase
      .from('interview_messages')
      .select('*')
      .eq('interview_id', interviewId)
      .order('timestamp', { ascending: true });

    if (messagesError) throw messagesError;

    // Create conversation transcript
    const transcript = messages
      .map(msg => `${msg.role === 'ai' ? 'Interviewer' : 'Candidate'}: ${msg.content}`)
      .join('\n\n');

    // Generate analysis using AI
    const analysisPrompt = `Analyze this technical interview and provide a detailed evaluation.

Interview Details:
- Role: ${interview.role}
- Experience: ${interview.experience_years} years
- Difficulty: ${interview.difficulty_level}
- Candidate: ${interview.candidate_name}

Interview Transcript:
${transcript}

Provide a comprehensive analysis in JSON format with:
1. overall_score (0-100): Overall interview performance
2. technical_score (0-100): Technical knowledge and problem-solving
3. communication_score (0-100): Communication clarity and professionalism
4. confidence_score (0-100): Confidence and composure
5. evaluation: Object with detailed assessment including:
   - strengths: Array of key strengths demonstrated
   - weaknesses: Array of areas for improvement
   - technical_depth: Assessment of technical knowledge
   - problem_solving: Evaluation of problem-solving approach
   - communication_skills: Communication effectiveness
6. recommendations: String with specific recommendations for the candidate

Be honest but constructive in your evaluation.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'You are an expert technical interview evaluator. Analyze interviews and provide constructive feedback.' },
          { role: 'user', content: analysisPrompt }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    // Store the report
    const { data: report, error: reportError } = await supabase
      .from('interview_reports')
      .insert({
        interview_id: interviewId,
        overall_score: analysis.overall_score,
        technical_score: analysis.technical_score,
        communication_score: analysis.communication_score,
        confidence_score: analysis.confidence_score,
        evaluation: analysis.evaluation,
        recommendations: analysis.recommendations
      })
      .select()
      .single();

    if (reportError) throw reportError;

    // Update interview status
    await supabase
      .from('interviews')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', interviewId);

    console.log('Report generated successfully for interview:', interviewId);

    return new Response(
      JSON.stringify(report),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-report:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});