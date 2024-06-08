const express = require("express");
const admin = require("firebase-admin");
const router = express.Router();

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    res
      .status(201)
      .json({ message: "User registered successfully!", user: userRecord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({ message: "Login successful!", token: customToken });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// 비밀번호 변경
router.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(userRecord.uid, {
      password: newPassword,
    });
    res.status(200).json({ message: "Password changed successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error changing password", error: error.message });
  }
});

// 회원탈퇴
router.post("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(userRecord.uid);
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;
