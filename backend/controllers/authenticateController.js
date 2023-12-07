import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, Doctor, Patient } from '../models/user.js';
import { jwtSecret } from '../config.js';
import mongoose from 'mongoose';

export const register = async (req, res) => {
  const { email, password, lastName, firstName, phone, role } = req.body;

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
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    // Salt used in hashing. Unlikely used elsewhere, so define it here.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user to the database
    const newUser = await User.create({ email, password: hashedPassword, firstName, lastName, phone, role });

    // TODO: register flow for Doctor/Patient requires respective fields. Mark fields
    // non-required for now.
    if (role === 'Doctor') {
      await Doctor.create({ userId: newUser._id });
    } else {
      await Patient.create({ userId: newUser._id });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    // res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, user: filterUserFields(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const filterUserFields = (user) => {
  // add _id if needed. Also change _id to id if needed.
  const allowedFields = ['email', 'firstName', 'lastName', 'role', 'phone'];
  const filteredUser = {};
  allowedFields.forEach(field => filteredUser[field] = user[field]);
  return filteredUser;
}

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

    // res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ token, user: filterUserFields(user) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
