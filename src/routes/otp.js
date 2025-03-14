const express = require("express");
const { sendVerificationCode } = require("../helper/twilioService");

const router = express.Router();
const otpStorage = new Map();


router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStorage.set(phone, otp);

  try {
    await sendVerificationCode(phone, otp);
    res.json({ message: "OTP sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
});


router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  const storedOtp = otpStorage.get(phone);
  if (storedOtp && storedOtp == otp) {
    otpStorage.delete(phone); 
    res.json({ message: "OTP verified successfully!" });
  } else {
    res.status(400).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
