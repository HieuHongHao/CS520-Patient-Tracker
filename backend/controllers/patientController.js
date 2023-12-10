import Appointment from "../models/appointment.js";
import MedicalHistory from "../models/medicalHistory.js";
import mongoose from "mongoose";

const checkAvailabilityHelper = async (date, time, doctorId) => {
  console.log(date, time);
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

  const timeStart = new Date(appointmentTime.getTime() - 60 * 60000);
  const timeEnd = new Date(appointmentTime.getTime() + 60 * 60000);
  // console.log(doctorId);
  // console.log(timeStart.getUTCHours(), timeStart.getMinutes(), timeStart.getSeconds());
  // console.log(timeEnd.getUTCHours(), timeEnd.getMinutes(), timeEnd.getSeconds());
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
//BOOK APPOINTMENT
export const bookAppointment = async (req, res) => {
  const { doctorId } = req.params;
  // PatientId should be get FROM THE TOKEN!!
  const { date, time, reason } = req.body;
  const patientId = "6152f43d72d4cfe6fc37e675";
  const appointments = await checkAvailabilityHelper(date, time, doctorId);

  if (appointments.length > 0) {
    return res.status(400).send({
      message: "Appointments not available",
    });
  }
  try {
    // const dateTime = new Date(`${date}T${time}`);
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

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while booking the appointment',
      error: error.message
    });
  }
};

// check doctor availabilibty
export const checkAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date, time } = req.body; // Expecting date format: "YYYY-MM-DD", time format: "HH:mm"

    // const [year, month, day] = date.split('-');
    // const [hours, minutes] = time.split(':');
    // const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    // const timeStart = new Date(appointmentTime.getTime() - 60 * 60000);
    // const timeEnd = new Date(appointmentTime.getTime() + 60 * 60000);

    // const appointments = await Appointment.find({
    //   doctorId,
    //   dateAndTime: {
    //     $gte: timeStart,
    //     $lte: timeEnd,
    //   },
    // });

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
    // console.log(err);
    res.status(500).send({
      message: "Error in checking availability",
      error: err.message,
    });
  }
};

export const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({
      patientId,
    });
    res.status(200).send({
      message: "Fetch patient's appointments successfully",
      data: appointments,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      message: "Error In User Appointments",
      error: err.message()
    });
  }
};

// Get list of medical histories based on patientId/patientId - Patient view
export const getMedicalHistoriesByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const medicalHistories = await MedicalHistory.find({ patientId: patientId });
    res.send({
      message: 'Medical histories retrieved successfully',
      data: medicalHistories,
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while retrieving medical histories',
      error: err.message,
    });
  }
};