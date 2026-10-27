/* --- 16. LANGUAGE TOGGLE LOGIC --- */
const langToggleBtn = document.getElementById('lang-toggle');
const body = document.body;

langToggleBtn.addEventListener('click', () => {
    if (body.classList.contains('lang-fr')) {
        body.classList.remove('lang-fr');
        body.classList.add('lang-en');
    } else {
        body.classList.remove('lang-en');
        body.classList.add('lang-fr');
    }
});

/* --- MOBILE NAVIGATION TOGGLE --- */
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
        }
    });
});

/* --- 20. SCROLL EFFECTS (Intersection Observer) --- */
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(el => {
    appearOnScroll.observe(el);
});

/* --- 9. TIMELINE INTERACTION --- */
function toggleTimelineContent(element) {
    // Optional: close other nodes if you only want one open at a time
    const allNodes = document.querySelectorAll('.timeline-node');
    allNodes.forEach(node => {
        if (node !== element) node.classList.remove('active');
    });
    
    element.classList.toggle('active');
}

// Open the first node by default for user discovery
document.addEventListener("DOMContentLoaded", () => {
    const firstNode = document.querySelector('.timeline-node');
    if(firstNode) firstNode.classList.add('active');
});

/* --- 11. LIGHTBOX LOGIC --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(imgElement) {
    lightbox.style.display = "flex";
    lightboxImg.src = imgElement.src;
    lightboxCaption.innerText = imgElement.alt;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        closeLightbox();
    }
});

/* --- 24. BACK TO TOP BUTTON --- */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --- 13. IMAGE FAILURE PROTECTION --- */
// Automatically replaces broken images with an SVG placeholder so layout doesn't break
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Prevent infinite loop if fallback also fails
            this.onerror = null; 
            
            // Create a simple SVG placeholder data URI
            const svgPlaceholder = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%231a1b41"><rect width="100%" height="100%"/><text x="50%" y="50%" fill="%2300f0ff" text-anchor="middle" font-family="sans-serif" font-size="20">Image Unavailable / Indisponible</text></svg>`;
            
            this.src = svgPlaceholder;
            this.classList.add('broken-image-fallback');
        });
    });
});