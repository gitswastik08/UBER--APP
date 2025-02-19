const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.registerCaptain = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  console.log("sas", fullname);

  const isCaptainAlreadyRegistered = await captainModel.findOne({ email });
  if (isCaptainAlreadyRegistered) {
    return res.status(400).json({ message: "Captain already registered" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.genrateAuthToken;

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log(email, password);

  const captain = await captainModel.findOne({ email }).select("+password");
  console.log("captain", captain);

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.genrateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async function (req, res, next) {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async function (req, res, next) {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlacklistToken.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};
