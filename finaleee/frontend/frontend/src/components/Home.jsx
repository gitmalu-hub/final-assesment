import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch all blogs from backend
  const fetchBlogs = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("❌ Failed to fetch blogs:", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle delete blog
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
          alert("✅ Blog deleted");
          fetchBlogs(); // Refresh list after deletion
        })
        .catch((err) => {
          console.error("❌ Delete failed:", err);
          alert("❌ Failed to delete blog");
        });
    }
  };

  // Navigate to update form with blog data
  const handleUpdate = (blog) => {
    navigate("/update", { state: blog });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Blogs
      </Typography>
      {blogs.length === 0 ? (
        <Typography>No blogs available. Add one!</Typography>
      ) : (
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item key={blog._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.img_url}
                  alt={blog.title}
                />
                <CardContent>
                  <Typography variant="h6">{blog.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {blog.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(blog._id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpdate(blog)}
                  >
                    UPDATE
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
