const mongoose = require("mongoose");

// This is the SINGLE, CORRECT schema definition.
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    metaDescription: { type: String, required: true }, // Includes the meta description
    content: { type: String, required: true },
    author: { type: String, default: "Khokhar Motors Admin" },
    featuredImage: { type: String },
    slug: { type: String, required: true, unique: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// This line prevents the "OverwriteModelError" by checking if the model already exists.
module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
