

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');  // Select the form
    const submitBtn = document.querySelector('.send-message-btn');  // Submit button

    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent default form submission

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        if (!formData.firstName || !formData.email || !formData.message) {
            alert('Please fill in First Name, Email, and Message.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxLrGlF0_52T4-OV_rgVNZ1R9yG9zRH-pU1MP7hMcnZW6E-3sVNZMDRq0KlShR0K3-fgA/exec', {
                method: 'POST',
                mode: 'no-cors',  // Use 'cors' if you enable CORS in Apps Script (advanced)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            form.reset();

        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'SEND MESSAGE';
        }
    });
});


//Active page highlight
const currenttPage = window.location.pathname.split("/").pop();
const menuItems = document.querySelectorAll("ul li a");

menuItems.forEach(item => {
    const linkPage = item.getAttribute("href");
    if(linkPage === currenttPage || (linkPage === "index.html" && currenttPage === "")) {
        item.classList.add("active");
    }
});


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
            navItems.forEach(item => item.classList.remove("active"));
            link.classList.add("active");

            if (isOpen) {
                closeMenu();
            }
        });
    });

       // ✅ Highlight based on current page
    const currentPage = window.location.pathname.split("/").pop();
    navItems.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    function closeMenu() {
        navLinks.classList.remove("active");
        isOpen = false;
        menuToggle.innerHTML = hamburgerSVG;
        menuToggle.setAttribute("aria-expanded", "false");
    }
    

//arrow js
document.addEventListener('DOMContentLoaded', function() {
    const arrow = document.querySelector('.back-to-top-arrow');
    const mainSection = document.getElementById('contact-section');

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


