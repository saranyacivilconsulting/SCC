// Menu-toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar ul");
const menuIcon = document.querySelector(".menu-toggle i");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Toggle the icon
  if (navLinks.classList.contains("active")) {
    menuIcon.classList.remove("fa-bars");
    menuIcon.classList.add("fa-times");
  } else {
    menuIcon.classList.remove("fa-times");
    menuIcon.classList.add("fa-bars");
  }
});