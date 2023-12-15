import MedicalHistory from "../models/medicalHistory.js";

// Controller to add a new medical history record
export const addOne = async (req, res) => {
  // Doctor ID obtained from the token
  const doctorId = "6152f3b572d4cfe6fc37e65a";
  const { patientId, condition, description, visitedDate } = req.body;
  const [year, month, day] = visitedDate.split("-");
  const visitedDateObj = new Date(`${year}-${month}-${day}`);
  const newMedicalHistory = new MedicalHistory({
    patientId,
    doctorId,
    condition,
    description,
    visitedDate: visitedDateObj,
  });

  try {
    // Save the new medical history record
    let data = await newMedicalHistory.save();
    // Populate patient details in the saved data
    data = await data.populate({
      path: "patientId",
      select: "firstName lastName",
    });
    console.log(data);
    // Send a success response with the added medical history record
    res.send({
      message: "Medical history added successfully",
      data,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "An error occurred while adding the medical history",
      error: err.message,
    });
  }
};

// Controller to get a single medical history record by ID
export const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the medical history record by ID
    const medicalHistory = await MedicalHistory.findById(id);
    if (medicalHistory) {
      // Send a success response with the found medical history record
      res.send({
        message: "Medical history found",
        data: medicalHistory,
      });
    } else {
      // Send a response if the medical history record is not found
      res.send({ message: "Medical history not found" });
    }
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "An error occurred while searching for the medical history",
      error: err.message,
    });
  }
};

// Controller to get a list of all medical history records
export const getAll = async (req, res) => {
  try {
    // Retrieve a list of all medical history records and populate patient details
    const medicalHistories = await MedicalHistory.find().populate({
      path: "patientId",
      select: "firstName lastName",
    });
    // Send a success response with the found medical history records
    res.send({
      message: "Medical histories found",
      data: medicalHistories,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "An error occurred while searching for the medical history",
      error: err.message,
    });
  }
};

// Controller to update a medical history record
export const updateOne = async (req, res) => {
  const { condition, description, visitedDate } = req.body;
  const [year, month, day] = visitedDate.split("-");
  const visitedDateObj = new Date(`${year}-${month}-${day}`);
  const { id } = req.params;
  try {
    // Find the medical history record by ID
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      // Send a response if the medical history record is not found
      return res.status(404).send({ message: "Medical history not found" });
    }

    // Update medical history record fields
    medicalHistory.condition = condition;
    medicalHistory.description = description;
    medicalHistory.visitedDate = visitedDateObj;
    await medicalHistory.save();

    // Send a success response with the updated medical history record
    res.send({
      message: "Medical history updated successfully",
      data: medicalHistory,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "An error occurred while updating the medical history",
      error: err.message,
    });
  }
};

// Controller to delete a medical history record
export const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the medical history record by ID
    const medicalHistory = await MedicalHistory.findById(id);
    if (!medicalHistory) {
      // Send a response if the medical history record is not found
      return res.status(404).send({ message: "Medical history not found" });
    }
    // Remove the medical history record
    await medicalHistory.remove();
    // Send a success response with the deleted medical history record
    res.send({
      message: "Medical history deleted successfully",
      data: medicalHistory,
    });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(500).send({
      message: "An error occurred while deleting the medical history",
      error: err.message,
    });
  }
};
