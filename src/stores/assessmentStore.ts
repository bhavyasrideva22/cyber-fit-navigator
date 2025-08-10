import { create } from 'zustand';
import { AssessmentStore, AssessmentResponse, AssessmentResults } from '@/types/assessment';
import { getAllQuestions, psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';

interface AssessmentStoreState extends AssessmentStore {
  startAssessment: () => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitResponse: (response: AssessmentResponse) => void;
  calculateResults: () => AssessmentResults;
  resetAssessment: () => void;
  getCurrentSection: () => 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  getCurrentQuestion: () => any;
}

export const useAssessmentStore = create<AssessmentStoreState>((set, get) => ({
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
  timeStarted: null,
  timeCompleted: null,

  startAssessment: () => {
    set({
      currentSection: 'psychometric',
      currentQuestionIndex: 0,
      responses: [],
      timeStarted: new Date(),
      timeCompleted: null,
    });
  },

  nextQuestion: () => {
    const state = get();
    const allQuestions = getAllQuestions();
    const nextIndex = state.currentQuestionIndex + 1;

    if (nextIndex >= allQuestions.length) {
      set({
        currentSection: 'results',
        timeCompleted: new Date(),
      });
      return;
    }

    let newSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results' = state.currentSection;
    if (nextIndex >= psychometricQuestions.length + technicalQuestions.length) {
      newSection = 'wiscar';
    } else if (nextIndex >= psychometricQuestions.length) {
      newSection = 'technical';
    }

    set({
      currentQuestionIndex: nextIndex,
      currentSection: newSection,
    });
  },

  previousQuestion: () => {
    const state = get();
    if (state.currentQuestionIndex > 0) {
      const prevIndex = state.currentQuestionIndex - 1;
      let newSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results' = 'psychometric';
      
      if (prevIndex >= psychometricQuestions.length + technicalQuestions.length) {
        newSection = 'wiscar';
      } else if (prevIndex >= psychometricQuestions.length) {
        newSection = 'technical';
      }

      set({
        currentQuestionIndex: prevIndex,
        currentSection: newSection,
      });
    }
  },

  submitResponse: (response: AssessmentResponse) => {
    const state = get();
    const existingIndex = state.responses.findIndex(r => r.questionId === response.questionId);
    
    if (existingIndex >= 0) {
      const newResponses = [...state.responses];
      newResponses[existingIndex] = response;
      set({ responses: newResponses });
    } else {
      set({ responses: [...state.responses, response] });
    }
  },

  calculateResults: (): AssessmentResults => {
    const state = get();
    const responses = state.responses;

    // Calculate psychometric score (average of likert scale responses)
    const psychometricResponses = responses.filter(r => 
      psychometricQuestions.some(q => q.id === r.questionId)
    );
    const psychometricScore = psychometricResponses.length > 0 
      ? (psychometricResponses.reduce((sum, r) => sum + (r.answer as number), 0) / psychometricResponses.length / 5) * 100
      : 0;

    // Calculate technical score (percentage of correct answers)
    const technicalResponses = responses.filter(r => 
      technicalQuestions.some(q => q.id === r.questionId)
    );
    const correctTechnical = technicalResponses.filter(r => {
      const question = technicalQuestions.find(q => q.id === r.questionId);
      return question && question.correctAnswer === r.answer;
    });
    const technicalScore = technicalResponses.length > 0 
      ? (correctTechnical.length / technicalResponses.length) * 100
      : 0;

    // Calculate WISCAR scores
    const wiscarResponses = responses.filter(r => 
      wiscarQuestions.some(q => q.id === r.questionId)
    );
    
    const wiscarScores = {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0,
    };

    Object.keys(wiscarScores).forEach(key => {
      const categoryResponses = wiscarResponses.filter(r => {
        const question = wiscarQuestions.find(q => q.id === r.questionId);
        return question && question.subcategory === key;
      });
      
      if (categoryResponses.length > 0) {
        wiscarScores[key as keyof typeof wiscarScores] = 
          (categoryResponses.reduce((sum, r) => sum + (r.answer as number), 0) / categoryResponses.length / 5) * 100;
      }
    });

    // Calculate overall score
    const overallScore = (psychometricScore + technicalScore + 
      Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6) / 3;

    // Determine recommendation
    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overallScore >= 75) recommendation = 'yes';
    else if (overallScore >= 50) recommendation = 'maybe';

    // Generate insights and next steps
    const insights = [
      `Your analytical thinking shows ${psychometricScore > 70 ? 'strong' : 'developing'} aptitude for malware analysis.`,
      `Technical knowledge is ${technicalScore > 70 ? 'solid' : 'an area for growth'}.`,
      `Your motivation and interest levels are ${wiscarScores.will > 70 ? 'high' : 'moderate'}.`
    ];

    const nextSteps = recommendation === 'yes' 
      ? [
          'Enroll in advanced malware analysis courses',
          'Set up a home lab for practicing reverse engineering',
          'Join cybersecurity communities and forums',
          'Consider pursuing relevant certifications (GREM, GCFA)'
        ]
      : recommendation === 'maybe'
      ? [
          'Focus on building stronger technical foundations',
          'Take introductory cybersecurity courses',
          'Practice with beginner-friendly malware samples',
          'Reassess your interest and commitment to the field'
        ]
      : [
          'Consider alternative cybersecurity roles',
          'Explore related fields like network security or incident response',
          'Develop foundational IT skills before revisiting malware analysis',
          'Seek career counseling to identify better-aligned paths'
        ];

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      confidence: Math.min(95, Math.max(60, overallScore + 10)),
      insights,
      nextSteps,
    };
  },

  resetAssessment: () => {
    set({
      currentSection: 'intro',
      currentQuestionIndex: 0,
      responses: [],
      timeStarted: null,
      timeCompleted: null,
    });
  },

  getCurrentSection: () => get().currentSection,

  getCurrentQuestion: () => {
    const state = get();
    const allQuestions = getAllQuestions();
    return allQuestions[state.currentQuestionIndex];
  },
}));