import React from "react";
import "./style.css";
import he from "he";

export default function Questions({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerChange,
  submit,
}) {
  const handleInputChange = (event) => {
    const { value } = event.target;
    onAnswerChange(questionIndex, value);
  };

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  const decodedAnswers = answers.map((answer) => he.decode(answer));

  const correctStyle = {
    backgroundColor: "#94d7a2",
  };

  const incorrectStyle = {
    opacity: 0.7,
  };

  return (
    <div>
      <h3>{he.decode(question.question)}</h3>
      <ul className="radio-questions">
        {decodedAnswers.map((answer, index) => (
          <li className={"radio-buttons"} key={index}>
            <input
              id={`answer-${questionIndex}-${index}`}
              type="radio"
              name={`question-${questionIndex}`}
              value={answer}
              checked={selectedAnswer === answer}
              onChange={handleInputChange}
            />
            <label
              className="radio-input"
              htmlFor={`answer-${questionIndex}-${index}`}
              style={
                submit && answer === question.correct_answer
                  ? correctStyle
                  : submit && question.incorrect_answers.includes(answer)
                  ? incorrectStyle
                  : {}
              }
            >
              {answer}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
