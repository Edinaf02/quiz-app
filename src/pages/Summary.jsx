// src/pages/Summary.jsx
import React, { useEffect } from 'react';
import ScoreSummary from '../components/ScoreSummary';
import { useNavigate } from 'react-router-dom';

const Summary = ({ score, total, answers, restartQuiz }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: Save to history or localStorage
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ScoreSummary score={score} total={total} answers={answers} restartQuiz={restartQuiz} />
    </div>
  );
};

export default Summary;
