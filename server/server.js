const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// --- MODEL IMPORTS ---
const Blog = require("./models/blog");

// --- ROUTE IMPORTS ---
const siteInfoRoutes = require("./routes/siteInfo");
const testimonialRoutes = require("./routes/testimonials");
const appointmentRoutes = require("./routes/appointments");
const contactRoutes = require("./routes/contacts");
const adminRoutes = require("./routes/admin");
const adminBlogRoutes = require("./routes/adminBlogs"); // <-- IMPORT NEW ROUTE

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- DATABASE CONNECTION ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- PUBLIC BLOG ROUTES ---
app.get("/api/blogs", async (req, res) => {
  /* ... direct route code ... */
});
app.get("/api/blogs/:slug", async (req, res) => {
  /* ... direct route code ... */
});

// --- OTHER API ROUTES ---
app.use("/api/admin/blogs", adminBlogRoutes); // <-- USE NEW DEDICATED ROUTE
app.use("/api/admin", adminRoutes);
app.use("/api/site-info", siteInfoRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contacts", contactRoutes);

// --- SERVER LISTEN ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
