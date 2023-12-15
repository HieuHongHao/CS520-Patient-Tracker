import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Medication Schema
const medicationSchema = new Schema({
  // Name of the medication (required, maximum length 50)
  name: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },

  // Dosage information for the medication (required, maximum length 50)
  dosage: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },

  // Reference to the Prescription model's ObjectId (optional)
  prescription: { 
    type: Schema.Types.ObjectId, 
    ref: 'Prescription' 
  }
});

// Create Medication model
const Medication = model('Medication', medicationSchema);

// Export the Medication model
export default Medication;
