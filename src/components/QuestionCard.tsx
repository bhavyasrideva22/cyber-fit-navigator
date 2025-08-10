import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Question } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  currentSection: string;
  existingAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  currentSection,
  existingAnswer,
  onAnswer,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>(existingAnswer || '');

  useEffect(() => {
    setSelectedAnswer(existingAnswer || '');
  }, [existingAnswer, question.id]);

  const handleAnswerChange = (value: string) => {
    const answer = question.type === 'likert' ? parseInt(value) : value;
    setSelectedAnswer(answer);
    onAnswer(answer);
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'psychometric':
        return 'Psychometric Assessment';
      case 'technical':
        return 'Technical Aptitude';
      case 'wiscar':
        return 'WISCAR Framework Analysis';
      default:
        return 'Assessment';
    }
  };

  const renderLikertScale = () => (
    <RadioGroup
      value={selectedAnswer.toString()}
      onValueChange={handleAnswerChange}
      className="flex flex-col space-y-4"
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
          <RadioGroupItem value={value.toString()} id={`option-${value}`} />
          <Label htmlFor={`option-${value}`} className="flex-1 cursor-pointer">
            <div className="flex justify-between items-center">
              <span>{value}</span>
              <span className="text-sm text-muted-foreground">
                {value === 1 && 'Strongly Disagree'}
                {value === 2 && 'Disagree'}
                {value === 3 && 'Neutral'}
                {value === 4 && 'Agree'}
                {value === 5 && 'Strongly Agree'}
              </span>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultipleChoice = () => (
    <RadioGroup
      value={selectedAnswer.toString()}
      onValueChange={handleAnswerChange}
      className="space-y-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
          <RadioGroupItem value={option} id={`option-${index}`} />
          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-cyber-blue">
              {getSectionTitle(currentSection)}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-gradient-card border-border mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.type === 'likert' && renderLikertScale()}
            {question.type === 'multiple-choice' && renderMultipleChoice()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="cyber-outline"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            variant={selectedAnswer ? "cyber" : "outline"}
            onClick={onNext}
            disabled={!canGoNext || !selectedAnswer}
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}