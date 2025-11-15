import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PreInterviewFormProps {
  onStartInterview: (data: {
    candidateName: string;
    role: string;
    experienceYears: number;
    difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  }) => void;
}

export default function PreInterviewForm({ onStartInterview }: PreInterviewFormProps) {
  const [candidateName, setCandidateName] = useState('');
  const [role, setRole] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !role || !experienceYears) return;
    
    onStartInterview({
      candidateName,
      role,
      experienceYears: parseInt(experienceYears),
      difficultyLevel
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AI Interview Platform
          </CardTitle>
          <CardDescription className="text-lg">
            Complete the form below to begin your AI-powered interview experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-base font-semibold">
                Position / Role
              </Label>
              <Input
                id="role"
                placeholder="e.g., Frontend Developer, Product Manager"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-base font-semibold">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty" className="text-base font-semibold">
                Difficulty Level
              </Label>
              <Select value={difficultyLevel} onValueChange={(value) => setDifficultyLevel(value as any)}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Start Interview
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
