<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>회원가입</title>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js"></script>
  </head>
  <body>
    <h1>회원가입</h1>
    <form onsubmit="signup(); return false;">
      <label for="email">이메일:</label>
      <input type="email" id="email" required /><br />
      <label for="password">비밀번호:</label>
      <input type="password" id="password" required /><br />
      <label for="passwordConfirm">비밀번호 확인:</label>
      <input type="password" id="passwordConfirm" required /><br />
      <button type="submit">회원가입</button>
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

      function signup() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const passwordConfirm =
          document.getElementById("passwordConfirm").value;

        if (password !== passwordConfirm) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }

        auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            alert("회원가입 성공");
            // 회원가입 성공 후 리다이렉션
            window.location.href = "login.jsp";
          })
          .catch((error) => {
            alert("회원가입 실패: " + error.message);
          });
      }
    </script>
  </body>
</html>
