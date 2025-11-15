import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, StopCircle, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import aiAvatar from '@/assets/ai-interviewer-avatar.jpg';

interface Message {
  id: string;
  role: 'ai' | 'candidate';
  content: string;
  timestamp: Date;
}

interface InterviewInterfaceProps {
  interviewId: string;
  candidateName: string;
  role: string;
  experienceYears: number;
  difficultyLevel: string;
  onEndInterview: () => void;
}

export default function InterviewInterface({
  interviewId,
  candidateName,
  role,
  experienceYears,
  difficultyLevel,
  onEndInterview
}: InterviewInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript && !isProcessingRef.current) {
          console.log('Final transcript:', finalTranscript);
          isProcessingRef.current = true;
          handleSendMessage(finalTranscript);
          setCurrentTranscript('');
          setTimeout(() => {
            isProcessingRef.current = false;
          }, 1000);
        } else {
          setCurrentTranscript(interimTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          // Restart recognition if no speech detected
          if (isListening) {
            recognitionRef.current?.start();
          }
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended, restarting...');
        // Auto-restart if still listening
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    // Initialize video stream
    const initVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 },
          audio: false 
        });
        setVideoStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initVideo();

    // Start interview with AI greeting
    startInterview();

    // Auto-start microphone
    setTimeout(() => {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
        console.log('Microphone started automatically');
      }
    }, 3000);

    // Subscribe to realtime messages
    const channel = supabase
      .channel(`interview-${interviewId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'interview_messages',
          filter: `interview_id=eq.${interviewId}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMessage.id,
            role: newMessage.role,
            content: newMessage.content,
            timestamp: new Date(newMessage.timestamp)
          }]);
          
          if (newMessage.role === 'ai') {
            speakText(newMessage.content);
          }
        }
      )
      .subscribe();

    return () => {
      recognitionRef.current?.stop();
      synthRef.current?.cancel();
      supabase.removeChannel(channel);
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startInterview = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/conduct-interview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [],
          role,
          experienceYears,
          difficultyLevel
        })
      });

      if (!response.ok) throw new Error('Failed to start interview');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiResponse += content;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      // Save AI message
      await supabase.from('interview_messages').insert({
        interview_id: interviewId,
        role: 'ai',
        content: aiResponse
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

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    try {
      // Save candidate message
      await supabase.from('interview_messages').insert({
        interview_id: interviewId,
        role: 'candidate',
        content: text
      });

      // Get AI response
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/conduct-interview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: text }
          ],
          role,
          experienceYears,
          difficultyLevel
        })
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                aiResponse += content;
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }

      // Save AI response
      await supabase.from('interview_messages').insert({
        interview_id: interviewId,
        role: 'ai',
        content: aiResponse
      });

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    }
  };

  const speakText = (text: string) => {
    if (!synthRef.current) return;
    
    setIsAISpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set female voice
    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Samantha') || 
      voice.name.includes('Victoria') ||
      voice.name.includes('Karen')
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.pitch = 1.1;
    utterance.rate = 0.9;
    utterance.onend = () => setIsAISpeaking(false);
    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: 'Not Supported',
        description: 'Speech recognition is not supported in your browser',
        variant: 'destructive'
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      console.log('Microphone stopped');
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        console.log('Microphone started');
      } catch (error) {
        console.error('Error starting microphone:', error);
      }
    }
  };

  const handleEndInterview = async () => {
    try {
      await supabase
        .from('interviews')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', interviewId);
      
      onEndInterview();
    } catch (error) {
      console.error('Error ending interview:', error);
      toast({
        title: 'Error',
        description: 'Failed to end interview',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Card className="p-4 bg-card border-border">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-foreground">{candidateName}</h1>
              <p className="text-sm text-muted-foreground">{role} • {experienceYears} years • {difficultyLevel}</p>
            </div>
            <Button onClick={handleEndInterview} variant="destructive" size="sm">
              <StopCircle className="mr-2 h-4 w-4" />
              End Interview
            </Button>
          </div>
        </Card>

        {/* Video Call Interface */}
        <div className="grid grid-cols-2 gap-4">
          {/* AI Interviewer Video */}
          <Card className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={aiAvatar} 
                alt="AI Interviewer" 
                className={`w-full h-full object-cover ${isAISpeaking ? 'ring-4 ring-primary animate-pulse' : ''}`}
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              <Video className="w-4 h-4" />
              AI Interviewer
              {isAISpeaking && <span className="text-xs bg-primary px-2 py-0.5 rounded-full">Speaking...</span>}
            </div>
          </Card>

          {/* User Video */}
          <Card className="relative aspect-video bg-black overflow-hidden">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover ${isListening ? 'ring-4 ring-destructive' : ''}`}
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {isListening ? (
                <>
                  <Mic className="w-4 h-4 text-destructive animate-pulse" />
                  <span>{candidateName}</span>
                  <span className="text-xs bg-destructive px-2 py-0.5 rounded-full">Listening...</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>{candidateName}</span>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Live Transcription */}
        <Card className="p-6 h-[350px] overflow-y-auto bg-card border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Live Conversation</h2>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'candidate' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.role === 'candidate'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">
                    {message.role === 'ai' ? 'AI Interviewer' : candidateName}
                  </p>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
            {currentTranscript && (
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-lg p-4 bg-primary/50 text-primary-foreground animate-pulse">
                  <p className="text-sm font-semibold mb-1">{candidateName} (speaking...)</p>
                  <p>{currentTranscript}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>
      </div>
    </div>
  );
}