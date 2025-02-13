const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "firstname must be at least 3 character"],
      maxlength: 50,
    },
    lastname: {
      type: String,
    
      minlength: [3, "lastname must be at least 3 character"],
    },
  },
  email:    {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
   
  },
  password: { type: String, required: true, select: false },

  socketId: { type: String },

  status:   { type: String, enum: ["active", "inactive"], default: "inactive" },

  vehicle:  {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 characters"],
    },
    capacity: {
      type: String,
      required: true,
      
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
  },

  locations:{
    lat: { type: Number},
    lng: { type: Number },
  },
});


captainSchema.methods.genrateAuthToken = function () {
  return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, {
    expiresIn: "24h" 
  });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel;
