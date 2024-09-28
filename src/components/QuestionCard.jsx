// src/components/QuestionCard.jsx
import React, { useState } from 'react';

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const QuestionCard = ({ question, onAnswer }) => {
  const [selected, setSelected] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const allAnswers = shuffleArray([
    ...question.incorrect_answers,
    question.correct_answer
  ]);

  const handleSelect = (answer) => {
    setSelected(answer);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    onAnswer(selected === question.correct_answer, selected);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question.question }}></h2>
      <div className="flex flex-col">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            className={`mb-2 p-2 border rounded ${
              isSubmitted
                ? answer === question.correct_answer
                  ? 'bg-green-200'
                  : answer === selected
                  ? 'bg-red-200'
                  : ''
                : selected === answer
                ? 'bg-blue-100'
                : ''
            }`}
            onClick={() => handleSelect(answer)}
            disabled={isSubmitted}
            dangerouslySetInnerHTML={{ __html: answer }}
          ></button>
        ))}
      </div>
      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="mt-4 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      )}
      {isSubmitted && (
        <p className="mt-4">
          {selected === question.correct_answer ? '✅ Correct!' : `❌ Incorrect! Correct Answer: ${question.correct_answer}`}
        </p>
      )}
    </div>
  );
};

export default QuestionCard;
