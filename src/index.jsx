import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
  // https://stackoverflow.com/questions/48846289/why-is-my-react-component-is-rendering-twice
  // <React.StrictMode>
  <Router>
    <App />
  </Router>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
