import React from 'react';

interface QuestionCardProps {
  question: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm min-h-[180px] flex items-center justify-center">
      <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-gray-100 text-center">
        {question}
      </h2>
    </div>
  );
};
