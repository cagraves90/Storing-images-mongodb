const mongoose = require("mongoose");

const ImageDetailsSchema = new mongoose.Schema(
  {
    id: String,
    image: String,
  },
  {
    collection: "ImageDetails",
  }
);

mongoose.model("ImageDetails", ImageDetailsSchema);
