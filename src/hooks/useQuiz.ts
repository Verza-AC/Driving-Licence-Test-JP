import { useState } from 'react';
import questionsData from '../data/questions.json';
import type { Question, AnswerRecord, ScreenState, QuestionSet } from '../types';

export function useQuiz() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const startQuiz = (setId: number | 'random') => {
    if (setId === 'random') {
      const normalSets = questionsData.filter((set: any) => set.id <= 100);
      const allQuestions = normalSets.flatMap(set => set.questions);
      const shuffled = [...allQuestions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setQuestions(shuffled.slice(0, 20));
      setCurrentScreen('test');
      setCurrentIndex(0);
      setAnswers([]);
      setIsAnswered(false);
    } else {
      const selectedSet = (questionsData as QuestionSet[]).find(s => s.id === setId);
      if (selectedSet) {
        setQuestions(selectedSet.questions);
        setCurrentScreen('test');
        setCurrentIndex(0);
        setAnswers([]);
        setIsAnswered(false);
      }
    }
  };

  const returnToTop = () => {
    setCurrentScreen('start');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setIsAnswered(false);
  };

  const answerQuestion = (userAnswer: boolean) => {
    if (isAnswered) return;
    
    const currentQuestion = questions[currentIndex];
    const isCorrect = userAnswer === currentQuestion.answer;
    
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      isCorrect,
      userAnswer
    }]);
    
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsAnswered(false);
    } else {
      setCurrentScreen('result');
    }
  };

  return {
    currentScreen,
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    answers,
    isAnswered,
    startQuiz,
    returnToTop,
    answerQuestion,
    nextQuestion,
    questionSets: questionsData as QuestionSet[],
  };
}
