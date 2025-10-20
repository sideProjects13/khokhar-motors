const SiteInfo = require("../models/siteInfo");
const Appointment = require("../models/appointment");
const Testimonial = require("../models/testimonial");
const Contact = require("../models/contact");

// --- Site Info Management ---
exports.updateSiteInfo = async (req, res) => {
  try {
    const updatedInfo = await SiteInfo.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedInfo);
  } catch (err) {
    res.status(500).json({ message: "Error updating site info" });
  }
};

// --- Appointment Management ---
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ message: "Error updating appointment status" });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};

// --- Testimonial Management ---
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: "Error fetching testimonials" });
  }
};

exports.updateTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { approved },
      { new: true }
    );
    res.json(updatedTestimonial);
  } catch (err) {
    res.status(500).json({ message: "Error updating testimonial status" });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting testimonial" });
  }
};

// --- Contact Message Management ---
exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contact messages" });
  }
};

exports.updateContactReadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const updatedMessage = await Contact.findByIdAndUpdate(
      id,
      { isRead },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: "Error updating message status" });
  }
};

exports.deleteContactMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting message" });
  }
};
