//THIS FILE IS USED TO CREATE INITIAL DATA IN THE DATABASE
import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import { User, Doctor } from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();
const dbUrl = process.env.DB_URL || 'patient-tracker-db';
await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

//Return a random element from an array
// const doctors = await (await fetch('doctor.json')).json();

// const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  const data = await readFile('./seeds/doctors.json', 'utf8');
  const doctors = JSON.parse(data);
  await Doctor.deleteMany({});
  await User.deleteMany({ role: 'Doctor'});
  for (let i = 0; i < doctors.length; ++i)
  {
    const user = new User({
      ...doctors[i],
    });
    const doctor = new Doctor({
      userId: doctors[i]["_id"],
      specialization: doctors[i].specialization,
    });
    await user.save();
    await doctor.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
