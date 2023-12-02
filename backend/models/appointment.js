import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema({
  patient: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Patient' 
  },
  doctor: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Doctor' 
  },
  time: { 
    type: Date, 
    required: true 
  },
  reason: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
  prescription: { 
    type: Schema.Types.ObjectId, 
    ref: 'Prescription' 
  }
});

const Appointment = model('Appointment', appointmentSchema);

export default Appointment;