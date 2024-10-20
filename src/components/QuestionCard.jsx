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
    <div className="w-[836px] h-[594px] relative bg-white flex flex-col items-center justify-center shadow-lg rounded-lg">
      {/* Progress Bar */}
      <div className="w-full mb-4 px-4">
        <div className="flex justify-center mb-4">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-center mx-2 font-semibold ${
                index <= currentQuestionIndex ? 'bg-purple-600 text-white' : 'bg-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Question Section */}
      <div className="w-full text-center">
        <h2 className="text-purple-800 text-2xl font-bold mb-6 px-6" dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-6 w-3/4 mt-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`w-full p-4 text-lg font-medium rounded-lg border transition-all duration-300 ease-in-out ${
              selectedAnswer
                ? answer === question.correct_answer
                  ? 'bg-green-500 text-white border-green-500'
                  : answer === selectedAnswer
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-gray-50 text-gray-800 border border-gray-300 hover:bg-purple-100 hover:border-purple-500'
            }`}
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
          className={`p-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
          onClick={onPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          className={`p-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md ${!isAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'}`}
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
