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

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener("DOMContentLoaded", (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");
  document.getElementById("chatRoomName").textContent = roomName;

  // Firebase 실시간 데이터베이스에서 메시지 데이터 가져오기
  const chatMessages = document.getElementById("chatMessages");
  firebase
    .database()
    .ref("chatrooms/" + roomName)
    .on("child_added", (snapshot) => {
      const message = snapshot.val();
      const messageDiv = document.createElement("div");
      messageDiv.textContent = `${message.sender}: ${message.content}`;
      chatMessages.appendChild(messageDiv);
    });
});

function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();
  const userName = localStorage.getItem("userName");
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");

  if (!message) {
    alert("메시지를 입력하세요.");
    return;
  }

  // Firebase 실시간 데이터베이스에 메시지 저장
  const newMessageRef = firebase
    .database()
    .ref("chatrooms/" + roomName)
    .push();
  newMessageRef.set({
    sender: userName,
    content: message,
  });

  messageInput.value = "";
}

function leaveChatRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomName = urlParams.get("room");
  window.location.href = "./MySNS.html";
}
