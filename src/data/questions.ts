import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych_1',
    text: 'I enjoy solving complex puzzles and problems that require deep thinking.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'analytical_thinking'
  },
  {
    id: 'psych_2',
    text: 'I am naturally curious about how systems and software work.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'curiosity'
  },
  {
    id: 'psych_3',
    text: 'I can work for hours on a single problem without getting frustrated.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'persistence'
  },
  {
    id: 'psych_4',
    text: 'I feel energized when faced with ambiguous or unclear situations.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'ambiguity_tolerance'
  },
  {
    id: 'psych_5',
    text: 'I prefer structured, methodical approaches to problem-solving.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'structured_thinking'
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech_1',
    text: 'What is the primary purpose of a debugger in malware analysis?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'tools',
    options: [
      'To create malware',
      'To step through code execution and examine program state',
      'To compress files',
      'To encrypt communications'
    ],
    correctAnswer: 'To step through code execution and examine program state'
  },
  {
    id: 'tech_2',
    text: 'Which of the following best describes static analysis?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'methodology',
    options: [
      'Running malware in a controlled environment',
      'Examining malware without executing it',
      'Creating network signatures',
      'Monitoring system calls'
    ],
    correctAnswer: 'Examining malware without executing it'
  },
  {
    id: 'tech_3',
    text: 'A PE header is commonly found in which type of files?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'file_formats',
    options: [
      'Linux executables only',
      'Windows executables and DLLs',
      'PDF documents only',
      'Network packets'
    ],
    correctAnswer: 'Windows executables and DLLs'
  },
  {
    id: 'tech_4',
    text: 'What is the purpose of code obfuscation in malware?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'evasion',
    options: [
      'To make code run faster',
      'To reduce file size',
      'To hide malicious intent from analysis',
      'To improve compatibility'
    ],
    correctAnswer: 'To hide malicious intent from analysis'
  },
  {
    id: 'tech_5',
    text: 'Which Python library is commonly used for malware analysis?',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'programming',
    options: [
      'matplotlib',
      'requests',
      'pefile',
      'flask'
    ],
    correctAnswer: 'pefile'
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'wiscar_1',
    text: 'How motivated are you to pursue a career in cybersecurity?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will'
  },
  {
    id: 'wiscar_2',
    text: 'How interested are you in understanding how malicious software works?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest'
  },
  {
    id: 'wiscar_3',
    text: 'How confident are you in your current technical skills?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill'
  },
  {
    id: 'wiscar_4',
    text: 'How well do you handle complex, multi-step problem solving?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive'
  },
  {
    id: 'wiscar_5',
    text: 'How open are you to learning new technical concepts?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability'
  },
  {
    id: 'wiscar_6',
    text: 'How well do your career goals align with working in cybersecurity?',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld'
  }
];

export const getAllQuestions = (): Question[] => [
  ...psychometricQuestions,
  ...technicalQuestions,
  ...wiscarQuestions
];