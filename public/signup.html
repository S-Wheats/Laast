<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=0"
    />
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./css/Signup.css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>MySNS</title>
    <style>
      .desc {
        float: left;
        width: 100%;
        color: #888;
        font-size: 0.9em;
      }
    </style>
  </head>
  <body>
    <div class="page-hdr bg-stone-700 p-4 shadow-md">
      <h1 class="text-xl font-bold text-white">회원가입</h1>
    </div>
    <div class="page-body">
      <form id="signupForm" class="section pad-24 mtop-30">
        <input id="signupEmail" type="text" placeholder="아이디 (이메일주소)" />
        <input
          id="signupPassword"
          type="password"
          class="mtop-10"
          placeholder="패스워드"
        />
        <input
          id="signupPasswordConfirm"
          type="password"
          class="mtop-10"
          placeholder="패스워드 (확인)"
        />
        <input
          id="signupUserName"
          type="text"
          class="mtop-10"
          placeholder="이름 (닉네임)"
        />
        <input type="submit" class="mtop-20" value="회원가입하기" />
      </form>
      <div class="section pad-24 mtop-30">
        <div class="button" onclick="location.href='./Login.html'">
          뒤로가기
        </div>
      </div>
      <div class="section pad-24 mtop-30">
        <div class="desc mtop-20 mbot-20">
          회원 가입시 S-wheats의 약관에 동의하신 것으로 간주합니다.
        </div>
        <a href="#"><div class="button">약관보기</div></a>
      </div>
    </div>
    <script src="./js/jquery-3.5.1.min.js"></script>
    <script src="./js/LoginSignup.js"></script>
    <script>
      async function signup() {
        var id = $("#signupEmail").val().trim();
        if (id == "") {
          alert("아이디를 입력해 주세요.");
          $("#signupEmail").focus();
          return;
        }

        var ps = $("#signupPassword").val().trim();
        if (ps == "") {
          alert("패스워드를 입력해 주세요.");
          $("#signupPassword").focus();
          return;
        }

        var ps2 = $("#signupPasswordConfirm").val().trim();
        if (ps != ps2) {
          alert("입력된 두 개의 패스워드가 일치하지 않습니다.");
          $("#signupPasswordConfirm").focus();
          return;
        }

        var name = $("#signupUserName").val().trim();
        if (name == "") {
          alert("이름을 입력해 주세요.");
          $("#signupUserName").focus();
          return;
        }

        const response = await fetch("/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: id, password: ps, name: name }),
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          window.location.href = "./index.html";
        } else {
          alert(data.message);
        }
      }
    </script>
  </body>
</html>
