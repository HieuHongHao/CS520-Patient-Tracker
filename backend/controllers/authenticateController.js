import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { User, Doctor, Patient, filterUserFields } from '../models/user.js';
import { jwtSecret } from '../config.js';

// Controller for user registration
export const register = async (req, res) => {
  const { email, password, lastName, firstName,
    phone, role, dob, specialization } = req.body;

  // Validation checks for required fields
  if (!email || !password) {
    return res.status(400).json({ errorL: 'Invalid email or password ' });
  }
  if (!(["Doctor", "Patient"].includes(role))) {
    return res.status(400).json({ errorL: 'Invalid role' });
  }

  // Start a database transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Invalid email or password");
    }

    // Hash the password
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

    // Register additional fields based on the user's role
    if (role === 'Doctor') {
      await Doctor.create({ userId: newUser._id, specialization });
    } else {
      await Patient.create({ userId: newUser._id, dob });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    // Set the JWT token in an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true });

    // Send the filtered user details in the response
    res.status(200).json(filterUserFields(newUser));
  } catch (error) {
    console.error(error);
    // Handle registration error
    res.status(500).json({ message: "Invalid email or password" });
  } finally {
    // End the database transaction
    session.endSession();
  }
};

// Controller for user login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1d' });

    // Set the JWT token in an HttpOnly cookie
    res.cookie('token', token, { httpOnly: true });

    // Send the filtered user details in the response
    res.status(200).json(filterUserFields(user));
  } catch (error) {
    console.error(error);
    // Handle login error
    res.status(500).json({ message: "Invalid email or password" });
  }
};

// Controller for user logout
export const logout = async (req, res) => {
  // Clear the JWT token in the cookie
  res.cookie('token', '', { expires: new Date(0), httpOnly: true });

  // Send a successful logout message in the response
  res.status(200).json({ message: "Logout success!" });
};
