import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const medicalHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Patient'
  },
  name: { 
    type: String, 
    required: true, 
    maxlength: 50 
  },
  type: { 
    type: String, 
    required: true, 
    enum: ['Illness', 'Allergy'], 
    maxlength: 50 
  },
  medicationUsed: [
    { type: String, maxlength: 50 }
  ]
});

const MedicalHistory = model('MedicalHistory', medicalHistorySchema);

export default MedicalHistory;