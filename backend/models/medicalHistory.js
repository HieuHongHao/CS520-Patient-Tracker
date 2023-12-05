import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const medicalHistorySchema = new Schema({
  patiendId: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Patient'
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  condition: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  visitedDate: {
    type: Date,
    required: true,
  },
  medicationUsed: [
    { type: String, maxlength: 50 }
  ]
});

const MedicalHistory = model('MedicalHistory', medicalHistorySchema);

export default MedicalHistory;