const SiteInfo = require("../models/siteInfo");

// Get the single site info document
exports.getSiteInfo = async (req, res) => {
  try {
    // There should only be one document. Find it.
    let info = await SiteInfo.findOne();

    // If it doesn't exist, create a default one
    if (!info) {
      info = new SiteInfo();
      await info.save();
    }

    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Error fetching site information" });
  }
};
