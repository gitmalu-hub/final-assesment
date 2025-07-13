const mongoose = require("mongoose");
//Write missing code here
mongoose.connect("mongodb+srv://hennashygy2005:u4HHgj6fnF4OZHRP@cluster0.6kvcjfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
