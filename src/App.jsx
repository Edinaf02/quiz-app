// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizStart from './components/QuizStart';
import Quiz from './pages/Quiz';
import ScoreSummary from './components/ScoreSummary';
import QuizHistory from './components/QuizHistory'; // Optional
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [quizSettings, setQuizSettings] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const startQuiz = (settings) => {
    setQuizSettings(settings);
    fetchQuizData(settings);.then(() => {
      navigate('/quiz');
   });
  };

  const fetchQuizData = async (settings) => {
    const { category, difficulty, amount } = settings;
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`);
      const data = await res.json();
      setQuizData(data.results);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleAnswer = (isCorrect, selectedAnswer) => {
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, { question: quizData[currentQuestionIndex].question, selectedAnswer, isCorrect }]);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const restartQuiz = () => {
    setQuizSettings(null);
    setQuizData([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
  };

  const addToHistory = () => {
    const newEntry = {
      category: quizSettings.category,
      difficulty: quizSettings.difficulty,
      score,
      total: quizData.length,
      date: new Date().toLocaleString(),
    };
    setHistory(prev => [...prev, newEntry]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizStart startQuiz={startQuiz} />} />
        <Route
          path="/quiz"
          element={
            quizData.length > 0 && currentQuestionIndex < quizData.length ? (
              <Quiz
                question={quizData[currentQuestionIndex]}
                onAnswer={handleAnswer}
              />
            ) : (
              <ScoreSummary
                score={score}
                total={quizData.length}
                answers={answers}
                restartQuiz={restartQuiz}
              />
            )
          }
        />
        <Route path="/history" element={<QuizHistory history={history} />} />
      </Routes>
    </Router>
  );
};

export default App;
