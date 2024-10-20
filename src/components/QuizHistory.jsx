import React from 'react';

const QuizHistory = ({ history, clearHistory }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-center text-2xl font-bold text-purple-900 mb-4">Quiz History</h2>

      {history.length > 0 ? (
        <ul className="divide-y divide-gray-300 space-y-4">
          {history.map((quiz, index) => (
            <li key={index} className="p-4 border rounded bg-white shadow-sm">
              <div className="font-semibold text-gray-700">
                Topic: {quiz.topic}
              </div>
              <div className="text-gray-700">
                Score: {quiz.score} / {quiz.total}
              </div>
              <div className="text-gray-700">
                Difficulty: {quiz.difficulty}
              </div>
              <p className="text-sm text-gray-600">Date: {quiz.date}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No quiz history available.</p>
      )}

      {history.length > 0 && (
        <button
          className="w-full mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={clearHistory}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default QuizHistory;
