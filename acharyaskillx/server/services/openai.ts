import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key" 
});

export interface InterviewQuestion {
  question: string;
  expectedAnswerPoints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'technical' | 'behavioral' | 'situational';
}

export interface InterviewEvaluation {
  communicationScore: number; // 0-100
  technicalScore: number; // 0-100
  confidenceScore: number; // 0-100
  overallScore: number; // 0-100
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export async function generateInterviewQuestions(
  jobRole: string,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  numQuestions: number = 5
): Promise<InterviewQuestion[]> {
  try {
    const prompt = `Generate ${numQuestions} interview questions for a ${jobRole} position with ${difficulty} difficulty level. 
    Include a mix of technical, behavioral, and situational questions appropriate for the role.
    
    For each question, provide:
    - The question text
    - Key points that should be covered in a good answer
    - Difficulty level
    - Category (technical/behavioral/situational)
    
    Respond with a JSON array of question objects.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert technical interviewer who creates comprehensive, role-specific interview questions. Respond only with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result.questions || [];
  } catch (error) {
    console.error("Error generating interview questions:", error);
    throw new Error("Failed to generate interview questions");
  }
}

export async function evaluateInterviewAnswer(
  question: string,
  answer: string,
  jobRole: string,
  expectedPoints: string[]
): Promise<{
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}> {
  try {
    const prompt = `Evaluate this interview answer for a ${jobRole} position:

    Question: ${question}
    Answer: ${answer}
    Expected key points: ${expectedPoints.join(', ')}

    Provide a detailed evaluation including:
    - Score out of 100
    - Specific feedback on the answer quality
    - Strengths demonstrated in the answer
    - Areas for improvement
    
    Consider technical accuracy, communication clarity, structure, and completeness.
    Respond with JSON format.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert interview evaluator. Provide constructive, detailed feedback in JSON format with fields: score, feedback, strengths (array), improvements (array)."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return {
      score: Math.max(0, Math.min(100, result.score || 0)),
      feedback: result.feedback || "No feedback available",
      strengths: result.strengths || [],
      improvements: result.improvements || []
    };
  } catch (error) {
    console.error("Error evaluating interview answer:", error);
    throw new Error("Failed to evaluate interview answer");
  }
}

export async function generateOverallInterviewEvaluation(
  jobRole: string,
  questionAnswers: Array<{
    question: string;
    answer: string;
    score: number;
    category: string;
  }>
): Promise<InterviewEvaluation> {
  try {
    const technicalQuestions = questionAnswers.filter(qa => qa.category === 'technical');
    const behavioralQuestions = questionAnswers.filter(qa => qa.category === 'behavioral');
    const situationalQuestions = questionAnswers.filter(qa => qa.category === 'situational');

    const avgTechnicalScore = technicalQuestions.length > 0 
      ? technicalQuestions.reduce((sum, qa) => sum + qa.score, 0) / technicalQuestions.length 
      : 0;

    const avgBehavioralScore = behavioralQuestions.length > 0 
      ? behavioralQuestions.reduce((sum, qa) => sum + qa.score, 0) / behavioralQuestions.length 
      : 0;

    const avgSituationalScore = situationalQuestions.length > 0 
      ? situationalQuestions.reduce((sum, qa) => sum + qa.score, 0) / situationalQuestions.length 
      : 0;

    const overallScore = questionAnswers.reduce((sum, qa) => sum + qa.score, 0) / questionAnswers.length;

    const prompt = `Provide a comprehensive interview evaluation for a ${jobRole} candidate based on their performance:

    Technical Questions Performance: ${avgTechnicalScore.toFixed(1)}/100
    Behavioral Questions Performance: ${avgBehavioralScore.toFixed(1)}/100
    Situational Questions Performance: ${avgSituationalScore.toFixed(1)}/100
    Overall Score: ${overallScore.toFixed(1)}/100

    Question-Answer Details:
    ${questionAnswers.map((qa, index) => 
      `${index + 1}. ${qa.question}\nAnswer Score: ${qa.score}/100`
    ).join('\n\n')}

    Provide:
    - Communication score (clarity, articulation, structure)
    - Technical score (technical knowledge and accuracy)
    - Confidence score (self-assurance, body language indicators from speech patterns)
    - Overall summary feedback
    - Key strengths demonstrated
    - Priority areas for improvement

    Respond in JSON format with numeric scores and detailed text feedback.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a senior interview evaluator providing comprehensive candidate assessments. Respond with JSON containing: communicationScore, technicalScore, confidenceScore, overallScore, feedback, strengths (array), improvements (array)."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      communicationScore: Math.max(0, Math.min(100, result.communicationScore || avgBehavioralScore)),
      technicalScore: Math.max(0, Math.min(100, result.technicalScore || avgTechnicalScore)),
      confidenceScore: Math.max(0, Math.min(100, result.confidenceScore || (overallScore * 0.9))), // Estimate confidence from overall performance
      overallScore: Math.max(0, Math.min(100, overallScore)),
      feedback: result.feedback || "Complete evaluation not available",
      strengths: result.strengths || ["Completed all interview questions"],
      improvements: result.improvements || ["Continue practicing interview skills"]
    };
  } catch (error) {
    console.error("Error generating overall evaluation:", error);
    throw new Error("Failed to generate overall interview evaluation");
  }
}

export async function generatePersonalizedFeedback(
  candidateName: string,
  jobRole: string,
  evaluation: InterviewEvaluation,
  questionAnswers: Array<{
    question: string;
    answer: string;
    score: number;
  }>
): Promise<string> {
  try {
    const prompt = `Generate a personalized interview feedback report for ${candidateName} who interviewed for a ${jobRole} position.

    Performance Summary:
    - Communication: ${evaluation.communicationScore}/100
    - Technical: ${evaluation.technicalScore}/100  
    - Confidence: ${evaluation.confidenceScore}/100
    - Overall: ${evaluation.overallScore}/100

    Strengths: ${evaluation.strengths.join(', ')}
    Areas for Improvement: ${evaluation.improvements.join(', ')}

    Create a professional, encouraging feedback report that:
    1. Starts with positive highlights
    2. Provides specific examples from their answers
    3. Offers constructive suggestions for improvement
    4. Ends with encouraging next steps
    5. Maintains a supportive, professional tone

    Format as a structured report suitable for PDF generation.`;

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are a professional HR consultant creating detailed, constructive interview feedback reports. Write in a professional yet encouraging tone."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return response.choices[0].message.content || "Feedback report could not be generated.";
  } catch (error) {
    console.error("Error generating personalized feedback:", error);
    throw new Error("Failed to generate personalized feedback");
  }
}
