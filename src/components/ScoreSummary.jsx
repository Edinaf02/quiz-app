import React from 'react';

const ScoreSummary = ({ score, total, onRetakeQuiz }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">Quiz Complete!</h2>
      <p className="text-xl mb-4">
        You scored <span className="font-bold text-purple-600">{score}</span> out of <span className="font-bold text-purple-600">{total}</span>
      </p>
      <button
        onClick={onRetakeQuiz}
        className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
