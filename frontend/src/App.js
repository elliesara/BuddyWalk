import Front from "./pages/Front";
import Login from "./pages/Login";
import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Front user="Selina1" />
    // <Login />
  );
}

export default App;
