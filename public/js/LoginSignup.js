document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const userName = document.getElementById("signupUserName").value;

  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await firebase.firestore().collection("users").doc(user.uid).set({
      email: email,
      userName: userName,
    });

    alert("회원가입이 완료되었습니다.");
    window.location.href = "./login.html";
  } catch (error) {
    alert(`회원가입 중 오류가 발생했습니다: ${error.message}`);
  }
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    alert("로그인이 성공적으로 완료되었습니다.");
    localStorage.setItem("userName", user.displayName);
    localStorage.setItem("userEmail", email);
    window.location.href = "./mainPage.html";
  } catch (error) {
    alert(`로그인 중 오류가 발생했습니다: ${error.message}`);
  }
});
