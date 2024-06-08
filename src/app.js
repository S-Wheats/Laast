const express = require("express");
const bodyParser = require("body-parser");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Firebase Auth 미들웨어
const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

// API 엔드포인트 예시
app.post("/api/users/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    res
      .status(201)
      .send({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post("/api/users/delete", authMiddleware, async (req, res) => {
  const { email } = req.body;

  try {
    const user = await auth.getUserByEmail(email);
    await auth.deleteUser(user.uid);

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
