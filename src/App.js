import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import Home from "./Home";
import Loader from "./Loader";
import "./style.css";
import he from "he";

function App() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submit, setSubmit] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [userScore, setUserScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHome, setIsHome] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=31"
      );
      const data = await response.json();
      setQuestions(data.results);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching trivia:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(questions);

  const home = () => {
    setIsHome(true);
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(true);
    checkAnswers();
    checkScore();
  };

  const checkAnswers = () => {
    let correctAnswersObj = {};
    questions.forEach((question, index) => {
      correctAnswersObj[index] = he.decode(question.correct_answer);
    });
    setCorrectAnswers(correctAnswersObj);
  };

  const playAgain = (event) => {
    event.preventDefault();
    setSubmit(false);
    setSelectedAnswers({});
    fetchData();
  };

  const checkScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      const correctAnswer = he.decode(question.correct_answer);
      const selectedAnswer = selectedAnswers[index];
      if (correctAnswer === selectedAnswer) {
        score++;
      }
    });
    setUserScore(score);
  };

  return (
    <div>
      {isHome ? (
        <>
          {isLoaded ? (
            <div className="App">
              <h1>Trivia Questions</h1>
              <form onSubmit={submit ? playAgain : handleSubmit}>
                <div className="questions">
                  {questions.map((question, index) => (
                    <Questions
                      key={index}
                      question={question}
                      questionIndex={index}
                      selectedAnswer={selectedAnswers[index]}
                      onAnswerChange={handleAnswerChange}
                      submit={submit}
                      correctAnswers={correctAnswers[index]}
                    />
                  ))}
                </div>
                <div>{submit && `You scored ${userScore}/5`}</div>
                <button className="submit-button" type="submit">
                  {submit ? "Play Again" : "Check Answers"}
                </button>
              </form>
            </div>
          ) : (
            <Loader />
          )}
        </>
      ) : (
        <Home home={home} />
      )}
    </div>
  );
}

export default App;
