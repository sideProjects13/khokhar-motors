const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// --- Admin Routes (WITHOUT BLOGS) ---

// Site Info
router.put("/site-info", adminController.updateSiteInfo);

// Appointments
router.get("/appointments", adminController.getAllAppointments);
router.put("/appointments/:id", adminController.updateAppointmentStatus);
router.delete("/appointments/:id", adminController.deleteAppointment);

// Testimonials
router.get("/testimonials", adminController.getAllTestimonials);
router.put("/testimonials/:id", adminController.updateTestimonialStatus);
router.delete("/testimonials/:id", adminController.deleteTestimonial);

// Contact Messages
router.get("/contacts", adminController.getAllContactMessages);
router.put("/contacts/:id", adminController.updateContactReadStatus);
router.delete("/contacts/:id", adminController.deleteContactMessage);

module.exports = router;
