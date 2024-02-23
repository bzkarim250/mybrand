const messageContainer = document.querySelector(".view-message-popup");
const viewMessage = document.querySelectorAll(".view-message");
const closeMessage = document.querySelector(".close-message-button");
const dashboard = document.querySelector(".main-container");

viewMessage.forEach((button) => {
  button.addEventListener("click", () => {
    messageContainer.style.display = "grid";
    messageContainer.classList.remove("view-message-popup");
    dashboard.style.opacity = "0%";
  });
});
closeMessage.addEventListener("click", () => {
  messageContainer.style.display = "none";
  messageContainer.classList.remove(".view-message-popup");
  dashboard.style.opacity = "100%";
});
