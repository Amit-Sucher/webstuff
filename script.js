// script.js

// ✅ Define Firebase Realtime Database reference
const db = firebase.database();

document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chatBox");
  const textInput = document.getElementById("textInput");
  const sendBtn = document.getElementById("sendBtn");
  const imgUpload = document.getElementById("imgUpload");
  const imageBtn = document.getElementById("imageBtn");
  const menuBtn = document.getElementById("menuBtn");
  const menuOptions = document.getElementById("menuOptions");
  const colorBtn = document.getElementById("colorBtn");
  const colorPicker = document.getElementById("colorPicker");

  function createMessageElement(content, type = 'text', from = 'me') {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message-bubble");
    if (from === 'me') {
      wrapper.classList.add(type === 'text' ? "text" : "image");
    } else {
      wrapper.classList.add("received");
    }

    if (type === 'text') {
      wrapper.textContent = content;
    } else if (type === 'image') {
      const img = document.createElement("img");
      img.src = content;
      wrapper.appendChild(img);
    }

    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function sendMessage() {
    const text = textInput.value.trim();
    if (text) {
      db.ref("messages").push({ type: "text", content: text });
      textInput.value = "";
    }
  }

  if (sendBtn) sendBtn.addEventListener("click", sendMessage);
  if (textInput) {
    textInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  if (imageBtn) {
    imageBtn.addEventListener("click", () => {
      imgUpload.click();
    });
  }

  if (imgUpload) {
    imgUpload.addEventListener("change", () => {
      const file = imgUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          db.ref("messages").push({ type: "image", content: reader.result });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  let menuOpen = false;
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      menuOpen = !menuOpen;
      if (menuOpen) {
        menuOptions.style.display = "flex";
        menuOptions.style.flexDirection = "column";
        menuOptions.style.animation = "fadeIn 0.2s ease";
      } else {
        menuOptions.style.display = "none";
      }
    });
  }

  if (colorBtn && colorPicker) {
    colorBtn.addEventListener("click", () => {
      colorPicker.click();
    });
    colorPicker.addEventListener("input", (e) => {
      chatBox.style.background = e.target.value;
    });
  }

  const messagesRef = db.ref("messages");
  messagesRef.on("child_added", (snapshot) => {
    const msg = snapshot.val();
    createMessageElement(msg.content, msg.type, "other");
  });
});
