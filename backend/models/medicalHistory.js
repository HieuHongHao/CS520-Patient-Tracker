import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Medical History Schema
const medicalHistorySchema = new Schema({
  // Reference to the User model's ObjectId for the patient (required)
  patientId: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User'  // Reference to the User model
  },

  // Reference to the User model's ObjectId for the doctor (required)
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Reference to the User model
  },

  // Medical condition (required, maximum length 50)
  condition: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },

  // Description of the medical condition (required, maximum length 1000)
  description: { 
    type: String, 
    required: true,
    maxlength: 1000
  },

  // Date when the patient visited the doctor (required)
  visitedDate: {
    type: Date,
    required: true,
  },

  // Array of medications used (each entry has a maximum length of 50)
  medicationUsed: [
    { type: String, maxlength: 50 }
  ]
});

// Create MedicalHistory model
const MedicalHistory = model('MedicalHistory', medicalHistorySchema);

// Export the MedicalHistory model
export default MedicalHistory;
