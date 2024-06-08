const express = require("express");
const {
  createUser,
  getUserByEmail,
  deleteUserByEmail,
  updateUserPassword,
} = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "이미 사용 중인 이메일입니다." });
    }

    await createUser(email, password, name);
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    console.error("회원가입 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "회원가입 중 오류가 발생했습니다." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
    }

    const token = jwt.sign({ email: user.email }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다:", error);
    res.status(500).json({ message: "로그인 중 오류가 발생했습니다." });
  }
});

// router.post("/change-password", async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     await updateUserPassword(email, newPassword);
//     res.json({ message: "비밀번호가 변경되었습니다." });
//   } catch (error) {
//     console.error("비밀번호 변경 중 오류가 발생했습니다:", error);
//     res.status(500).json({ message: "비밀번호 변경 중 오류가 발생했습니다." });
//   }
// });

// router.post("/delete", async (req, res) => {
//   const { email } = req.body;

//   try {
//     await deleteUserByEmail(email);
//     res.json({ message: "회원탈퇴가 완료되었습니다." });
//   } catch (error) {
//     console.error("회원탈퇴 중 오류가 발생했습니다:", error);
//     res.status(500).json({ message: "회원탈퇴 중 오류가 발생했습니다." });
//   }
// });

// module.exports = router;
