const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 회원가입
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
    }
    const newUser = await User.createUser(email, password, name);
    res
      .status(201)
      .json({ message: "회원가입이 완료되었습니다.", user: newUser });
  } catch (error) {
    console.error("회원가입 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "회원가입 중 오류가 발생했습니다." });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "존재하지 않는 사용자입니다." });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "잘못된 비밀번호입니다." });
    }
    res.status(200).json({ message: "로그인 성공", user });
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
  }
});

// 비밀번호 변경
router.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "존재하지 않는 사용자입니다." });
    }
    await User.updatePassword(email, newPassword);
    res.status(200).json({ message: "비밀번호가 변경되었습니다." });
  } catch (error) {
    console.error("비밀번호 변경 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "비밀번호 변경 중 오류가 발생했습니다." });
  }
});

// 회원 탈퇴
router.post("/delete", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "존재하지 않는 사용자입니다." });
    }
    await User.deleteUser(email);
    res.status(200).json({ message: "회원 탈퇴가 완료되었습니다." });
  } catch (error) {
    console.error("회원 탈퇴 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "회원 탈퇴 중 오류가 발생했습니다." });
  }
});

module.exports = router;
