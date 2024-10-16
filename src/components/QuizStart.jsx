import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [amount, setAmount] = useState(10);

  const handleStart = () => {
    onStartQuiz(selectedCategory, selectedDifficulty, amount);
  };

  return (
    <div className="quiz-start">
      <h2 className="text-2xl font-bold">Start Quiz</h2>
      
      <label className="block mt-4">
        Select Category:
        <select
          className="mt-2 p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      
      <label className="block mt-4">
        Select Difficulty:
        <select
          className="mt-2 p-2 border rounded"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      
      <label className="block mt-4">
        Number of Questions:
        <input
          type="number"
          value={amount}
          min="5"
          max="50"
          className="mt-2 p-2 border rounded"
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      
      <button onClick={handleStart} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
