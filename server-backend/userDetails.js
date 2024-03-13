const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    phoneNo: String,
  },
  {
    collection: "UserDetails",
  }
);

mongoose.model("UserDetails", UserDetailsSchema);
