import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // only set a timeout if time is greater than 0
    if (timeRemaining > 0) {
      const timeoutId = setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);

      // cleanup function clears the timeout
      return () => clearTimeout(timeoutId);
    } else {
      // time ran out
      setTimeRemaining(10); // reset for next question
      onAnswered(false); // treat unanswered as incorrect
    }
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
