document.addEventListener("DOMContentLoaded", (event) => {
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    document.getElementById("UserID").innerText = userEmail;
  }
});

function signup() {
  var id = document.getElementById("id").value.trim();
  if (id === "") {
    alert("아이디를 입력해 주세요.");
    document.getElementById("id").focus();
    return;
  }

  var ps = document.getElementById("ps").value.trim();
  if (ps === "") {
    alert("패스워드를 입력해 주세요.");
    document.getElementById("ps").focus();
    return;
  }

  var ps2 = document.getElementById("ps2").value.trim();
  if (ps !== ps2) {
    alert("입력된 두 개의 패스워드가 일치하지 않습니다.");
    document.getElementById("ps2").focus();
    return;
  }

  var name = document.getElementById("name").value.trim();
  if (name === "") {
    alert("이름을 입력해 주세요.");
    document.getElementById("name").focus();
    return;
  }

  const user = { id, ps, name };
  localStorage.setItem("user", JSON.stringify(user));
  alert("회원가입이 완료되었습니다.");
  window.location.href = "./Login.html";
}

function login() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.id === email && user.ps === password) {
    alert("로그인 성공");
    localStorage.setItem("userEmail", email);
    window.location.href = "./index.html";
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
}

function changePassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (newPassword !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  user.ps = newPassword;
  localStorage.setItem("user", JSON.stringify(user));

  alert("비밀번호가 변경되었습니다.");
  closeChangePasswordModal();
}

function deleteAccount() {
  if (!confirm("정말로 회원탈퇴를 하시겠습니까?")) {
    return;
  }

  localStorage.removeItem("user");
  localStorage.removeItem("userEmail");
  alert("회원탈퇴가 완료되었습니다.");
  window.location.href = "./signup.html";
}
