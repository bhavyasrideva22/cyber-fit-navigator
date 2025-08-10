import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Brain, Target, Clock, CheckCircle } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export function AssessmentIntro({ onStart }: AssessmentIntroProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-16 w-16 text-cyber-blue mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Malware Analyst Career Readiness Assessment
              </h1>
              <p className="text-xl text-muted-foreground">
                Psychotechnical Fit Assessment for Cybersecurity Professionals
              </p>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Brain className="h-12 w-12 text-cyber-purple mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Psychometric Analysis</h3>
              <p className="text-muted-foreground">
                Evaluate personality traits, cognitive style, and motivation for malware analysis work.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 text-cyber-green mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Technical Aptitude</h3>
              <p className="text-muted-foreground">
                Test foundational knowledge of malware analysis tools, techniques, and concepts.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-cyber-orange mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">WISCAR Framework</h3>
              <p className="text-muted-foreground">
                Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability, and Real-world alignment.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Learn */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">What You'll Discover</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-cyber-blue">Career Fit Analysis</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Personality compatibility with malware analysis work</li>
                  <li>• Cognitive strengths and areas for development</li>
                  <li>• Motivation assessment and career alignment</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-cyber-purple">Personalized Roadmap</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Customized learning recommendations</li>
                  <li>• Alternative career paths if needed</li>
                  <li>• Next steps and resources for growth</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Details */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-cyber-blue mr-2" />
              <span className="text-lg font-semibold">Assessment Details</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyber-blue">20-25</div>
                <div className="text-muted-foreground">Minutes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-purple">16</div>
                <div className="text-muted-foreground">Questions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-green">3</div>
                <div className="text-muted-foreground">Sections</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Career Information */}
        <Card className="bg-gradient-card border-border mb-8">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-center">Malware Analysis Career Overview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-cyber-blue">What Malware Analysts Do</h4>
                <p className="text-muted-foreground mb-4">
                  Malware analysts detect, dissect, and understand malicious software to protect organizations 
                  from cyber threats. They reverse engineer malware, create detection signatures, and provide 
                  threat intelligence.
                </p>
                <h4 className="font-semibold mb-2 text-cyber-purple">Typical Career Paths</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Malware Analyst</li>
                  <li>• Threat Intelligence Analyst</li>
                  <li>• Incident Response Specialist</li>
                  <li>• Reverse Engineer</li>
                  <li>• Cybersecurity Researcher</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-cyber-green">Essential Skills & Traits</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Strong analytical thinking</li>
                  <li>• Attention to detail</li>
                  <li>• Programming knowledge (Python, C++, Assembly)</li>
                  <li>• Understanding of operating systems</li>
                  <li>• Patience and persistence</li>
                  <li>• Curiosity about how systems work</li>
                  <li>• Ability to work with ambiguous data</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            variant="cyber" 
            size="lg" 
            onClick={onStart}
            className="text-lg px-12 py-6 h-auto"
          >
            <Shield className="h-6 w-6 mr-2" />
            Start Assessment
          </Button>
          <p className="text-muted-foreground mt-4">
            Your responses will be used to generate personalized career guidance
          </p>
        </div>
      </div>
    </div>
  );
}