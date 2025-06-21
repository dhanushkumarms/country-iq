// File: src/components/FlagFrenzy.tsx

import React, { useEffect, useState } from "react";
import { countries } from "../data/countries";
import "./FlagFrenzy.css";

interface Country {
  name: string;
  flag: string;
}

interface Question {
  correct: Country;
  options: Country[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const generateQuestions = (count: number): Question[] => {
  const shuffled = shuffleArray(countries);
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    const correct = shuffled[i];
    const options = shuffleArray([
      correct,
      ...shuffleArray(countries.filter(c => c.name !== correct.name)).slice(0, 3),
    ]);
    questions.push({ correct, options });
  }
  return questions;
};

const FlagFrenzy: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    setQuestions(generateQuestions(10));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = () => {
    if (!submitted && selected) {
      if (selected === questions[currentIndex].correct.name) {
        setScore(s => s + 1);
      }
      setSubmitted(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelected("");
      setSubmitted(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setSelected("");
      setSubmitted(false);
    }
  };

  const handleFinish = () => {
    alert(`Quiz finished! Your score is ${score}/10.`);
    // you can redirect to ResultScreen here
  };

  if (questions.length === 0) return <div>Loading...</div>;

  const { correct, options } = questions[currentIndex];

  return (
    <div className="flag-frenzy">
      <div className="header">
        <h2>🌍 Flag Frenzy</h2>
        <p>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</p>
      </div>

      <img
        src={new URL(`../assets${correct.flag}`, import.meta.url).href}
        alt="Flag"
        className="flag-image"
      />

      <form className="options">
        {options.map(opt => (
          <label key={opt.name}>
            <input
              type="radio"
              name="country"
              value={opt.name}
              disabled={submitted}
              checked={selected === opt.name}
              onChange={() => setSelected(opt.name)}
            />
            {opt.name}
          </label>
        ))}
      </form>

      <div className="actions">
        {currentIndex > 0 && <button onClick={handlePrevious}>&lt;</button>}

        {!submitted ? (
          <button disabled={!selected} onClick={handleSubmit}>Submit</button>
        ) : currentIndex === questions.length - 1 ? (
          <button onClick={handleFinish}>Finish</button>
        ) : (
          <button onClick={handleNext}>&gt;</button>
        )}
      </div>
    </div>
  );
};

export default FlagFrenzy;
