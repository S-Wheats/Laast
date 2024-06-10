document.addEventListener("DOMContentLoaded", (event) => {
  const userEmail = localStorage.getItem("userEmail");
  if (userEmail) {
    document.getElementById("UserID").innerText = userEmail;
  }
});

async function signup() {
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

  const response = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: id, password: ps, name: name }),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    window.location.href = "./Login.html";
  } else {
    alert(data.message);
  }
}

async function login() {
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    localStorage.setItem("userEmail", email);
    window.location.href = "./index.html";
  } else {
    alert(data.message);
  }
}

async function changePassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (newPassword !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const response = await fetch("/api/users/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: localStorage.getItem("userEmail"),
      newPassword: newPassword,
    }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("비밀번호가 변경되었습니다.");
    closeChangePasswordModal();
  } else {
    alert("비밀번호 변경에 실패했습니다.");
  }
}

async function deleteAccount() {
  if (!confirm("정말로 회원탈퇴를 하시겠습니까?")) {
    return;
  }

  const response = await fetch("/api/users/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("회원탈퇴가 완료되었습니다.");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "./signup.html";
  } else {
    alert("회원탈퇴에 실패했습니다.");
  }
}
