import type { Question } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { Button } from '../components/Button';
import { Circle, X, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface TestScreenProps {
  question: Question;
  currentIndex: number;
  total: number;
  isAnswered: boolean;
  userAnswer?: boolean;
  onAnswer: (answer: boolean) => void;
  onNext: () => void;
}

export const TestScreen: React.FC<TestScreenProps> = ({
  question,
  currentIndex,
  total,
  isAnswered,
  userAnswer,
  onAnswer,
  onNext
}) => {
  const isCorrect = userAnswer === question.answer;

  return (
    <div className="flex flex-col min-h-[85vh] py-6 px-4 max-w-xl mx-auto animate-fade-in">
      <header className="mb-8">
        <ProgressBar current={currentIndex + 1} total={total} />
      </header>

      <main className="flex-grow flex flex-col justify-center space-y-8">
        <QuestionCard question={question.question} />

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="success" 
            onClick={() => onAnswer(true)} 
            disabled={isAnswered}
            className="h-24 md:h-32"
          >
            <Circle className="w-12 h-12 md:w-16 md:h-16" />
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onAnswer(false)} 
            disabled={isAnswered}
            className="h-24 md:h-32"
          >
            <X className="w-12 h-12 md:w-16 md:h-16" />
          </Button>
        </div>
      </main>

      {/* Feedback Overlay / Modal area */}
      {isAnswered && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl transform transition-all translate-y-0">
            <div className="flex items-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-400" />
              )}
              <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '正解！' : '残念...'}
              </h3>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                {question.explanation}
              </p>
            </div>

            <Button onClick={onNext} fullWidth className="py-4">
              {currentIndex < total - 1 ? '次の問題へ' : '結果を見る'} <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
