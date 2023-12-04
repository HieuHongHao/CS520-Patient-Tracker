import MedicalHistory from '../models/medicalHistory.js';

// Add a new medical history record
export const addOne = async (req, res) => {
  // userId is patient id
  const { userId, name, type, medicationUsed } = req.body;
  const newMedicalHistory = new MedicalHistory({
    userId, name, type, medicationUsed
  });

  try {
    await newMedicalHistory.save();
    res.send({
      message: 'Medical history added successfully',
      data: newMedicalHistory,
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while adding the medical history',
      error: err.message,
    });
  }
};

// Get a single medical history record by ID
export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalHistory = await MedicalHistory.findById(id);
    if (medicalHistory) {
      res.send({
        message: 'Medical history found',
        data: medicalHistory,
      });
    } else {
      res.send({ message: 'Medical history not found' });
    }
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while searching for the medical history',
      error: err.message,
    });
  }
};

// Update a medical history record
export const updateOne = async (req, res) => {
  const { userId, name, type, medicationUsed } = req.body;
  const { id } = req.params;
  try {
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      return res.status(404).send({ message: 'Medical history not found' });
    }

    medicalHistory.userId = userId;
    medicalHistory.name = name;
    medicalHistory.type = type;
    medicalHistory.medicationUsed = medicationUsed;
    await medicalHistory.save();

    res.send({
      message: 'Medical history updated successfully',
      data: medicalHistory,
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while updating the medical history',
      error: err.message,
    });
  }
};

// Delete a medical history record
export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      return res.status(404).send({ message: 'Medical history not found' });
    }
    await medicalHistory.remove();
    res.send({
      message: 'Medical history deleted successfully',
      data: medicalHistory,
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while deleting the medical history',
      error: err.message,
    });
  }
};

// Get list of medical histories based on patientId/userId
export const getMedicalHistoriesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const medicalHistories = await MedicalHistory.find({ userId: userId });
    res.send({
      message: 'Medical histories retrieved successfully',
      data: medicalHistories,
    });
  } catch (err) {
    res.status(500).send({
      message: 'An error occurred while retrieving medical histories',
      error: err.message,
    });
  }
};