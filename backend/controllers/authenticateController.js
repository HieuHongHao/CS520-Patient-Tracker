import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Doctor, Patient } from '../models/user.js';
import { jwtSecret } from '../config.js';
import mongoose from 'mongoose';

const filterUserFields = (user) => {
  const allowedFields = ['email', 'firstName', 'lastName', 'role',
    'phone', 'specialization', 'dob', '_id'];
  const filteredUser = {};
  allowedFields.forEach(field => filteredUser[field] = user[field]);
  return filteredUser;
}

export const register = async (req, res) => {
  const { email, password, lastName, firstName,
    phone, role, dob, specialization } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errorL: 'Invalid email or password ' });
  }
  if (!(["Doctor", "Patient"].includes(role))) {
    return res.status(400).json({ errorL: 'Invalid role' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Invalid email or password");
    }

    // Hash the password
    // Salt used in hashing. Unlikely used elsewhere, so define it here.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user to the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      role
    });

    // TODO: register flow for Doctor/Patient requires respective fields. Mark fields
    // non-required for now.
    if (role === 'Doctor') {
      await Doctor.create({ userId: newUser._id });
    } else {
      await Patient.create({ userId: newUser._id });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ user: filterUserFields(newUser) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Invalid email or password");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ user: filterUserFields(user) });
  } catch (error) {
    console.error(error);
    res.status(500).send("Invalid email or password");
  }
};

// We set token in HttpOnly cookie, only backend can delete, 
// through this controller.
export const logout = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });
  res.status(200).json({ message: "Logout success!" });
};
