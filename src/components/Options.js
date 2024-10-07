import "./Options.css";
function Options({ question, dispatch, answer }) {
  // console.log(answer);

  return (
    <>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`option-btn ${answer === index ? "answer" : ""} ${
              answer !== null
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={answer !== null}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Options;
