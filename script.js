// script.js
const chatBox = document.getElementById("chatBox");
const textInput = document.getElementById("textInput");
const sendBtn = document.getElementById("sendBtn");
const imgUpload = document.getElementById("imgUpload");
const imageBtn = document.getElementById("imageBtn");

function createMessageElement(content) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message-bubble");

  if (typeof content === "string") {
    wrapper.textContent = content;
  } else {
    wrapper.appendChild(content);
  }

  chatBox.appendChild(wrapper);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const text = textInput.value.trim();
  if (text) {
    createMessageElement(text);
    textInput.value = "";
  }
}

sendBtn.addEventListener("click", sendMessage);

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

imageBtn.addEventListener("click", () => {
  imgUpload.click();
});

imgUpload.addEventListener("change", () => {
  const file = imgUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.style.maxWidth = "350px";
      img.style.maxHeight = "250px";
      img.style.borderRadius = "6px";
      img.style.display = "block";
      createMessageElement(img);
    };
    reader.readAsDataURL(file);
  }
});

const menuBtn = document.getElementById("menuBtn");
const menuOptions = document.getElementById("menuOptions");
const colorBtn = document.getElementById("colorBtn");
const colorPicker = document.getElementById("colorPicker");

let menuOpen = false;

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

colorBtn.addEventListener("click", () => {
  colorPicker.click();
});

colorPicker.addEventListener("input", (e) => {
  chatBox.style.background = e.target.value;
});
