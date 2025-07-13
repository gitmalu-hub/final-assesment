const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./connection"); // MongoDB connection is handled here

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// ----------------------
// Schema + Model
// ----------------------
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const BlogModel = mongoose.model("Blog", blogSchema);

// ----------------------
// POST: Add New Blog
// ----------------------
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();
    res.status(200).json({ message: "✅ Blog post added successfully" });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ message: "❌ Failed to add blog post" });
  }
});

// ----------------------
// GET: Get All Blogs
// ----------------------
app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "❌ Error fetching blogs" });
  }
});

// ----------------------
// DELETE: Delete Blog by ID
// ----------------------
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "❌ Failed to delete blog" });
  }
});

// ----------------------
// PUT: Update Blog by ID
// ----------------------
app.put("/update/:id", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;
    await BlogModel.findByIdAndUpdate(req.params.id, {
      title,
      content,
      img_url,
    });
    res.status(200).json({ message: "✅ Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "❌ Failed to update blog" });
  }
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});


