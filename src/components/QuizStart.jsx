import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);

  // Filters categories based on search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(category.name);
    setDropdownOpen(false);
  };

  const handleStartQuiz = () => {
    if (selectedCategory && numQuestions > 0) {
      onStartQuiz(selectedCategory.id, selectedCategory.name, difficulty, numQuestions);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <div className="text-center mb-4">
        <span className="text-purple-900 text-8xl font-normal font-['Poppins']">Quiz </span>
        <span className="text-purple-600 text-8xl font-normal font-['Poppins']">Me</span>
        <img
          className="w-[98.08px] h-[55.95px] absolute origin-top-left rotate-[-14.58deg] mx-auto top-6"
          src="https://cdn.dribbble.com/users/925386/screenshots/11014795/guardian-logo-05.png"
          alt="Quiz Logo"
        />
      </div>

      {/* Searchable Dropdown for Categories */}
      <div className="mb-4 relative">
        <label className="block text-left text-2xl mb-2 text-black">
          Choose your favorite topic
        </label>
        <input
          type="text"
          placeholder="Search your favorite topic"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true);
          }}
          className="border px-4 py-2 rounded-md w-full bg-white text-gray-900"
        />
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-60 overflow-y-auto shadow-lg">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-200"
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-red-500">No categories found</li>
            )}
          </ul>
        )}
      </div>

      {/* Difficulty Selection */}
      <div className="mb-4">
        <label className="block text-left text-2xl mb-2 text-black">Choose your difficulty level</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-4 py-2 rounded-md w-full bg-white text-gray-900"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Number of Questions */}
      <div className="mb-4">
        <label className="block text-left text-2xl mb-2 text-black">Choose number of questions</label>
        <input
          type="number"
          min="1"
          max="50"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border px-4 py-2 rounded-md w-full bg-white text-gray-900"
        />
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className={`w-full p-3 bg-purple-600 rounded-md text-white text-lg font-semibold transition-colors ${
          !selectedCategory ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
        }`}
        disabled={!selectedCategory}
      >
        Let’s play!
      </button>
    </div>
  );
};

export default QuizStart;
