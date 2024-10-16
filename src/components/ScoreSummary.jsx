import React from 'react';

const ScoreSummary = ({ score, total, onRetakeQuiz }) => {
  return (
    <div className="score-summary bg-white p-4 border rounded shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-xl mb-4">You scored {score} out of {total}</p>

      <button onClick={onRetakeQuiz} className="p-2 bg-blue-500 text-white rounded">
        Retake Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
