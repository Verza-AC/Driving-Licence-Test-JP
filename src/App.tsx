import { useQuiz } from './hooks/useQuiz';
import { StartScreen } from './screens/StartScreen';
import { TestScreen } from './screens/TestScreen';
import { ResultScreen } from './screens/ResultScreen';

function App() {
  const {
    currentScreen,
    questions,
    currentQuestion,
    currentIndex,
    answers,
    isAnswered,
    startQuiz,
    returnToTop,
    answerQuestion,
    nextQuestion,
    questionSets
  } = useQuiz();

  return (
    <div className="min-h-screen bg-[#121212] text-gray-200 font-sans selection:bg-blue-500/30">
      {currentScreen === 'start' && (
        <StartScreen onStart={startQuiz} questionSets={questionSets} />
      )}
      
      {currentScreen === 'test' && currentQuestion && (
        <TestScreen 
          question={currentQuestion}
          currentIndex={currentIndex}
          total={questions.length}
          isAnswered={isAnswered}
          userAnswer={answers.find(a => a.questionId === currentQuestion.id)?.userAnswer}
          onAnswer={answerQuestion}
          onNext={nextQuestion}
        />
      )}
      
      {currentScreen === 'result' && (
        <ResultScreen 
          questions={questions}
          answers={answers}
          onReturnToTop={returnToTop}
        />
      )}
    </div>
  );
}

export default App;
