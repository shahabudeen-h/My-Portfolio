// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Active Navbar Highlight =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 200;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
});

// ===== Scroll Reveal =====
function revealElements() {
    document.querySelectorAll(".reveal").forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) el.classList.add("active");
    });
}
window.addEventListener("scroll", revealElements);
revealElements();

// ===== Mobile Menu Toggle =====
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.classList.toggle("show");
    document.body.classList.toggle("no-scroll", nav.classList.contains("show"));
}

document.querySelectorAll(".nav-links a").forEach(a => {
    a.addEventListener("click", () => {
        const nav = document.querySelector(".nav-links");
        if(nav.classList.contains("show")) {
            nav.classList.remove("show");
            document.body.classList.remove("no-scroll");
        }
    });
});

document.addEventListener("click", e => {
    const nav = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    if(nav.classList.contains("show") && !nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove("show");
        document.body.classList.remove("no-scroll");
    }
});

document.addEventListener("keydown", e => {
    if(e.key === "Escape") {
        const nav = document.querySelector(".nav-links");
        if(nav.classList.contains("show")) {
            nav.classList.remove("show");
            document.body.classList.remove("no-scroll");
        }
    }
});

// ===========================
// ⭐ CONTACT FORM (FormSubmit + Popup)
// ===========================
// document.getElementById("contactForm").addEventListener("submit", function(event){
//     event.preventDefault(); // Stop normal redirect

//     const form = event.target;

//     fetch(form.action, {
//         method: "POST",
//         body: new FormData(form)
//     })
//     .then(response => {
//         document.getElementById("successPopup").style.display = "flex";
//         form.reset();
//     })
//     .catch(error => {
//         alert("Something went wrong. Please try again.");
//     });
// });

// document.getElementById("popupOk").addEventListener("click", function(){
//     document.getElementById("successPopup").style.display = "none";
// });

document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault(); // Stop normal redirect

    const form = event.target;

    fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    })
    .then(response => {
        // Show popup
        document.getElementById("successPopup").style.display = "flex";

        // 🔥 Play success sound
        document.getElementById("popupSound").play();

        // Reset form
        form.reset();
    })
    .catch(error => {
        alert("Something went wrong. Please try again.");
    });
});

// Close popup
document.getElementById("popupOk").addEventListener("click", function(){
    document.getElementById("successPopup").style.display = "none";
});

