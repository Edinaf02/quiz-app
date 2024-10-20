import React from 'react';

const QuizHistory = ({ history }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">Quiz History</h2>
      <ul className="divide-y divide-gray-300">
        {history.map((quiz, index) => (
          <li key={index} className="py-2">
            <div className="flex justify-between">
              <span className="font-medium">{quiz.category}</span>
              <span className={`font-bold ${quiz.score >= quiz.total ? 'text-green-500' : 'text-red-500'}`}>
                {quiz.score} / {quiz.total}
              </span>
            </div>
            <p className="text-sm text-gray-600">Date: {quiz.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizHistory;
