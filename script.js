// Slideshow functionality
let slideIndex = 1
let slideTimer

// Function to load header and footer
async function loadHeaderAndFooter() {
const headerPlaceholder = document.getElementById("header-placeholder")
const footerPlaceholder = document.getElementById("footer-placeholder")

if (headerPlaceholder) {
try {
    const response = await fetch("header.html")
    const headerHtml = await response.text()
    headerPlaceholder.innerHTML = headerHtml
    // After header is loaded, set active class for current page
    setActiveNavLink()
} catch (error) {
    console.error("Error loading header:", error)
}
}

if (footerPlaceholder) {
try {
    const response = await fetch("footer.html")
    const footerHtml = await response.text()
    footerPlaceholder.innerHTML = footerHtml
} catch (error) {
    console.error("Error loading footer:", error)
}
}
}

// Function to set the active navigation link
function setActiveNavLink() {
const currentPath = window.location.pathname.split("/").pop() // Get current file name
const navLinks = document.querySelectorAll(".nav-link")

navLinks.forEach((link) => {
const linkPath = link.getAttribute("href").split("/").pop()
if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
    link.classList.add("active")
} else {
    link.classList.remove("active")
}
})
}

document.addEventListener("DOMContentLoaded", () => {
loadHeaderAndFooter() // Load header and footer first

// Only initialize slideshow if on index.html
if (document.querySelector(".slideshow-container")) {
showSlides(slideIndex)
autoSlide()
}

addScrollToTop() // Existing scroll-to-top
addScrollAnimations() // Existing scroll animations

// Existing hover effects for cards
const cards = document.querySelectorAll(".card, .date-card, .download-card")
cards.forEach((card) => {
card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)"
    this.style.transition = "transform 0.2s ease-in-out"
})

card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
})
})

// Existing click handlers for download cards
const downloadCards = document.querySelectorAll(".download-card:not([href])")
downloadCards.forEach((card) => {
card.addEventListener("click", function () {
    console.log("Download clicked:", this.querySelector(".download-title").textContent)
})
})
})

function showSlides(n) {
const slides = document.getElementsByClassName("slide")
const dots = document.getElementsByClassName("dot")
const progressFill = document.getElementById("progressFill")

if (n > slides.length) {
slideIndex = 1
}
if (n < 1) {
slideIndex = slides.length
}

for (let i = 0; i < slides.length; i++) {
slides[i].classList.remove("active")
}

for (let i = 0; i < dots.length; i++) {
dots[i].classList.remove("active")
}

if (slides[slideIndex - 1]) {
slides[slideIndex - 1].classList.add("active")
}

if (dots[slideIndex - 1]) {
dots[slideIndex - 1].classList.add("active")
}

// Update progress bar
if (progressFill) {
progressFill.style.width = (slideIndex / slides.length) * 100 + "%"
}
}

function autoSlide() {
slideTimer = setTimeout(() => {
slideIndex++
if (slideIndex > document.getElementsByClassName("slide").length) {
    slideIndex = 1
}
showSlides(slideIndex)
autoSlide()
}, 5000) // Change slide every 5 seconds
}

// Mobile menu functionality (if needed for future enhancements)
function toggleMobileMenu() {
const mobileMenu = document.getElementById("mobile-menu")
if (mobileMenu) {
mobileMenu.classList.toggle("hidden")
}
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
e.preventDefault()
const target = document.querySelector(this.getAttribute("href"))
if (target) {
    target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    })
}
})
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
const images = document.querySelectorAll("img")
images.forEach((img) => {
img.addEventListener("load", function () {
    this.style.opacity = "1"
})

// Set initial opacity for smooth loading
img.style.opacity = "0"
img.style.transition = "opacity 0.3s ease-in-out"

// If image is already loaded (cached)
if (img.complete) {
    img.style.opacity = "1"
}
})
})

// Add hover effects for cards - moved to DOMContentLoaded
// document.addEventListener('DOMContentLoaded', function() {
//     const cards = document.querySelectorAll('.card, .date-card, .download-card');
//     cards.forEach(card => {
//         card.addEventListener('mouseenter', function() {
//             this.style.transform = 'translateY(-2px)';
//             this.style.transition = 'transform 0.2s ease-in-out';
//         });

//         card.addEventListener('mouseleave', function() {
//             this.style.transform = 'translateY(0)';
//         });
//     });
// });

// Add click handlers for download cards - moved to DOMContentLoaded
// document.addEventListener('DOMContentLoaded', function() {
//     const downloadCards = document.querySelectorAll('.download-card:not([href])');
//     downloadCards.forEach(card => {
//         card.addEventListener('click', function() {
//             // Add your download logic here
//             console.log('Download clicked:', this.querySelector('.download-title').textContent);
//             // You can add actual download functionality here
//         });
//     });
// });

// Add form validation (if forms are added later)
function validateForm(formId) {
const form = document.getElementById(formId)
if (!form) return false

const inputs = form.querySelectorAll("input[required], textarea[required]")
let isValid = true

inputs.forEach((input) => {
if (!input.value.trim()) {
    input.style.borderColor = "#ef4444"
    isValid = false
} else {
    input.style.borderColor = "#d1d5db"
}
})

return isValid
}

// Add scroll-to-top functionality
function addScrollToTop() {
const scrollButton = document.createElement("button")
scrollButton.innerHTML = "↑"
scrollButton.className = "scroll-to-top"
scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #2563eb;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`

document.body.appendChild(scrollButton)

window.addEventListener("scroll", () => {
if (window.pageYOffset > 300) {
    scrollButton.style.display = "block"
} else {
    scrollButton.style.display = "none"
}
})

scrollButton.addEventListener("click", () => {
window.scrollTo({
    top: 0,
    behavior: "smooth",
})
})
}

// Initialize scroll-to-top on page load - moved to DOMContentLoaded
// document.addEventListener('DOMContentLoaded', addScrollToTop);

// Add animation on scroll (optional enhancement)
function addScrollAnimations() {
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.style.opacity = "1"
    entry.target.style.transform = "translateY(0)"
    }
})
}, observerOptions)

// Observe cards and sections
const animatedElements = document.querySelectorAll(".card, .date-card, .download-card")
animatedElements.forEach((el) => {
el.style.opacity = "0"
el.style.transform = "translateY(20px)"
el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
observer.observe(el)
})
}

// Initialize scroll animations on page load - moved to DOMContentLoaded
// document.addEventListener('DOMContentLoaded', addScrollAnimations);
