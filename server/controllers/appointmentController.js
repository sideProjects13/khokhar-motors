const Appointment = require("../models/appointment");

// POST a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res
      .status(201)
      .json({
        message: "Appointment booked successfully!",
        appointment: newAppointment,
      });
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment", error: err });
  }
};
