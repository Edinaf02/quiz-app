import React from 'react';

const ScoreSummary = ({ score, total, questions, userAnswers, onRetakeQuiz }) => {
  const shareUrl = window.location.href; // Current page URL
  const message = `I scored ${score} out of ${total} on this quiz! Can you beat my score?`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-purple-900 mb-4">Quiz Complete!</h2>
      <p className="text-xl mb-4">
        You scored <span className="font-bold text-purple-600">{score}</span> out of <span className="font-bold text-purple-600">{total}</span>
      </p>

      <h3 className="text-2xl font-bold mb-4">Summary of Answers</h3>

      <div className="text-left">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-bold text-purple-800" dangerouslySetInnerHTML={{ __html: question.question }} />
            <p className="text-sm">
              <span className={`font-bold ${userAnswers[index] === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                {userAnswers[index] === question.correct_answer ? 'Correct' : 'Incorrect'}
              </span>
              - Your Answer: <span dangerouslySetInnerHTML={{ __html: userAnswers[index] }} />
            </p>
            {userAnswers[index] !== question.correct_answer && (
              <p className="text-sm text-gray-500">
                Correct Answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Social Sharing Buttons */}
      <div className="my-4">
        <p className="mb-2 font-semibold">Share your score:</p>
        <div className="flex justify-center space-x-4">
          {/* Facebook Share */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Facebook
          </a>

          {/* WhatsApp Share */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(message + ' ' + shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <button
        onClick={onRetakeQuiz}
        className="p-2 mt-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Retake Quiz
      </button>
    </div>
  );
};

export default ScoreSummary;
