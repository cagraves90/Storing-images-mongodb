const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    id: String,
    image: String,
    model: String,
    year: Number,
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsSchema);
