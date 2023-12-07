import { Route, Routes } from "react-router-dom";

import DoctorPage from "./pages/DoctorPage";
import PatientPage from "./pages/PatientPage";
import BookPage from "./pages/BookPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage/Login";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/doctor" element={<DoctorPage />}>
            <Route path="book-appointment/:doctorId" element={<BookPage />} />
          </Route>
          <Route path="/patient" element={<PatientPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}