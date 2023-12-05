import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';
import { jwtSecret } from '../config.js';

export const register =  async (req, res) => {
  const { email, encodedPassword } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    // Salt used in hashing. Unlikely used elsewhere, so define it here.
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(encodedPassword, saltRounds);

    // Save user to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Create and send JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { email, encodedPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(encodedPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create and send JWT token
    const token = jwt.sign({ id: newUser._id }, jwtSecret, { expiresIn: '1d' });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
