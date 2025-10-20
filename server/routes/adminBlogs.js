const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const blogController = require("../controllers/blogController");

// --- Multer Storage Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage: storage });

// --- Admin Blog Routes ---
// Corresponds to GET /api/admin/blogs
router.get("/", blogController.getAllBlogsForAdmin);

// Corresponds to POST /api/admin/blogs
router.post("/", upload.single("featuredImage"), blogController.createBlog);

// Corresponds to PUT /api/admin/blogs/:id
router.put("/:id", upload.single("featuredImage"), blogController.updateBlog);

// Corresponds to DELETE /api/admin/blogs/:id
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
    