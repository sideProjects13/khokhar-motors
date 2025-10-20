const mongoose = require("mongoose");
const testimonialSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);
