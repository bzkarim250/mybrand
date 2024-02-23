const viewButton = document.querySelectorAll(".view");
const updateButton = document.querySelectorAll(".update");
const popup = document.querySelector(".popup-wrapper");
const close = document.querySelector(".popup-close");
const dashboard = document.querySelector(".main-container");
const closeAddBlog = document.querySelector(".close-add-blog");
const addBlogContainer = document.querySelector(".add-blog-popup");
const addNewBlogButton = document.querySelector(".add-new-blog");

close.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.add("popup-wrapper");
  dashboard.style.opacity = "100%";
});

viewButton.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    location.href = "/pages/blog.html";
  });
});

updateButton.forEach((button) => {
  button.addEventListener("click", () => {
    popup.style.display = "grid";
    popup.classList.remove("popup-wrapper");
    dashboard.style.opacity = "0%";
  });
});

addNewBlogButton.addEventListener("click", () => {
  addBlogContainer.style.display = "grid";
  addBlogContainer.classList.remove("add-blog-popup");
  dashboard.style.opacity = "0%";
});

closeAddBlog.addEventListener("click", () => {
  addBlogContainer.style.display = "none";
  addBlogContainer.classList.add("add-blog-popup");
  dashboard.style.opacity = "100%";
});
