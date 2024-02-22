const viewButton = document.querySelectorAll(".view");

viewButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/pages/blog.html";
  });
});
