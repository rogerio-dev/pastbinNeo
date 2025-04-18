import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SharedCode from "./pages/SharedCode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code/:id" element={<SharedCode />} />
      </Routes>
    </Router>
  );
}

export default App;