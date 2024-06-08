import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
    alert(`회원가입 실패: ${error.message}`);
  }
}

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    alert("로그인이 성공적으로 완료되었습니다.");
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userEmail", email);
    window.location.href = "./mainPage.html";
  } catch (error) {
    alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
  }
}

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const name = document.getElementById("signupUserName").value;
  signup(email, password, name);
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  login(email, password);
});
