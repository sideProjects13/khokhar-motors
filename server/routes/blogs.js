const mongoose = require("mongoose");

  const blogSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      metaDescription: { type: String, required: true },
      content: { type: String, required: true },
      author: { type: String, default: "Khokhar Motors Admin" },
      featuredImage: { type: String },
      slug: { type: String, required: true, unique: true },
      isFeatured: { type: Boolean, default: false },
    },
    { timestamps: true }
  );

// --- THE FIX IS HERE ---
// Check if the model has already been compiled. If yes, use it. If not, create it.
// This prevents the OverwriteModelError.
module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
