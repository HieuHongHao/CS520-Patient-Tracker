import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema({
  patientId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  doctorId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  dateAndTime: {
    type: Date,
    required: true,
  },
  reason: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;