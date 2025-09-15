(function () {
    const sliderEl = document.getElementById('slider');
    const slidesEl = document.getElementById('slides');
    const items = Array.from(document.querySelectorAll('.bottom-text .item'));
    const fills = items.map(it => it.querySelector('.fill'));
    const total = items.length;

    const slideTitle = document.getElementById('slide-title');
    const slideText = document.getElementById('slide-text');

    const slideContent = [
        {
            title: 'Strategic Investment<br>Advisory for<br>Sustainable Growth',
            text: 'We provide expert Investment Advisory services to help you make informed, profitable, and risk-mitigated decisions. Our team analyzes market trends, financial viability, and project feasibility to ensure optimal returns on your investments.'
        },
        {
            title: 'Innovative Financial Solutions<br>for a Changing Market',
            text: 'Our team leverages cutting-edge technology and deep market insights to develop innovative financial solutions that help you stay ahead in a rapidly evolving economic landscape.'
        },
        {
            title: 'Global Opportunities<br>Local Expertise',
            text: 'Explore a world of investment opportunities with our global network and local expertise. We offer a balanced approach to capitalize on international markets while understanding regional nuances.'
        },
        {
            title: 'Concept to Commissioning',
            text: 'Our dedicated approach to project management ensures seamless execution, from the initial concept and design phases all the way through to successful commissioning.'
        },
        {
            title: 'Smart Infrastructure Development',
            text: 'We focus on building the next generation of smart, resilient, and connected infrastructure using data-driven insights and sustainable practices.'
        }
    ];

    const slideTime = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--slide-time')
    );

    let index = 0;
    let timer;

    const updateActive = (newIndex) => {
        items.forEach((it, idx) => {
            it.classList.toggle('active', idx === newIndex);
        });
    };

    const animateFill = (idx) => {
        fills.forEach(f => {
            f.style.transition = 'none';
            f.style.width = '0%';
        });

        void fills[idx].offsetWidth;

        fills[idx].style.transition = `width ${slideTime}ms linear`;
        fills[idx].style.width = '100%';
    };

    const goTo = (i) => {
        index = (i + total) % total;
        slidesEl.style.transform = `translateX(-${index * 100}%)`;
        updateActive(index);
        animateFill(index);

        slideTitle.innerHTML = slideContent[index].title;
        slideText.innerHTML = slideContent[index].text;

        // Reset the timer only after a successful transition
        restartTimer();
    };

    const next = () => {
        goTo(index + 1);
    };

    const restartTimer = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(next, slideTime);
    };

    // Events
    items.forEach((it, idx) => {
        it.addEventListener('click', () => {
            goTo(idx);
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') {
            goTo(index + 1);
        } else if (e.key === 'ArrowLeft') {
            goTo(index - 1);
        }
    });

    // Mouse events to pause and resume on hover
    sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
    sliderEl.addEventListener('mouseleave', () => restartTimer());

    // Init
    window.addEventListener('load', () => {
        sliderEl.style.display = 'block';
        goTo(0);
    });
})();

// Counter Animation
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const speed = 150; // smaller is faster

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + increment;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+"; // final value with +
                }
            };
            updateCount();
        });
    };

    // Trigger only when section is visible
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


// ... (rest of your script.js code) ...

// Menu-toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".navbar ul");
const ctaButton = document.querySelector(".cta-button-container");
const menuIcon = document.querySelector(".menu-toggle i"); // Get the icon element

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    ctaButton.classList.toggle("active");

    // Toggle the icon between bars and a times (X)
    if (navLinks.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-times");
    } else {
        menuIcon.classList.remove("fa-times");
        menuIcon.classList.add("fa-bars");
    }
});

// ... (rest of your script.js code) ...

const cards = document.querySelectorAll('.work-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.transition = "all 0.8s ease-out";
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));