<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>로그인</title>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"></script>
  </head>
  <body>
    <h1>로그인</h1>
    <form onsubmit="login(); return false;">
      <label for="email">이메일:</label>
      <input type="email" id="email" required /><br />
      <label for="password">비밀번호:</label>
      <input type="password" id="password" required /><br />
      <button type="submit">로그인</button>
    </form>
    <script>
      // Firebase 초기화
      const firebaseConfig = {
        apiKey: "AIzaSyCQKRM4YAygiOaZv-18qL9M8sU-MBTrldQ",
        authDomain: "fir-wheats-8c507.firebaseapp.com",
        projectId: "fir-wheats-8c507",
        storageBucket: "fir-wheats-8c507.appspot.com",
        messagingSenderId: "939205124826",
        appId: "1:939205124826:web:5eb441cbe1010a63237be3",
        measurementId: "G-HQBWL5GPQ8",
      };

      const app = firebase.initializeApp(firebaseConfig);
      const auth = firebase.auth();

      function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            alert("로그인 성공");
            // 로그인 성공 후 리다이렉션
            window.location.href = "mainPage.html";
          })
          .catch((error) => {
            alert("로그인 실패: " + error.message);
          });
      }
    </script>
  </body>
</html>
