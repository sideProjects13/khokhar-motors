const Contact = require("../models/contact");

// POST a new contact message
exports.createContactMessage = async (req, res) => {
  try {
    // Log the incoming data to the console for debugging
    console.log("Received contact form submission:", req.body);

    const { name, phone, email, carModel, service, message } = req.body;

    // Basic validation to ensure required fields are present
    if (!name || !phone || !carModel) {
      return res
        .status(400)
        .json({ message: "Name, Phone, and Car Model are required fields." });
    }

    const newContactMessage = new Contact({
      name,
      phone,
      email,
      carModel,
      service,
      message,
    });

    await newContactMessage.save();

    console.log("Successfully saved contact message to DB.");

    return res.status(201).json({
      message: "Message sent successfully!",
      contactMessage: newContactMessage,
    });
  } catch (err) {
    // Log the detailed error on the server
    console.error("CRITICAL ERROR in createContactMessage:", err);
    return res
      .status(500)
      .json({
        message: "Server error while sending message.",
        error: err.message,
      });
  }
};
