import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentForm from "./Components/StudentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
