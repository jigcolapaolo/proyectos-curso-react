import "./App.css";
import { Router, Route, Link } from "jin-router";
import HomePage from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Route
        path="/"
        Component={HomePage}
      />
      <Route
        path="/about"
        Component={() => {
          return (
            <>
              <h1>About</h1>
              <Link to="/">Go to Home</Link>
            </>
          );
        }}
      />
      <Route
        path="/search/:query"
        Component={({ routeParams }) => {
          return (
            <>
              <h1>Buscaste {routeParams.query} </h1>
              <Link to="/">Go to Home</Link>
            </>
          );
        }}
      />
    </Router>
  );
}
