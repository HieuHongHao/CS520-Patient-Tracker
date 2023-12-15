import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema({
  // Reference to the User model's ObjectId for the patient (required)
  patientId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },

  // Reference to the User model's ObjectId for the doctor (required)
  doctorId: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },

  // Date and time of the appointment (required)
  dateAndTime: {
    type: Date,
    required: true,
  },

  // Reason for the appointment (required, maximum length 200)
  reason: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
});

// Create Appointment model
const Appointment = model('Appointment', appointmentSchema);

// Export the Appointment model
export default Appointment;
