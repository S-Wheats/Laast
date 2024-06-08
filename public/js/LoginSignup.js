import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

async function signup(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("회원가입 성공:", userCredential.user);

    // Firestore에 사용자 정보 저장
    await addDoc(collection(db, "users"), {
      uid: userCredential.user.uid,
      email: email,
      name: name,
    });
    console.log("사용자 정보 저장 성공");
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
}

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  signup(email, password, name);
});
