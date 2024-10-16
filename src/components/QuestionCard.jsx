import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, onAnswerSelect, currentQuestionIndex, totalQuestions, score }) => {
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

  return (
    <div className="question-card bg-white p-4 border rounded shadow-md mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Question {currentQuestionIndex + 1} / {totalQuestions}</div>
        <div className="w-12 h-12 bg-green-600 text-white font-bold rounded-full flex items-center justify-center">
          {score}
        </div>
      </div>

      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

      <div className="grid grid-cols-1 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`p-2 rounded border ${selectedAnswer ? (answer === question.correct_answer ? 'bg-green-500' : answer === selectedAnswer ? 'bg-red-500' : 'bg-gray-200') : 'bg-gray-200'}`}
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={isAnswered}
          />
        ))}
      </div>

      {isAnswered && (
        <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={() => onAnswerSelect(selectedAnswer)}>
          Next
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
