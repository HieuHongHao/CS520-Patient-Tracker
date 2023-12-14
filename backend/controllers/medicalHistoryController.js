import MedicalHistory from '../models/medicalHistory.js';

// Add a new medical history record
export const addOne = async (req, res) => {
  // doctorID from token
  const doctorId = "6152f3b572d4cfe6fc37e65a";
  // patientId is patient id
  const { patientId, condition, description, visitedDate } = req.body;
  const [year, month, day] = visitedDate.split('-');
  const visitedDateObj = new Date(`${year}-${month}-${day}`);
  const newMedicalHistory = new MedicalHistory({
    patientId, doctorId, condition, description, visitedDate: visitedDateObj
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
  const { condition, description, visitedDate } = req.body;
  const [year, month, day] = visitedDate.split('-');
  const visitedDateObj = new Date(`${year}-${month}-${day}`);
  const { id } = req.params;
  try {
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      return res.status(404).send({ message: 'Medical history not found' });
      
    }

    // medicalHistory.patientId = patientId;
    medicalHistory.condition = condition;
    medicalHistory.description = description;
    medicalHistory.visitedDate = visitedDateObj;
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
