import Front from "./pages/Front";
import Login from "./pages/Login";
import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route path="/home/:user" element={<Front />}/>
      </Routes>
    </Router>
  );
}

export default App;
