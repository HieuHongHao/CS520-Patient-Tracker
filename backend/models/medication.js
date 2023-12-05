import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Medication Schema
const medicationSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  dosage: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  prescription: { 
    type: Schema.Types.ObjectId, 
    ref: 'Prescription' 
  }
});

const Medication = model('Medication', medicationSchema);

export default Medication;