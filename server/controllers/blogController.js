const Blog = require("../models/blog");

// --- PUBLIC-FACING FUNCTIONS ---

exports.getFeaturedBlogs = async (req, res) => {
  try {
    console.log("API HIT: /api/blogs - Request received for featured blogs.");
    const blogs = await Blog.find({ isFeatured: true }).sort({ createdAt: -1 });
    console.log(
      `SUCCESS: Found ${blogs.length} featured blogs. Sending response.`
    );
    return res.status(200).json(blogs);
  } catch (err) {
    console.error("CRITICAL ERROR in getFeaturedBlogs:", err);
    return res
      .status(500)
      .json({
        message: "Server error while fetching featured blogs.",
        error: err.message,
      });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    console.log(`API HIT: /api/blogs/${req.params.slug} - Request received.`);
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      console.log("NOT FOUND: No blog found for slug:", req.params.slug);
      return res.status(404).json({ message: "Blog post not found" });
    }
    console.log("SUCCESS: Found blog:", blog.title);
    return res.status(200).json(blog);
  } catch (err) {
    console.error(
      `CRITICAL ERROR in getBlogBySlug for slug: ${req.params.slug}`,
      err
    );
    return res
      .status(500)
      .json({
        message: "Server error while fetching blog post.",
        error: err.message,
      });
  }
};

// --- ADMIN-FACING FUNCTIONS ---

exports.createBlog = async (req, res) => {
  try {
    const { title, metaDescription, content, author, slug, isFeatured } =
      req.body;
    const newBlog = new Blog({
      title,
      metaDescription,
      content,
      author,
      slug,
      isFeatured: isFeatured === "true",
      featuredImage: req.file ? req.file.path : "",
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating blog post", error: err.message });
  }
};

exports.getAllBlogsForAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching admin blogs" });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (updateData.isFeatured) {
      updateData.isFeatured =
        updateData.isFeatured === "true" || updateData.isFeatured === true;
    }
    if (req.file) {
      updateData.featuredImage = req.file.path;
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating blog post", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog post" });
  }
};
