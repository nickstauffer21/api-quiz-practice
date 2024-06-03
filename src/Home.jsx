import React from "react";
import "./style.css";

export default function Home(props) {
  return (
    <div className="loader-main">
      <h1 className="loader-title">Quizzical</h1>
      <div className="loader-text">Take a quiz</div>
      <button className="loader-button" onClick={() => props.home()}>
        Start Quiz
      </button>
    </div>
  );
}
