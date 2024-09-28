// src/components/QuizStart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizStart = ({ startQuiz }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    difficulty: '',
    amount: 10,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://opentdb.com/api_category.php');
        setCategories(res.data.trivia_categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startQuiz(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Quiz App</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Difficulty</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Number of Questions</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="1" max="50" required className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Start Quiz</button>
      </form>
    </div>
  );
};

export default QuizStart;
