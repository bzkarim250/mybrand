let nav = document.querySelector(".header__nav");
let burger = document.querySelector(".hamburger");
let burgerFirstLine = document.querySelector(".hamburger__line:nth-child(1)");
let burgerSecondLine = document.querySelector(".hamburger__line:nth-child(2)");
let burgerThirdLine = document.querySelector(".hamburger__line:nth-child(3)");

burger.addEventListener("click", function () {
  burgerFirstLine.classList.toggle("hamburger__line-1");
  burgerSecondLine.classList.toggle("hamburger__line-2");
  burgerThirdLine.classList.toggle("hamburger__line-3");

  nav.classList.toggle("display__nav");
});

window.addEventListener("scroll", function () {
  if (nav.classList.contains("display__nav")) {
    burgerFirstLine.classList.remove("hamburger__line-1");
    burgerSecondLine.classList.remove("hamburger__line-2");
    burgerThirdLine.classList.remove("hamburger__line-3");
    nav.classList.remove("display__nav");
    navBall.classList.remove("display__nav");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const containers = document.querySelectorAll(
    ".services-container, .projects-container, .blogs-container"
  );

  containers.forEach((container) => {
    const scrollStep = container.clientWidth; // Scroll one container width at a time

    container.previousElementSibling.addEventListener("click", function () {
      container.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    });

    container.nextElementSibling.addEventListener("click", function () {
      container.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    });
  });

  // Disable scrollbars
  containers.forEach((container) => {
    container.style.overflowX = "hidden";
  });
});
