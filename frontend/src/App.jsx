import DoctorPage from "./DoctorPage";
import PatientPage from "./PatientPage";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/doctor-page" element={<DoctorPage />} />
        <Route path="/patient-page" element={<PatientPage />} />
      </Routes>
    </div>
  );
}