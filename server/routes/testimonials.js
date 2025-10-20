const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
router.get("/", testimonialController.getApprovedTestimonials);
module.exports = router;
