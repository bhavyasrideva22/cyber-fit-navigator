import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Brain, 
  Code, 
  Target,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="h-8 w-8 text-cyber-green" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-cyber-orange" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended';
      case 'maybe':
        return 'Consider with Preparation';
      case 'no':
        return 'Alternative Paths Suggested';
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'bg-cyber-green/20 text-cyber-green border-cyber-green';
      case 'maybe':
        return 'bg-cyber-orange/20 text-cyber-orange border-cyber-orange';
      case 'no':
        return 'bg-destructive/20 text-destructive border-destructive';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-cyber-green';
    if (score >= 50) return 'text-cyber-orange';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Assessment Results</h1>
          <p className="text-muted-foreground">
            Your personalized career readiness analysis for Malware Analysis
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              {getRecommendationIcon()}
            </div>
            <h2 className="text-2xl font-bold mb-2">{getRecommendationText()}</h2>
            <Badge className={`${getRecommendationColor()} text-lg px-4 py-2 mb-4`}>
              {results.confidence}% Confidence
            </Badge>
            <div className="text-4xl font-bold mb-2">
              <span className={getScoreColor(results.overallScore)}>
                {Math.round(results.overallScore)}%
              </span>
            </div>
            <p className="text-muted-foreground">Overall Compatibility Score</p>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardHeader className="text-center">
              <Brain className="h-8 w-8 text-cyber-purple mx-auto mb-2" />
              <CardTitle>Psychometric</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2">
                <span className={getScoreColor(results.psychometricScore)}>
                  {Math.round(results.psychometricScore)}%
                </span>
              </div>
              <Progress value={results.psychometricScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Personality & Motivation Fit
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="text-center">
              <Code className="h-8 w-8 text-cyber-blue mx-auto mb-2" />
              <CardTitle>Technical</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2">
                <span className={getScoreColor(results.technicalScore)}>
                  {Math.round(results.technicalScore)}%
                </span>
              </div>
              <Progress value={results.technicalScore} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Current Knowledge Level
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-cyber-green mx-auto mb-2" />
              <CardTitle>WISCAR</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-2xl font-bold mb-2">
                <span className={getScoreColor(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}>
                  {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}%
                </span>
              </div>
              <Progress value={Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Comprehensive Readiness
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle className="text-center">WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.wiscarScores).map(([key, score]) => (
                <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <span className="font-medium capitalize">
                    {key === 'realWorld' ? 'Real-World Alignment' : key}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Progress value={score} className="w-24" />
                    <span className={`font-bold ${getScoreColor(score)}`}>
                      {Math.round(score)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-cyber-blue" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {results.insights.map((insight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-cyber-green mt-0.5 flex-shrink-0" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-cyber-purple" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                  <div className="w-6 h-6 rounded-full bg-cyber-blue text-background flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-cyber-orange" />
              Career Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-cyber-blue">Learning Platforms</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cybrary - Free cybersecurity training</li>
                  <li>• SANS Institute - Professional courses</li>
                  <li>• Coursera - University-level programs</li>
                  <li>• Udemy - Practical malware analysis courses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-cyber-purple">Communities</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• r/Malware (Reddit community)</li>
                  <li>• DFIR Community</li>
                  <li>• InfoSec Twitter community</li>
                  <li>• Local cybersecurity meetups</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center">
          <Button 
            variant="cyber" 
            onClick={onRestart}
            className="mr-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Assessment Again
          </Button>
          <Button variant="cyber-outline">
            <Users className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
}