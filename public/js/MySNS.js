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

var h = screen.height - 300;
var w = screen.width;
var x = screen.width / 2;

function openChatRoom(roomName) {
  window.open(
    `./MyChat.html?room=${roomName}`,
    "Chatting Room",
    "width=" +
      w +
      ", height=" +
      h +
      ", top=50, left=" +
      x +
      ", resizable=no, scrollbars=no, status=no, location=no, toolbar=no, menubar=no"
  );
}

// 페이지 로드 시 게시글 목록 및 채팅방 목록 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  renderChatRooms(); // 채팅방 목록 렌더링
});

// 게시글 작성 폼 표시 함수
function showPostForm() {
  document.getElementById("postForm").style.display = "block";
  document.getElementById("postList").style.display = "none";
}

// 게시글 작성 폼 숨김 함수
function hidePostForm() {
  document.getElementById("postForm").style.display = "none";
  document.getElementById("postList").style.display = "block";
}

// 채팅방 생성 폼 표시 함수
function showChatRoomForm() {
  document.getElementById("chatRoomForm").style.display = "block";
  document.getElementById("postList").style.display = "none";
}

// 채팅방 생성 폼 숨김 함수
function hideChatRoomForm() {
  document.getElementById("chatRoomForm").style.display = "none";
  document.getElementById("postList").style.display = "block";
}

// 이미지 파일을 Base64로 변환하는 함수
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// 게시글 작성 함수
async function submitPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();
  const imageFile = document.getElementById("postImage").files[0];
  const userEmail = localStorage.getItem("userEmail");

  if (!title || !content) {
    alert("제목과 내용을 입력하세요.");
    return;
  }

  let imageBase64 = "";
  if (imageFile) {
    imageBase64 = await getBase64(imageFile);
  }

  const newPostRef = database.ref("posts").push();
  newPostRef.set({
    title: title,
    content: content,
    image: imageBase64,
    userEmail: userEmail,
    comments: [],
    likes: 0, // 좋아요 초기값 추가
    likedBy: [], // 좋아요를 누른 사용자들 추가
  });

  renderPosts();

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
  hidePostForm();
}

// 좋아요 버튼 클릭 함수
function toggleLike(postId) {
  const userEmail = localStorage.getItem("userEmail");
  const postRef = database.ref("posts/" + postId);

  postRef.transaction((post) => {
    if (post) {
      if (post.likedBy && post.likedBy.includes(userEmail)) {
        post.likedBy = post.likedBy.filter((email) => email !== userEmail);
        post.likes--;
      } else {
        post.likedBy = post.likedBy || [];
        post.likedBy.push(userEmail);
        post.likes++;
      }
    }
    return post;
  });
}

// 게시글 목록 렌더링 함수 업데이트
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = '<h2 class="text-xl font-bold mb-4">게시글 목록</h2>';

  database.ref("posts").on("value", (snapshot) => {
    postList.innerHTML = '<h2 class="text-xl font-bold mb-4">게시글 목록</h2>';
    const posts = snapshot.val();
    for (const postId in posts) {
      const post = posts[postId];
      const isLiked =
        post.likedBy &&
        post.likedBy.includes(localStorage.getItem("userEmail"));
      const likeButtonImage = isLiked
        ? "./img/sns/liked.png"
        : "./img/sns/like.png";

      const postDiv = document.createElement("div");
      postDiv.className = "p-4 border-b";
      postDiv.innerHTML = `
        <h3 class="text-lg font-bold">${post.title}</h3>
        <p class="text-gray-700">${post.content}</p>
        ${
          post.image
            ? `<img src="${post.image}" alt="Post Image" class="mt-2 max-h-60">`
            : ""
        }
        <div class="flex items-center justify-between">
          <p class="text-gray-500 text-sm">작성자: ${post.userEmail}</p>
          ${
            post.userEmail === localStorage.getItem("userEmail")
              ? `<button onclick="deletePost('${postId}')" class="text-red-500">삭제</button>`
              : ""
          }
        </div>
        <div class="flex items-center mt-2">
          <button onclick="toggleLike('${postId}')" class="mr-2">
            <img src="${likeButtonImage}" alt="like button" width="24" height="24">
          </button>
          <p class="text-gray-500 text-sm">좋아요: ${post.likes || 0}</p>
        </div>
        <div id="comments-${postId}" class="mt-2">
          <h4 class="text-md font-bold">댓글</h4>
          <div class="ml-4">${renderComments(post.comments || [])}</div>
          <input type="text" id="commentInput-${postId}" class="w-full p-1 border rounded mt-2" placeholder="댓글을 입력하세요">
          <button onclick="submitComment('${postId}')" class="mt-1 p-1 bg-blue-500 text-white rounded">댓글 작성</button>
        </div>
      `;
      postList.appendChild(postDiv);
    }
  });
}

// 댓글 렌더링 함수 업데이트
function renderComments(comments) {
  return comments
    .map((comment) => `<p>${comment.name}: ${comment.text}</p>`)
    .join("");
}

// 댓글 작성 함수 업데이트
function submitComment(postId) {
  const commentInput = document.getElementById(`commentInput-${postId}`);
  const commentText = commentInput.value.trim();
  const commentName = localStorage.getItem("userEmail");

  if (!commentText) {
    alert("댓글을 입력하세요.");
    return;
  }

  const postRef = database.ref("posts/" + postId + "/comments");
  const newCommentRef = postRef.push();
  newCommentRef.set({
    name: commentName,
    text: commentText,
  });

  commentInput.value = "";
}

// 게시글 삭제 함수
function deletePost(postId) {
  if (confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
    database.ref("posts/" + postId).remove();
    renderPosts();
  }
}

// 채팅방 생성 함수
function createChatRoom() {
  const chatRoomName = document.getElementById("chatRoomName").value.trim();
  if (!chatRoomName) {
    alert("채팅방 이름을 입력하세요.");
    return;
  }

  const newChatRoomRef = database.ref("chatrooms").push();
  newChatRoomRef.set({
    name: chatRoomName,
  });

  alert("채팅방이 생성되었습니다.");
  hideChatRoomForm();
  renderChatRooms();
}

// 채팅방 목록 렌더링 함수
function renderChatRooms() {
  const chatRoomList = document.getElementById("chatRoomList");
  chatRoomList.innerHTML = "";

  database.ref("chatrooms").on("value", (snapshot) => {
    chatRoomList.innerHTML = "";
    const chatRooms = snapshot.val();
    for (const roomId in chatRooms) {
      const chatRoom = chatRooms[roomId];
      const chatRoomDiv = document.createElement("div");
      chatRoomDiv.className = "flex flex-col items-center p-2";
      chatRoomDiv.style.width = "100px"; // 채팅방 아이콘 너비 설정
      chatRoomDiv.style.marginRight = "10px"; // 각 채팅방 아이콘 사이 간격 설정
      chatRoomDiv.innerHTML = `
        <svg onclick="openChatRoom('${chatRoom.name}')" data-slot="icon" class="w-10 h-10 mb-2 cursor-pointer" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
        </svg>
        <div class="text-center text-xs font-bold">${chatRoom.name}</div>
      `;
      chatRoomList.appendChild(chatRoomDiv);
    }
  });
}
