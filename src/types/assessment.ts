export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'yes-no' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  options?: string[];
  correctAnswer?: string;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  confidence: number;
  insights: string[];
  nextSteps: string[];
}

export interface AssessmentStore {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  timeStarted: Date | null;
  timeCompleted: Date | null;
}