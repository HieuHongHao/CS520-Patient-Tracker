import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// User Schema
const userSchema = new Schema({
  // User's email address (required, maximum length 50)
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },

  // User's password (required)
  password: {
    type: String,
    required: true,
  },

  // User's role, can be either 'Doctor' or 'Patient' (required)
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient']
  },

  // User's phone number (required, maximum length 50)
  phone: {
    type: String,
    required: true,
    maxlength: 50
  },

  // User's first name (required, maximum length 50)
  firstName: {
    type: String,
    required: true,
    maxlength: 50
  },

  // User's last name (required, maximum length 50)
  lastName: {
    type: String,
    required: true,
    maxlength: 50
  },
});

// Patient Schema
const patientSchema = new Schema({
  // Reference to the User model's ObjectId (required)
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  // Date of Birth of the patient (optional)
  dob: { type: Date, required: false },

  // Medical history of the patient (optional)
  medical_history: { type: String }
});

// Doctor Schema
const doctorSchema = new Schema({
  // Reference to the User model's ObjectId (required)
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  // Specialization of the doctor (optional, maximum length 50)
  specialization: {
    type: String,
    required: false,
    maxlength: 50
  }
});

// Create User, Patient, and Doctor models
const User = model('User', userSchema);
const Patient = model('Patient', patientSchema);
const Doctor = model('Doctor', doctorSchema);

// Export User, Patient, and Doctor models
export { User, Patient, Doctor };

// Filter out fields not to be returned to the user.
export const filterUserFields = (user) => {
  // Define the allowed fields to be returned to the user
  const allowedFields = ['email', 'firstName', 'lastName', 'role', 'phone', 'specialization', 'dob', '_id'];

  // Create a new object with only the allowed fields
  const filteredUser = {};
  allowedFields.forEach(field => filteredUser[field] = user[field]);

  // Return the filtered user object
  return filteredUser;
}
