import "./Question.css";
import Options from "./Options";

function Question({ question, dispatch, answer }) {
  // console.log(question);

  return (
    <div className="question">
      <h2>{question.question}</h2>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {answer !== null ? (
        <button className="next-btn" onClick={() => dispatch({ type: "next" })}>
          NEXT
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Question;
