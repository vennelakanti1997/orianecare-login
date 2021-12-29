import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import BenchCareGivers from "./pages/BenchCareGivers";
import ClosingServices from "./pages/ClosingServices";
import Complaint from "./pages/Complaint";
import DeployedCareGiver from "./pages/DeployedCareGiver";
import Feedback from "./pages/Feedback";
import FreshPatiens from "./pages/FreshPatiens";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import OnBoarding from "./pages/OnBoarding";
import PendingCollections from "./pages/PendingCollections";
import PendingDocuments from "./pages/PendingDocuments";

function App() {
  return (
    // <Container fluid className='w-100'>

    // </Container>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patients/onboarding" element={<OnBoarding />} />
        <Route path="patients/new" element={<FreshPatiens />} />'
        <Route path="patients/live" element={<FreshPatiens />} />
        <Route path="caregivers/deployed" element={<DeployedCareGiver />} />
        <Route path="caregivers/bench" element={<BenchCareGivers />} />
        <Route path="comps" element={<Complaint />} />
        <Route path="followups" element={<Feedback />} />
        <Route path="invreqs" element={<Inventory />} />
        <Route path="pendingcollections" element={<PendingCollections />} />
        <Route path="pendingdocs" element={<PendingDocuments />} />
        <Route path="closingservices" element={<ClosingServices />} />
      </Routes>
    </BrowserRouter>
    // <NavBar />
  );
}

export default App;
