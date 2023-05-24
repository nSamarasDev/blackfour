const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route   POST api/reset
// @desc    Request password reset
// @access  Public
router.post(
    "/", auth,
    [
      check("email", "Please provide a valid email").isEmail(),
      check("email").custom(async (email) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }
      }),
    ],
    async (req, res) => {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email } = req.body;
  
      try {
        const user = await User.findOne({ email });
  
        // Generate password reset token
        const resetToken = user.generatePasswordResetToken();
  
        // Save the updated user
        await user.save();
  
        res.json({ resetToken });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );
  

module.exports = router;
