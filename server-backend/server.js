const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* ============== Middleware ================== */
app.use(cors());
app.use(express.json({ limit: "200kb" }));
app.use(bodyParser.json());
// ---------------------------------------------- MongoDB Schema Creation ----------------------------------------------

require("./userDetails");
require("./imageDetails");
const UserDetails = mongoose.model("UserDetails");
const ImageDetails = mongoose.model("ImageDetails");

// ---------------------------------------------- MongoDB connection ----------------------------------------------

const mongoURL = "mongodb://localhost:27017/ImageDetails";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

// ---------------------------------------------- Server Connection ----------------------------------------------
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// ---------------------------------------------- MongoDB Schema ----------------------------------------------
app.post("/test", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: "error",
      error: "req body cannot be empty",
    });
  }

  res.status(200).json({
    status: "success",
    data: req.body,
  });
});

app.post("/post", (req, res) => {
  console.log(req.body.data);

  if (req.body.data != "Chelsea") {
    res.status(400).json({ status: "User not found" });
    return;
  }

  res.status(200).json({ status: "Success" });
});

app.post("/register", async (req, res) => {
  const { name, email, mobileNo } = req.body; //

  try {
    await UserDetails.create({
      userName: name,
      email,
      phoneNo: mobileNo,
    });
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/upload-image", async (req, res) => {
  const { base64, model, year } = req.body;

  try {
    await ImageDetails.create({
      image: base64,
      model: model,
      year: year,
    });
    return res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    await ImageDetails.find().then((data) => {
      return res.status(200).json({ status: "ok", data: data });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/get-image/:model", async (req, res) => {
  try {
    const { model } = req.params;
    await ImageDetails.find({ model: model }).then((data) => {
      return res.status(200).json({ status: "ok", data: data });
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});
