
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


  //Menu Toggle//

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar ul");
const navItems = document.querySelectorAll(".navbar ul li a"); // all menu links

const hamburgerSVG = `
<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
     stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1="6" x2="21" y2="6"></line>
  <line x1="3" y1="12" x2="21" y2="12"></line>
  <line x1="3" y1="18" x2="21" y2="18"></line>
</svg>`;

const closeSVG = `
<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
     viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
     stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="6" x2="6" y2="18"></line>
  <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;

let isOpen = false;

// Toggle menu on button click
menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  navLinks.classList.toggle("active");
  isOpen = !isOpen;

  menuToggle.innerHTML = isOpen ? closeSVG : hamburgerSVG;
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  if (isOpen && !menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
    closeMenu();
  }
});

// ✅ Highlight active link + close menu
navItems.forEach(link => {
  link.addEventListener("click", () => {
    // remove active class from all
    navItems.forEach(item => item.classList.remove("active"));
    // add to clicked one
    link.classList.add("active");

    if (isOpen) {
      closeMenu();
    }
  });
});

// ✅ Optional: Highlight based on current page (when refreshed)
const currentPage = window.location.pathname.split("/").pop();
navItems.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Helper function
function closeMenu() {
  navLinks.classList.remove("active");
  isOpen = false;
  menuToggle.innerHTML = hamburgerSVG;
  menuToggle.setAttribute("aria-expanded", "false");
}


//active page highlight
const currenttPage = window.location.pathname.split("/").pop();
const menuItems = document.querySelectorAll("ul li a");

menuItems.forEach(item => {
    const linkPage = item.getAttribute("href");
    if(linkPage === currenttPage || (linkPage === "index.html" && currenttPage === "")) {
        item.classList.add("active");
    }
});


//arrow js
document.addEventListener('DOMContentLoaded', function() {
    const arrow = document.querySelector('.back-to-top-arrow');
    const mainSection = document.getElementById('service-section');

    const mainSectionHeight = mainSection.offsetHeight; 

    function toggleArrowVisibility() {
        if (window.scrollY > mainSectionHeight) {
                        arrow.classList.add('show-arrow');
        } else {
            // Otherwise, hide it
            arrow.classList.remove('show-arrow');
        }
    }
    window.addEventListener('scroll', toggleArrowVisibility);
    toggleArrowVisibility(); 
});