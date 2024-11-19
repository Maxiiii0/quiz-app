import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

interface QuestionType {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: QuestionType[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which of these is a JavaScript framework?",
    options: ["Angular", "Python", "Java", "C++"],
    correctAnswer: "Angular",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Jane Austen"],
    correctAnswer: "Harper Lee",
  },
  {
    question: "What is the speed of light?",
    options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^5 m/s", "3 x 10^7 m/s"],
    correctAnswer: "3 x 10^8 m/s",
  },
];

interface QuestionProps {
  question: string;
  options: string[];
  handleAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  handleAnswer,
}) => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{question}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 transition duration-300"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

interface QuestionScreenProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ setScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    if (!answered) {
      setUserAnswer(answer);
      setAnswered(true);
      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setUserAnswer(null);
    } else {
      navigate("/final-score");
    }
  };

  const { question, options } = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Question
        question={question}
        options={options}
        handleAnswer={handleAnswer}
      />
      {answered && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold mb-4">
            Your answer: {userAnswer}
          </p>
          <button
            onClick={goToNextQuestion}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};

interface FinalScoreProps {
  score: number;
  totalQuestions: number;
}

const FinalScore: React.FC<FinalScoreProps> = ({ score, totalQuestions }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Your Final Score
        </h2>
        <p className="text-xl text-gray-700">
          You answered {score} out of {totalQuestions} questions correctly!
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [score, setScore] = useState<number>(0);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<QuestionScreen setScore={setScore} />} />
          <Route
            path="/final-score"
            element={
              <FinalScore score={score} totalQuestions={questions.length} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
