import type { Question, AnswerRecord } from '../types';
import { Button } from '../components/Button';
import { Home, Check, X } from 'lucide-react';

interface ResultScreenProps {
  questions: Question[];
  answers: AnswerRecord[];
  onReturnToTop: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ questions, answers, onReturnToTop }) => {
  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalCount = questions.length;
  const scorePercentage = (correctCount / totalCount) * 100;
  const isPass = scorePercentage >= 90;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-in pb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl text-gray-400 font-bold mb-4">最終スコア</h2>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-6xl md:text-7xl font-extrabold text-white">
            {correctCount}
            <span className="text-3xl text-gray-500">/{totalCount}</span>
          </span>
        </div>
        
        <div className={`inline-block px-8 py-3 rounded-full text-2xl font-bold shadow-lg ${
          isPass 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isPass ? '合格圏内です！ 🎉' : '不合格... 復習しましょう！'}
        </div>
      </div>

      <div className="space-y-8 mb-12">
        <h3 className="text-xl font-bold text-gray-200 border-b border-gray-700 pb-2">全問振り返り</h3>
        
        {questions.map((q, index) => {
          const answerRecord = answers.find(a => a.questionId === q.id);
          const isCorrect = answerRecord?.isCorrect;
          
          return (
            <div key={q.id} className="bg-gray-800/60 border border-gray-700 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-5 md:p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`mt-1 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${
                    isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-bold mb-1">第{index + 1}問</h4>
                    <p className="text-gray-100 font-medium leading-relaxed">{q.question}</p>
                  </div>
                </div>

                <div className="ml-12">
                  <div className="flex items-center gap-3 text-sm mb-4">
                    <span className="text-gray-400">あなたの回答:</span>
                    <span className={`font-bold ${answerRecord?.userAnswer === q.answer ? 'text-green-400' : 'text-red-400'}`}>
                      {answerRecord?.userAnswer ? '〇' : '✕'}
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400">正解:</span>
                    <span className="font-bold text-blue-400">
                      {q.answer ? '〇' : '✕'}
                    </span>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-4 text-sm text-gray-300 leading-relaxed mb-4 border border-gray-800">
                    <p><span className="font-bold text-gray-400 mr-2">解説:</span>{q.explanation}</p>
                  </div>
                  
                  {q.illustrationUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-gray-700 max-w-sm">
                      <img src={q.illustrationUrl} alt="解説イラスト" className="w-full h-auto object-cover opacity-80" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 flex justify-center">
        <div className="w-full max-w-xl">
          <Button onClick={onReturnToTop} fullWidth variant="primary" className="py-4 shadow-xl">
            <Home className="w-5 h-5 mr-2" /> トップページに戻る
          </Button>
        </div>
      </div>
    </div>
  );
};
