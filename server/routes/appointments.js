const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// POST /api/appointments
router.post("/", appointmentController.createAppointment);

module.exports = router;
