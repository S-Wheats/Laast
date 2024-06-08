const admin = require("firebase-admin");
const db = admin.firestore();
const bcrypt = require("bcryptjs");

const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRef = db.collection("users").doc(email);

  await userRef.set({
    email,
    password: hashedPassword,
    name,
  });
};

const getUserByEmail = async (email) => {
  const userRef = db.collection("users").doc(email);
  const doc = await userRef.get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
};

const deleteUserByEmail = async (email) => {
  const userRef = db.collection("users").doc(email);
  await userRef.delete();
};

const updateUserPassword = async (email, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const userRef = db.collection("users").doc(email);

  await userRef.update({
    password: hashedPassword,
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  deleteUserByEmail,
  updateUserPassword,
};
