import React, { useState } from 'react';
import type { QuestionSet } from '../types';
import { Button } from '../components/Button';
import { Car, ChevronRight, Shuffle, BookOpen, List, ArrowLeft, Construction } from 'lucide-react';

type TopView = 'top' | 'normal' | 'category';

interface StartScreenProps {
  onStart: (setId: number | 'random') => void;
  questionSets: QuestionSet[];
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, questionSets }) => {
  const [view, setView] = useState<TopView>('top');

  const normalSets = questionSets.filter(s => s.id <= 100);
  const categorySets = questionSets.filter(s => s.id > 100);

  const totalQuestions = normalSets.reduce((sum, s) => sum + s.questions.length, 0);

  // Top-level menu
  if (view === 'top') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-12 space-y-10 animate-fade-in max-w-lg mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600/10 rounded-full mb-4">
            <Car className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
            本免試験 <span className="text-blue-500">練習問題集</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            学習モードを選んでください。
          </p>
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <Button
            onClick={() => setView('normal')}
            fullWidth
            className="py-5 text-lg justify-between px-6 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-blue-500 transition-colors shadow-none"
          >
            <span className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <span className="text-left">
                通常問題集
                <span className="block text-sm text-gray-400 mt-0.5">ランダム出題・問題集その1〜10</span>
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Button>

          <Button
            onClick={() => setView('category')}
            fullWidth
            className="py-5 text-lg justify-between px-6 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-blue-500 transition-colors shadow-none"
          >
            <span className="flex items-center gap-3">
              <List className="w-6 h-6 text-purple-400" />
              <span className="text-left">
                項目別問題集
                <span className="block text-sm text-gray-400 mt-0.5">ジャンル別に問題を練習</span>
              </span>
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Button>
        </div>
      </div>
    );
  }

  // Normal question sets list
  if (view === 'normal') {
    return (
      <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 space-y-8 animate-fade-in max-w-lg mx-auto pb-20">
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">通常問題集</h2>
          <p className="text-gray-400 text-sm mb-6">問題集を選んで20問に挑戦しましょう。</p>
        </div>

        <div className="w-full space-y-4 flex flex-col">
          <Button
            onClick={() => onStart('random')}
            fullWidth
            variant="primary"
            className="py-4 text-lg justify-between px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white border-none shadow-lg shadow-blue-900/30 mb-2"
          >
            <span className="flex items-center gap-2">
              <Shuffle className="w-5 h-5" />
              ランダム出題 <span className="text-sm text-blue-200 ml-2">(全{totalQuestions}問から20問)</span>
            </span>
            <ChevronRight className="w-5 h-5 text-blue-200" />
          </Button>

          {normalSets.map((set) => (
            <Button
              key={set.id}
              onClick={() => onStart(set.id)}
              fullWidth
              className="py-4 text-lg justify-between px-6 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-blue-500 transition-colors shadow-none"
            >
              <span>{set.title} <span className="text-sm text-gray-400 ml-2">({set.questions.length}問)</span></span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          ))}

          <Button
            onClick={() => setView('top')}
            fullWidth
            className="py-4 text-lg justify-center gap-2 px-6 mt-6 bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800 hover:text-white hover:border-gray-600 transition-all shadow-none"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>トップメニューに戻る</span>
          </Button>
        </div>
      </div>
    );
  }

  // Category-based (placeholder)
  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8 space-y-8 animate-fade-in max-w-lg mx-auto pb-20">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">項目別問題集</h2>
        <p className="text-gray-400 text-sm mb-6">ジャンル別に問題を練習できます。</p>
      </div>

      <div className="w-full space-y-4 flex flex-col">
        {categorySets.length > 0 ? (
          categorySets.map((set) => (
            <Button
              key={set.id}
              onClick={() => onStart(set.id)}
              fullWidth
              className="py-4 text-lg justify-between px-6 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-purple-500 transition-colors shadow-none"
            >
              <span>{set.title} <span className="text-sm text-gray-400 ml-2">({set.questions.length}問)</span></span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Button>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-16 bg-gray-800/40 border border-gray-700 rounded-2xl">
            <Construction className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-xl font-bold text-gray-400 mb-2">準備中</p>
            <p className="text-sm text-gray-500">項目別問題集は現在作成中です。</p>
          </div>
        )}
      </div>

      <div className="w-full mt-8">
        <Button
          onClick={() => setView('top')}
          fullWidth
          className="py-4 text-lg justify-center gap-2 px-6 bg-gray-900 hover:bg-gray-800 text-gray-400 border border-gray-800 hover:text-white hover:border-gray-600 transition-all shadow-none"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>トップメニューに戻る</span>
        </Button>
      </div>
    </div>
  );
};
