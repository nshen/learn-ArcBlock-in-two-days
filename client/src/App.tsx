import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import Result from "./Result";
import Home from "./Home";
import { ResultContext } from "./ResultContext";

function App() {
  const [result, setResult] = useState<any>(null);

  return (
    <div className="App">
      <Router>
        <ResultContext.Provider value={[result, setResult]}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
          </Switch>
        </ResultContext.Provider>
      </Router>
    </div>
  );
}
export default App;
