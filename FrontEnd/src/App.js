import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Use Routes instead of Switch
import TenderForm from "./components/tenderFormComponent/TenderForm";
import TenderDetails from "./components/tenderDetailsComponent/TenderDetails ";
import Tender from "./pages/Tender";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Tender />} />
          <Route path="/addTender" element={<TenderForm />} />
          <Route path="/tenders/:id" element={<TenderDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
