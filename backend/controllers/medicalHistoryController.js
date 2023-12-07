import MedicalHistory from '../models/medicalHistory.js';

// Add a new medical history record
export const addOne = async (req, res) => {
  // patientId is patient id
  const { patientId, name, type, medicationUsed } = req.body;
  const newMedicalHistory = new MedicalHistory({
    patientId, name, type, medicationUsed
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
  const { patientId, name, type, medicationUsed } = req.body;
  const { id } = req.params;
  try {
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      return res.status(404).send({ message: 'Medical history not found' });
    }

    medicalHistory.patientId = patientId;
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

// Get list of medical histories based on patientId/patientId
export const getMedicalHistoriesByPatientId = async (req, res) => {
  const { id } = req.params;
  try {
    const medicalHistories = await MedicalHistory.find({ patientId: id });
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