// Firebase 초기화 코드
const firebaseConfig = {
  apiKey: "AIzaSyCQKRM4YAygiOaZv-18qL9M8sU-MBTrldQ",
  authDomain: "fir-wheats-8c507.firebaseapp.com",
  projectId: "fir-wheats-8c507",
  storageBucket: "fir-wheats-8c507.appspot.com",
  messagingSenderId: "939205124826",
  appId: "1:939205124826:web:5eb441cbe1010a63237be3",
  measurementId: "G-HQBWL5GPQ8",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 회원가입 함수
async function signup(event) {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const passwordConfirm = document.getElementById(
    "signupPasswordConfirm"
  ).value;
  const username = document.getElementById("signupUserName").value;

  if (password !== passwordConfirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;

    await db.collection("users").doc(user.uid).set({
      username: username,
      email: email,
    });

    alert("Signup successful!");
    window.location.href = "./Login.html";
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
  }
}

// 로그인 함수
async function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    alert("Login successful!");
    window.location.href = "./MySNS.html";
  } catch (error) {
    console.error("Error during login:", error);
    alert("Login failed. Please try again.");
  }
}

document.getElementById("signupForm").addEventListener("submit", signup);
document.getElementById("loginForm").addEventListener("submit", login);
