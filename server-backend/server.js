const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

/* ============== Middleware ================== */
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "35mb" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  })
);

// ---------------------------------------------- MongoDB Schema Creation ----------------------------------------------

require("./userDetails");
require("./imageDetails");
const UserDetails = mongoose.model("UserDetails");
const ImageDetails = mongoose.model("ImageDetails");

// ---------------------------------------------- MongoDB connection ----------------------------------------------

const mongoURL = "mongodb://localhost:27017/ImageDetails";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
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
  const { base64 } = req.body;

  try {
    await ImageDetails.create({
      image: base64,
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
