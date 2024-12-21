const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname must be at least 3 character"],
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "lastname must be at least 3 character"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "emaail must be at least 5 characters long"],
  },
  password: { type: String, required: true, select: false },

  socketId: { type: String },
});

userSchema.methods.genrateAuthToken = function () {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET,{expiresIn: "24h"});
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
