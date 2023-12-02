import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Prescription Schema
const prescriptionSchema = new Schema({
  instruction: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
  // medication: [
  //   { type: Schema.Types.ObjectId, ref: 'Medication' }
  // ]
});

const Prescription = model('Prescription', prescriptionSchema);

export default Prescription;