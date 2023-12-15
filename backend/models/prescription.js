import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Prescription Schema
const prescriptionSchema = new Schema({
  // Instructions for the prescription (required, maximum length 200)
  instruction: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
});

// Create Prescription model
const Prescription = model('Prescription', prescriptionSchema);

// Export the Prescription model
export default Prescription;
