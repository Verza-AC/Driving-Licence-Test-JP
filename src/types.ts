export interface Question {
  id: number;
  question: string;
  answer: boolean;
  explanation: string;
  illustrationUrl?: string;
}

export type AnswerRecord = {
  questionId: number;
  isCorrect: boolean;
  userAnswer: boolean;
};

export type ScreenState = 'start' | 'test' | 'result';

export interface QuestionSet {
  id: number;
  title: string;
  questions: Question[];
}
