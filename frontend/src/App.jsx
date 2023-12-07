import { Route, Routes } from "react-router-dom";

import DoctorPage from "./pages/DoctorPage/DoctorPage";
import PatientPage from "./PatientPage";
import BookPage from "./BookPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./Login";
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