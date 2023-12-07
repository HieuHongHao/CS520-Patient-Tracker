import { Doctor, User } from '../models/user.js';
import Appointment from "../models/appointment.js";
import mongoose from 'mongoose';

export const getAll = async (req, res) => {
  try {
    const doctorsList = await Doctor.find({});
    res.json({
      message: 'Doctors retrieved successfully',
      data: doctorsList,
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving the list of doctors',
      error: err.message,
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
      message: 'Doctor info retrieved successfully',
      data: {
        email: user['email'],
        firstName: user['firstName'],
        lastName: user['lastName'],
        phone: user['phone'],
        specialization: doctor['specialization']
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while retrieving the doctor',
      error: err.message,
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const appointments = await Appointment.find({
      doctor: doctorId,
    });
    res.status(200).send({
      message: "Fetch doctor's appointments successfully",
      data: appointments,
    });
  } catch (err) {
    // console.log(err);
    res.status(500).send({
      message: "Error in doctor appointments",
      error: err.message()
    });
  }
};