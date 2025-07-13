const mongoose = require("mongoose");
//Write missing code here
mongoose.connect("mongodb+srv://hadiyamk03:hadiya@cluster0.un20clt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
