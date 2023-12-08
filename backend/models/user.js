import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema({
  // id: { type: Schema.Types.ObjectId, required: true, auto: true },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient']
  },
  phone: {
    type: String,
    required: true,
    maxlength: 50
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
});

// Patient Schema
const patientSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  dob: { type: Date, required: false },
  medical_history: { type: String }
});

// Doctor Schema
const doctorSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  specialization: {
    type: String,
    required: false,
    maxlength: 50
  }
});

const User = model('User', userSchema);
const Patient = model('Patient', patientSchema);
const Doctor = model('Doctor', doctorSchema);

export { User, Patient, Doctor };

// filter out fields not to be returned to user.
export const filterUserFields = (user) => {
  const allowedFields = ['email', 'firstName', 'lastName', 'role',
    'phone', 'specialization', 'dob', '_id'];
  const filteredUser = {};
  allowedFields.forEach(field => filteredUser[field] = user[field]);
  return filteredUser;
}