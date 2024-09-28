// src/components/ScoreSummary.jsx
import React from 'react';

const ScoreSummary = ({ score, total, answers, restartQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-4">Your Score: {score} / {total}</p>
        <div className="mb-4">
          {answers.map((ans, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold" dangerouslySetInnerHTML={{ __html: ans.question }}></p>
              <p className={`ml-4 ${ans.isCorrect ? 'text-green-600' : 'text-red-600'}`} dangerouslySetInnerHTML={{ __html: ans.selectedAnswer }}></p>
            </div>
          ))}
        </div>
        <button onClick={restartQuiz} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Retake Quiz</button>
      </div>
    </div>
  );
};

export default ScoreSummary;
