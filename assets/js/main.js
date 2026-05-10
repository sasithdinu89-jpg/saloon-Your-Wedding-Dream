const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                });
            }
        });
    },
    {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.1
    }
);

["about", "services", "gallery", "visit"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
});

const year = document.getElementById("year");
if (year) {
    year.textContent = new Date().getFullYear();
}

if (window.AOS) {
    AOS.init({
        duration: 800,
        once: true,
        offset: 40
    });
}
