import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, onAnswerSelect, currentQuestionIndex, totalQuestions, score, onNext, onPrevious }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    onAnswerSelect(answer);
  };

  // Calculate progress percentage for the progress bar
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-[836.02px] h-[594.50px] relative bg-white flex flex-col items-center justify-center">
      {/* Logo Section */}
      <div className="flex justify-start items-center mb-4">
        <div className="text-2xl font-bold text-purple-700">Quiz <span className="text-purple-900">Me</span></div>
        <img
          className="w-8 h-8 ml-2"
          src="https://via.placeholder.com/31x17"
          alt="Logo"
        />
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center items-center mb-4">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-center mx-2 ${index <= currentQuestionIndex ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500'}`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Question Section */}
      <div className="text-purple-800 text-2xl font-bold mb-6" dangerouslySetInnerHTML={{ __html: question.question }} />

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`p-4 rounded text-lg font-semibold border ${selectedAnswer ? (answer === question.correct_answer ? 'bg-green-500 text-white' : answer === selectedAnswer ? 'bg-red-500 text-white' : 'bg-gray-200') : 'bg-gray-200'}`}
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={isAnswered}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between w-full px-8">
        {/* Previous Button */}
        <button
          className={`p-2 bg-purple-700 text-white rounded ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          className={`p-2 bg-purple-700 text-white rounded ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onNext}
          disabled={!isAnswered}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
