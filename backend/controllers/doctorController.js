import { Doctor, User, filterUserFields } from '../models/user.js';
import MedicalHistory from '../models/medicalHistory.js';
import Appointment from "../models/appointment.js";
import mongoose from 'mongoose';

export const getAll = async (req, res) => {
  try {
    const doctorsList = await Doctor.find({});
    res.json(doctorsList.map(doctor => filterUserFields(doctor)));
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const doctor = await Doctor.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({
      ...filterUserFields(user),
      specialization: doctor['specialization']
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const updateOne = async (req, res) => {
  const { id } = req.params;
  const { phone, firstName, lastName, specialization } = req.body;

  try {
    const doctor = await Doctor.findOneAndUpdate({ userId: id }, {
      specialization
    }, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // if doctor obj exists, so does user.
    const user = await User.findByIdAndUpdate(id, {
      phone,
      firstName,
      lastName,
    }, { new: true });

    res.json({
      ...filterUserFields(user),
      specialization: doctor['specialization']
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const appointments = await Appointment.find({
      doctor: doctorId,
    });
    res.status(200).json(appointments);
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      message: err.message,
    });
  }
};

// Get list of medical histories associated with doctorId - Doctor view
export const getMedicalHistoriesByDoctorId = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const medicalHistories = await MedicalHistory.find({ doctorId: doctorId }).populate('patientId');
    res.send(medicalHistories);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};