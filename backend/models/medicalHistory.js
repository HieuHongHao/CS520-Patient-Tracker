import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const medicalHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Patient'
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  title: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 50 
  },
  date: {
    type: Date,
    required: true,
  },
  medicationUsed: [
    { type: String, maxlength: 50 }
  ]
});

const MedicalHistory = model('MedicalHistory', medicalHistorySchema);

export default MedicalHistory;