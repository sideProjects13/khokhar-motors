const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST /api/contacts
router.post("/", contactController.createContactMessage);

module.exports = router;
