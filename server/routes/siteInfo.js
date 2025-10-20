const express = require("express");
const router = express.Router();
const siteInfoController = require("../controllers/siteInfoController");

// GET api/site-info
router.get("/", siteInfoController.getSiteInfo);

module.exports = router;
