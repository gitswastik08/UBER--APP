const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

const isblacklisted = await blacklistTokenModel.findOne({token: token});

if(isblacklisted){
    return res.status(403).json({ message: "unauthorized user" });
}

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    req.user = user;
   return next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid." });
  }

};



module.exports.authCaptain = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Check if token is blacklisted
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id); // Captain Model se check kar


    if (!captain) {
      return res.status(404).json({ message: "Captain not found." });
    }

    req.captain = captain; // Captain ka data request me attach kar raha hu
   
    
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error);
    return res.status(401).json({ message: "Token is invalid." });
  }
};







