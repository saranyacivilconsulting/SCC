////////////////////////////////////////////////////
///////////////////////////Home page////////////////
(() => {
    const slider = document.getElementById("slider");
    const slides = document.getElementById("slides");
    const items = [...document.querySelectorAll(".bottom-text .item")];
    const fills = items.map(it => it.querySelector(".fill"));

    const slideTitle = document.getElementById("slide-title");
    const slideText = document.getElementById("slide-text");

    const slideContent = [
        { title: "Quantity Surveying & Cost Estimation", text: "Expert Investment Advisory to help you invest smarter, safer, and profitably." },
        { title: "Project Monitoring & Audit", text: "Smart tech and insights for financial solutions that keep you ahead." },
        { title: "Technical Due Diligence", text: "Global opportunities, local expertise—your balanced path to smarter investments." },
        { title: "Investment Advisory", text: "Our project management ensures seamless execution from concept to commissioning." }
    ];

    const slideTime = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--slide-time")
    ) || 5000; // Fallback to 5000ms if CSS var is missing/invalid

    let index = 0;
    let timer = null;
    let startTime = 0;
    let visibilityPausedElapsed = 0;

    const transitionDuration = 700;
    slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;

    // Ensure slider is focusable for keyboard navigation
    slider.setAttribute("tabindex", "0");
    slider.setAttribute("role", "region");
    slider.setAttribute("aria-label", "Slide carousel");

    /** 🔹 Update active item (dots) */
    function updateActive(newIndex) {
        items.forEach((it, i) => {
            const isActive = i === newIndex;
            it.classList.toggle("active", isActive);
            it.setAttribute("aria-pressed", isActive);
        });
    }

    /** 🔹 Start/resume progress animation from a given elapsed time */
    function startProgress(elapsed) {
        const remaining = slideTime - elapsed;
        if (remaining <= 0) {
            next();
            return;
        }

        const progress = Math.min(100, (elapsed / slideTime) * 100);

        // Reset non-active fills
        fills.forEach((f, i) => {
            if (i !== index) {
                f.style.transition = "none";
                f.style.width = "0%";
            }
        });

        // Set current fill to progress and animate to 100%
        const currentFill = fills[index];
        currentFill.style.transition = "none";
        currentFill.style.width = `${progress}%`;
        void currentFill.offsetWidth; // Force reflow
        currentFill.style.transition = `width ${remaining}ms linear`;
        currentFill.style.width = "100%";

        // Update timing
        startTime = performance.now() - elapsed;
        timer = setTimeout(next, remaining);
    }

    /** 🔹 Move to specific slide */
    function goTo(i) {
        clearTimeout(timer);
        visibilityPausedElapsed = 0; // Reset visibility pause when manually navigating

        index = (i + slideContent.length) % slideContent.length;
        slides.style.transform = `translateX(-${index * 100}%)`;

        slideTitle.textContent = slideContent[index].title;
        slideText.textContent = slideContent[index].text;

        updateActive(index);
        startTime = performance.now();
        startProgress(0); // Start fresh progress from 0
    }

    /** 🔹 Next / Previous controls */
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    /** 🔹 Keyboard accessibility (Arrow keys) */
    function handleKey(e) {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            next();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prev();
        }
    }

    /** 🔹 Visibility change (tab focus) - Pauses timer/progress when hidden, resumes without counting hidden time */
    function handleVisibility() {
        if (document.hidden) {
            // Pause: Clear timer, freeze progress at current point (time hidden doesn't count)
            clearTimeout(timer);
            const elapsed = performance.now() - startTime;
            visibilityPausedElapsed = Math.min(elapsed, slideTime); // Cap at slideTime to avoid overflow

            const progress = Math.min(100, (elapsed / slideTime) * 100);

            // Freeze current fill visually
            const currentFill = fills[index];
            currentFill.style.transition = "none";
            currentFill.style.width = `${progress}%`;

            // Reset non-active fills to ensure they stay at 0%
            fills.forEach((f, i) => {
                if (i !== index) {
                    f.style.transition = "none";
                    f.style.width = "0%";
                }
            });
        } else {
            // Resume from paused point (hidden time excluded)
            if (visibilityPausedElapsed > 0) {
                startProgress(visibilityPausedElapsed);
                visibilityPausedElapsed = 0;
            }
        }
    }

    /** 🔹 Attach events */
    items.forEach((it, idx) => {
        it.addEventListener("click", (e) => {
            e.preventDefault();
            goTo(idx);
        });
    });

    // Keyboard only on slider for better UX
    slider.addEventListener("keydown", handleKey);
    document.addEventListener("visibilitychange", handleVisibility);

    // Prevent text selection on slider for cleaner interaction
    slider.addEventListener("selectstart", (e) => e.preventDefault());

    /** 🔹 Start */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
            slider.style.display = "block";
            goTo(0);
        });
    } else {
        // Already loaded
        slider.style.display = "block";
        goTo(0);
    }
})();



// ...............................................................
// arrow js
document.addEventListener('DOMContentLoaded', function() {
    const arrow = document.querySelector('.back-to-top-arrow');
    const mainSection = document.getElementById('slider');

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


    // Counter Animation
    document.addEventListener("DOMContentLoaded", () => {
        const counters = document.querySelectorAll(".counter");
        const speed = 150; // smaller is faster

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute("data-target");
                    const count = +counter.innerText.replace(/\D/g, ""); // strip non-numbers
                    const increment = Math.ceil(target / speed);

                    if (count < target) {
                        counter.innerText = (count + increment).toLocaleString();
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target.toLocaleString() + "+"; // final value with +
                    }
                };
                updateCount();
            });
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect(); // run once
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector(".stats");
        if (statsSection) {
            observer.observe(statsSection);
        }
    });




    ///menu toggle//
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

//Active page highlight
const currenttPage = window.location.pathname.split("/").pop();
const menuItems = document.querySelectorAll("ul li a");

menuItems.forEach(item => {
    const linkPage = item.getAttribute("href");
    if(linkPage === currenttPage || (linkPage === "index.html" && currenttPage === "")) {
        item.classList.add("active");
    }
});


    // Work Section Animation
    const cards = document.querySelectorAll('.work-card');

    const observerCards = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "all 0.6s ease-out";
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observerCards.observe(card));

