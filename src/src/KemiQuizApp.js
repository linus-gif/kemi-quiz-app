import React, { useState } from "react";

// Frågebank
const allQuestions = [
  {
    question: "Vad är ett grundämne?",
    options: [
      "En blandning av flera olika ämnen",
      "Ett ämne som bara består av en sorts atomer",
      "Ett ämne som kan delas upp i flera ämnen",
      "Ett ämne med både metaller och icke-metaller",
    ],
    correctAnswer: 1,
    explanation: "Ett grundämne består bara av en sorts atomer.",
  },
  {
    question: "Vilket pH-värde har rent vatten?",
    options: ["1", "7", "10", "14"],
    correctAnswer: 1,
    explanation: "Rent vatten är neutralt och har pH 7.",
  },
  // Lägg till fler frågor här...
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function KemiQuizApp() {
  const [totalQuestions, setTotalQuestions] = useState(8);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    const number = Math.min(parseInt(totalQuestions), allQuestions.length);
    setQuizQuestions(shuffleArray(allQuestions).slice(0, number));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizStarted(true);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Starta quizet</h2>
        <label className="block mb-2">Hur många frågor vill du ha?</label>
        <input
          type="number"
          min="1"
          max={allQuestions.length}
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
          className="mb-4 p-2 border"
        />
        <button onClick={startQuiz} className="bg-blue-500 text-white px-4 py-2">
          Starta
        </button>
      </div>
    );
  }

  if (currentQuestion >= quizQuestions.length) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center p-6">
        <h2 className="text-2xl font-bold mb-4">
          Ditt resultat: {score}/{quizQuestions.length}
        </h2>
        <button onClick={restartQuiz} className="bg-blue-500 text-white px-4 py-2">
          Starta om quizet
        </button>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6">
      <h2 className="text-xl font-semibold mb-4">
        Fråga {currentQuestion + 1} av {quizQuestions.length}
      </h2>
      <p className="mb-4">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-2 border ${
              showResult && index === question.correctAnswer
                ? "bg-green-200"
                : showResult && index === selectedAnswer && index !== question.correctAnswer
                ? "bg-red-200"
                : ""
            }`}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="mt-4">
          <p>
            {selectedAnswer === question.correctAnswer
              ? "Rätt svar! ✅"
              : "Fel svar ❌"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Förklaring: {question.explanation}
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2" onClick={nextQuestion}>
            Nästa fråga
          </button>
        </div>
      )}
    </div>
  );
}
