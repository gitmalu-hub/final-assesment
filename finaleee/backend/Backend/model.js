// Import mongoose
const mongoose = require("mongoose");

// Define schema
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

// Create model
const BlogModel = mongoose.model("Blog", schema);

// Export model (optional, if using in another file)
module.exports = BlogModel;


