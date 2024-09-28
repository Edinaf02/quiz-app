// src/pages/Quiz.jsx
import React from 'react';
import QuestionCard from '../components/QuestionCard';
import { useNavigate } from 'react-router-dom';

const Quiz = ({ question, onAnswer }) => {
  const navigate = useNavigate();

  const handleAnswer = (isCorrect, selectedAnswer) => {
    onAnswer(isCorrect, selectedAnswer);
    if (currentQuestionIndex + 1 >= quizData.length) {
      navigate('/summary');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <QuestionCard question={question} onAnswer={onAnswer} />
    </div>
  );
};

export default Quiz;
