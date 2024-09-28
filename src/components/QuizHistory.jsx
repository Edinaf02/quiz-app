// src/components/QuizHistory.jsx
import React from 'react';

const QuizHistory = ({ history }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Quiz History</h2>
      {history.length === 0 ? (
        <p>No quizzes taken yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((quiz, index) => (
            <li key={index} className="p-2 border rounded">
              <p><strong>Category:</strong> {quiz.category}</p>
              <p><strong>Difficulty:</strong> {quiz.difficulty}</p>
              <p><strong>Score:</strong> {quiz.score} / {quiz.total}</p>
              <p><strong>Date:</strong> {quiz.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizHistory;
