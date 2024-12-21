const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const { body } = require("express-validator");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 characters long"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Incorrect email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 character long"),
  ],
  userController.loginUser
);
module.exports = router;

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);
