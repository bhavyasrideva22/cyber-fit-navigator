import { useAssessmentStore } from '@/stores/assessmentStore';
import { AssessmentIntro } from '@/components/AssessmentIntro';
import { QuestionCard } from '@/components/QuestionCard';
import { ResultsPage } from '@/components/ResultsPage';
import { getAllQuestions } from '@/data/questions';

const Index = () => {
  const {
    currentSection,
    currentQuestionIndex,
    responses,
    startAssessment,
    nextQuestion,
    previousQuestion,
    submitResponse,
    calculateResults,
    resetAssessment,
    getCurrentQuestion,
  } = useAssessmentStore();

  const allQuestions = getAllQuestions();
  const currentQuestion = getCurrentQuestion();

  const handleAnswerSubmit = (answer: string | number) => {
    if (currentQuestion) {
      submitResponse({
        questionId: currentQuestion.id,
        answer,
      });
    }
  };

  const getExistingAnswer = () => {
    if (!currentQuestion) return undefined;
    const existingResponse = responses.find(r => r.questionId === currentQuestion.id);
    return existingResponse?.answer;
  };

  if (currentSection === 'intro') {
    return <AssessmentIntro onStart={startAssessment} />;
  }

  if (currentSection === 'results') {
    const results = calculateResults();
    return <ResultsPage results={results} onRestart={resetAssessment} />;
  }

  if (currentQuestion) {
    return (
      <QuestionCard
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={allQuestions.length}
        currentSection={currentSection}
        existingAnswer={getExistingAnswer()}
        onAnswer={handleAnswerSubmit}
        onNext={nextQuestion}
        onPrevious={previousQuestion}
        canGoNext={true}
        canGoPrevious={currentQuestionIndex > 0}
      />
    );
  }

  return null;
};

export default Index;