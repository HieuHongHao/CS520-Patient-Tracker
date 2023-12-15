import { DatePicker, message, TimePicker } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BACKEND_URL } from "../../config";
import { checkAvailability, bookAppointment } from "../../api/patient";
import { getDoctor } from "../../api/doctor";
import { useAuth } from "../../context/AuthContext";
export default function BookPage() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [reason, setReason] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  const { user: patient, loading } = useAuth();

  const handleCheckAvailability = async () => {
    try {
      const data = await checkAvailability({ date, time, doctorId: params.doctorId });
      console.log(data);
      setIsAvailable(true);
      message.success(data.message);
    } catch (err) {
      console.log(err);
      const data = err.data;
      message.error(data.message);
    }
  };

  const handleBookAppointment = async () => {
    try {
      const data = await bookAppointment({ date, time, reason, doctorId: params.doctorId })
      setIsAvailable(false);
      message.success(data.message);
      navigate('/patient');
    } catch (err) {
      console.log(err);
      const data = err.data;
      message.error(data.message);
    }
  };

  const handeGetDoctor = async () => {
    try {
      const data = await getDoctor({ doctorId: params.doctorId });
      console.log(data);
      setDoctor(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handeGetDoctor();
  }, []);

  useEffect(() => {
    if (!loading && (!patient || patient.role != 'Patient')) {
      message.error("Unauthorized.");
      navigate('/');
    }
  }, [loading]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Doctor Information
        </h2>
        <div className="space-y-3">
          <div className="text-gray-600">
            <strong>Email:</strong> {doctor.email}
          </div>
          <div className="text-gray-600">
            <strong>Name:</strong> {doctor.firstName} {doctor.lastName}
          </div>
          <div className="text-gray-600">
            <strong>Phone:</strong> {doctor.phone}
          </div>
          <div className="text-gray-600">
            <strong>Specialization:</strong> {doctor.specialization}
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <DatePicker
            className="w-full p-2 rounded border border-gray-300"
            // format="DD-MM-YYYY"
            onChange={(value) => {
              setIsAvailable(false);
              setDate(value.format("YYYY-MM-DD"));
            }}
          />
          <TimePicker
            className="w-full p-2 rounded border border-gray-300"
            format="HH:mm"
            onChange={(value) => {
              setIsAvailable(false);
              setTime(value.format("HH:mm"));
            }}
          />
          <input
            type="text"
            className="w-full p-2 rounded border border-gray-300"
            placeholder="Reason for appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate('/patient')}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleCheckAvailability}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Check Availability
          </button>
          {isAvailable && (
            <button
              onClick={handleBookAppointment}
              className="px-3 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
