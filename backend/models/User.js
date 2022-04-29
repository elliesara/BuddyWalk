const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    // probably hold off on avatar until basic user functionality is ok
    // Avatar: {
    //   type: String,
    //   default: "",
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);