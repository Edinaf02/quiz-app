import React from 'react';

const QuizHistory = ({ history, clearHistory }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {history.map((entry, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">Topic:</span> {entry.topic} <br />
              <span className="font-semibold">Difficulty:</span> {entry.difficulty} <br />
              <span className="font-semibold">Score:</span> {entry.score}/{entry.total} <br />
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={clearHistory}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Clear History
      </button>
    </div>
  );
};

export default QuizHistory;
