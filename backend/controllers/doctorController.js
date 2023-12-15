import { Doctor, User, filterUserFields } from '../models/user.js';
import MedicalHistory from '../models/medicalHistory.js';
import Appointment from "../models/appointment.js";
import mongoose from 'mongoose';

// Controller to get a list of all doctors
export const getAll = async (req, res) => {
  try {
    // Retrieve a list of all doctors and populate the associated user details
    const doctorsList = await Doctor.find({}).populate('userId');
    res.json(doctorsList);
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).json({
      message: err.message,
    });
  }
};

// Controller to get details of a specific doctor
export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user and doctor associated with the given ID
    const user = await User.findById(id);
    const doctor = await Doctor.findOne({ userId: id });

    // Check if the user or doctor is not found
    if (!user || !doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Send a response with filtered user details and doctor's specialization
    res.json({
      ...filterUserFields(user),
      specialization: doctor['specialization']
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: err.message,
    });
  }
};

// Controller to update details of a specific doctor
export const updateOne = async (req, res) => {
  const { id } = req.params;
  const { phone, firstName, lastName, specialization } = req.body;

  try {
    // Update the doctor's specialization
    const doctor = await Doctor.findOneAndUpdate({ userId: id }, {
      specialization
    }, { new: true });

    // Check if the doctor is not found
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Update the user details
    const user = await User.findByIdAndUpdate(id, {
      phone,
      firstName,
      lastName,
    }, { new: true });

    // Send a response with filtered user details and updated specialization
    res.json({
      ...filterUserFields(user),
      specialization: doctor['specialization']
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: err.message,
    });
  }
};

// Controller to get a list of appointments associated with a specific doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    // Retrieve a list of appointments for the given doctor ID and populate patient details
    const { id: doctorId } = req.params;
    const appointments = await Appointment.find({
      doctorId: doctorId,
    }).populate('patientId');
    res.status(200).json(appointments);
  } catch (err) {
    // Handle errors and send an appropriate response
    console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

// Controller to get a list of medical histories associated with a specific doctor ID (Doctor view)
export const getMedicalHistoriesByDoctorId = async (req, res) => {
  const { doctorId } = req.params;
  try {
    // Retrieve a list of medical histories for the given doctor ID and populate patient details
    const medicalHistories = await MedicalHistory.find({ doctorId: doctorId }).populate('patientId');
    res.send(medicalHistories);
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: err.message,
    });
  }
};
