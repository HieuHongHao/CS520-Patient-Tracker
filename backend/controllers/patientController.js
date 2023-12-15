import Appointment from "../models/appointment.js";
import MedicalHistory from "../models/medicalHistory.js";
import mongoose from "mongoose";

// Helper function to check the availability of appointments for a given date, time, and doctor
const checkAvailabilityHelper = async (date, time, doctorId) => {
  console.log(date, time);
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

  const timeStart = new Date(appointmentTime.getTime() - 60 * 60000);
  const timeEnd = new Date(appointmentTime.getTime() + 60 * 60000);

  const appointments = await Appointment.find({
    doctorId,
    dateAndTime: {
      $gte: timeStart,
      $lte: timeEnd,
    },
  });
  console.log(appointments);
  return appointments;
}

// Controller to book a new appointment
export const bookAppointment = async (req, res) => {
  const { doctorId } = req.params;
  // PatientId should be obtained FROM THE TOKEN!!
  const { date, time, reason } = req.body;
  // const patientId = "6152f43d72d4cfe6fc37e675";
  const patientId = req.userId;
  
  const appointments = await checkAvailabilityHelper(date, time, doctorId);

  if (appointments.length > 0) {
    return res.status(400).send({
      message: "Appointments not available",
    });
  }
  try {
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      dateAndTime: appointmentTime,
      reason: reason,
    });

    // Save the appointment
    await newAppointment.save();

    // Send a success response with the booked appointment details
    res.json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({
      success: false,
      message: 'An error occurred while booking the appointment',
      error: error.message
    });
  }
};

// Controller to check the availability of a doctor for a specific date and time
export const checkAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, time } = req.body; // Expecting date format: "YYYY-MM-DD", time format: "HH:mm"

    const appointments = await checkAvailabilityHelper(date, time, doctorId);

    if (appointments.length > 0) {
      res.status(400).send({
        message: "Appointments not available",
      });
    } else {
      res.status(200).send({
        message: "Appointments available",
      });
    }
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "Error in checking availability",
      error: err.message,
    });
  }
};

// Controller to get a list of appointments for a specific patient
export const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({
      patientId,
    }).populate('doctorId');
    // Send a success response with the fetched patient's appointments
    res.status(200).send({
      message: "Fetch patient's appointments successfully",
      data: appointments,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "Error In User Appointments",
      error: err.message
    });
  }
};

// Controller to get a list of medical histories associated with a specific patient ID (Patient view)
export const getMedicalHistoriesByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const medicalHistories = await MedicalHistory.find({ patientId: patientId });
    // Send a success response with the fetched medical histories
    res.send({
      message: 'Medical histories retrieved successfully',
      data: medicalHistories,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: 'An error occurred while retrieving medical histories',
      error: err.message,
    });
  }
};
