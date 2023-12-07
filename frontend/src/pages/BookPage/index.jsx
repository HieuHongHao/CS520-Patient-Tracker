import { DatePicker, message, TimePicker } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookPage() {
  const [doctor, setDoctor] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [reason, setReason] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const params = useParams();
  // const doctorId = "6152f3b572d4cfe6fc37e65a";
  const checkAvailability = async () => {
    try {
      const { status, data } = await axios.post(
        `http://localhost:3000/api/patient/${params.doctorId}/check-availability`,
        { date, time }
      );
      if (status == 200) {
        message.success(data.message);
        setIsAvailable(true);
      }
    } catch (err) {
      console.log(err);
      const { data } = err.response;
      message.error(data.message);
    }

  };
  const bookAppointment = async () => {
    try {
      const { status, data } = await axios.post(
        `http://localhost:3000/api/patient/${params.doctorId}/book-appointment`,
        { date, time, reason }
      );
      if (status == 200) {
        setIsAvailable(false);
        message.success(data.message);
      }
    } catch (err) {
      console.log(err);
      const { data } = err.response;
      message.error(data.message);
    }

  };
  const getDoctor = async () => {
    try {
      const { status, data } = await axios.get(
        `http://localhost:3000/api/doctor/${params.doctorId}`
      );
      if (status == 200) {
        setDoctor(data.data);
      }
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctor();
    // console.log("123");
  }, []);
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
            onClick={checkAvailability}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Check Availability
          </button>
          {isAvailable && (
            <button
              onClick={bookAppointment}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300"
            >
              Book Appointment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}