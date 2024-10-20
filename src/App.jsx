import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from './services/triviaAPI';
import QuizStart from './components/QuizStart';
import QuestionCard from './components/QuestionCard';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory';
import Logo from './components/Logo';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [error, setError] = useState(null);

  // Fetch quiz history from localStorage when component mounts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    setHistory(storedHistory);
  }, []);

  // Fetch quiz categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://opentdb.com/api_category.php');
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        setError('Failed to load quiz categories. Please try again.');
      }
    };
    fetchCategories();
  }, []);

  // Start the quiz with selected options
  const startQuiz = async (categoryId, categoryName, difficulty, amount) => {
    try {
      const fetchedQuestions = await fetchQuizQuestions(categoryId, difficulty, amount);
      if (fetchedQuestions.length === 0) {
        throw new Error('No questions available for the selected options.');
      }
      setQuestions(fetchedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswers([]);
      setSelectedCategoryName(categoryName);
      setSelectedDifficulty(difficulty);
      setQuizStarted(true);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to fetch quiz questions. Please try again.');
    }
  };

  // Handle answer selection and move to next question
  const handleAnswerSelect = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  // Handle moving to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Finish the quiz and save results to history
  const finishQuiz = () => {
    const newEntry = {
      topic: selectedCategoryName,
      difficulty: selectedDifficulty,
      score,
      total: questions.length,
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
    setQuizStarted(false);
  };

  // Retake the quiz
  const retakeQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setError(null);
  };

  // Clear quiz history from localStorage
  const clearHistory = () => {
    localStorage.removeItem('quizHistory');
    setHistory([]);
  };

  return (
    <div className="bg-purple-50 min-h-screen flex flex-col justify-between">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 text-purple-900">
        
        <div className="w-6 h-16 bg-blue-500"><Logo /></div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md relative mb-6 max-w-lg w-full">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
            <button className="absolute right-0 top-0 mt-2 mr-2 text-red-700 hover:text-red-900" onClick={() => setError(null)}>
              <span>&times;</span>
            </button>
          </div>
        )}

        {!quizStarted && questions.length === 0 && !error && (
          <QuizStart categories={categories} onStartQuiz={startQuiz} />
        )}

        {!quizStarted && questions.length > 0 && (
          <>
            <ScoreSummary
              score={score}
              total={questions.length}
              questions={questions}
              userAnswers={userAnswers}
              onRetakeQuiz={retakeQuiz}
            />
            {history.length > 0 && (
              <QuizHistory history={history} clearHistory={clearHistory} />
            )}
          </>
        )}

        {quizStarted && (
          <QuestionCard
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            score={score}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
