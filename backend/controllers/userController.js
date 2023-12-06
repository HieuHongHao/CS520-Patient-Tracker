import Appointment from "../models/appointment";

//BOOK APPOINTMENT
export const bookAppointment = async (req, res) => {
  const { patientId, doctorId, date, time, reason, prescriptionId } = req.body;

  try {
    // const dateTime = new Date(`${date}T${time}`);
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    const newAppointment = new Appointment({
      patient: mongoose.Types.ObjectId(patientId),
      doctor: mongoose.Types.ObjectId(doctorId),
      dateAndTime: appointmentTime,
      reason: reason,
      prescription: prescriptionId ? mongoose.Types.ObjectId(prescriptionId) : null
    });

    // Save the appointment
    await newAppointment.save();

    res.json({
      success: true,
      message: 'Appointment booked successfully',
      data: newAppointment
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while booking the appointment',
      error: error.message
    });
  }
};

// check doctor availabilibty
export const checkAvailability = async (req, res) => {
  try {
    const { date, time, doctorId } = req.body; // Expecting date format: "YYYY-MM-DD", time format: "HH:mm"

    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const appointmentTime = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);

    const timeStart = new Date(appointmentTime.getTime() - 60 * 60000);
    const timeEnd = new Date(appointmentTime.getTime() + 60 * 60000);

    const appointments = await Appointment.find({
      doctorId,
      dateAndTime: {
        $gte: timeStart,
        $lte: timeEnd,
      },
    });

    if (appointments.length > 0) {
      res.status(200).send({
        message: "Appointments not available",
      });
    } else {
      res.status(200).send({
        message: "Appointments available",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error in checking availability",
      error: err.message,
    });
  }
};

export const userAppointmentsController = async (req, res) => {
  try {
    const { patientId } = req.body;
    const appointments = await Appointment.find({
      patient: patientId,
    });
    res.status(200).send({
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error In User Appointments",
      error: err.message()
    });
  }
};