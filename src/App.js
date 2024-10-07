import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import StartPage from "./components/StartPage";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Question from "./components/Question";
import StatusBar from "./components/StatusBar";
import Final from "./components/Final";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFetchFailed":
      return { ...state, status: "Error" };
    case "started":
      return { ...state, status: "active" };
    case "next":
      if (state.index >= 14) {
        return { ...state, status: "over" };
      }
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points: (state.points +=
          action.payload === state.questions[state.index].correctOption
            ? state.questions[state.index].points
            : 0),
      };
    case "ended":
      return { ...state, status: "over" };
    default:
      throw new Error("Action unknown!");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // console.log(state);

  useEffect(function fetchData() {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFetchFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "active" && (
          <StatusBar index={index} points={points}></StatusBar>
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartPage dispatch={dispatch} />}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
        {status === "over" && <Final />}
      </Main>
    </div>
  );
}

export default App;
