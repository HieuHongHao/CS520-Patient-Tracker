import DoctorPage from "./DoctorPage";
import PatientPage from "./PatientPage";
import BookPage from "./BookPage";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/doctor-page" element={<DoctorPage />} />
          <Route path="/patient-page" element={<PatientPage />} />
          <Route path="/doctor/book-appointment/:doctorId" element={<BookPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}