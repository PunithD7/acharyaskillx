import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, role, experienceYears, difficultyLevel } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Create system prompt based on interview parameters
    const systemPrompt = `You are an expert technical interviewer conducting a ${difficultyLevel} level interview for a ${role} position. 
    The candidate has ${experienceYears} years of experience.
    
    Interview Guidelines:
    - Ask ONE question at a time
    - Mix technical, behavioral, and scenario-based questions
    - Ask follow-up questions based on candidate's responses
    - Be professional but friendly
    - Evaluate answers for correctness, depth, and communication skills
    - Keep questions relevant to the role and experience level
    - For ${difficultyLevel} level: ${
      difficultyLevel === 'beginner' ? 'Focus on fundamentals and basic concepts' :
      difficultyLevel === 'intermediate' ? 'Include problem-solving and practical application' :
      'Challenge with complex scenarios and system design'
    }
    
    Start by welcoming the candidate and asking your first question. Be conversational and natural.`;

    console.log('Starting interview with params:', { role, experienceYears, difficultyLevel });

    // Call Lovable AI with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in conduct-interview:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});