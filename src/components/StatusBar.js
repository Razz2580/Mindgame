import "./StatusBar.css";

function StatusBar({ points, index }) {
  return (
    <div className="status-bar">
      <progress value={index + 1} max={15}></progress>
      <div className="status-bar-desc">
        <p>Question: {index + 1}/15</p>
        <p>Points: {points}/280</p>
      </div>
    </div>
  );
}

export default StatusBar;
