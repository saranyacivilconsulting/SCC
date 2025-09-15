
  document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".service-content p");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    texts.forEach(el => {
      el.style.animation = "zoomIn 0.8s ease forwards";
      el.style.animationPlayState = "paused"; // start paused
      observer.observe(el);
    });
  });

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



