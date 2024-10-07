import "./StartPage.css";

function StartPage({ dispatch }) {
  return (
    <div className="start-page">
      <h2 className="h2">Welcome to D-quiz</h2>
      <h3>15 questions to know yourself !</h3>
      <button onClick={() => dispatch({ type: "started" })}>START</button>
    </div>
  );
}

export default StartPage;
