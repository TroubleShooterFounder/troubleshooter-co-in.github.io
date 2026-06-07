// ==========================================
// TROUBLE SHOOTERS - JAVASCRIPT
// ==========================================

// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// --- Mobile Menu Toggle ---
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a regular nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- Services Dropdown ---
const servicesDropdown = document.getElementById('servicesDropdown');
if (servicesDropdown) {
    const dropdownToggle = servicesDropdown.querySelector('.nav-dropdown-toggle');
    
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        servicesDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking a service link
    document.querySelectorAll('.nav-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            servicesDropdown.classList.remove('active');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
}

// --- Close dropdown when clicking outside ---
document.addEventListener('click', (e) => {
    const allDropdowns = document.querySelectorAll('.nav-dropdown');
    allDropdowns.forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Also close mobile menu when clicking outside
    if (hamburger && navMenu) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// --- Auto-close dropdown and mobile menu on scroll ---
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollDiff = Math.abs(currentScrollY - lastScrollY);
    
    // Close dropdown if user scrolled more than 30px
    if (scrollDiff > 30) {
        const allDropdowns = document.querySelectorAll('.nav-dropdown');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        // Also close mobile menu on scroll
        if (hamburger && navMenu && window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
    
    lastScrollY = currentScrollY;
});

// --- Counter Animation ---
const counters = document.querySelectorAll('.stat-number');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll(
    '.service-card, .why-item, .process-step, .industry-item, .about-card, .value-item, .info-card, .feature-card, .blog-card'
);

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });
}

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Form Submission Feedback ---
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('button[type="submit"]');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #00D68F, #00BFFF)';
            }, 2000);
        }
    });
}

// --- Active Nav Link Highlight (Auto) ---
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html') ||
        (currentPath.includes('/services/') && linkHref === 'services.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// --- Highlight Services dropdown when on service page ---
if (currentPath.includes('/services/')) {
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.style.color = 'var(--primary)';
    }
}

// --- Add scroll-padding for fixed navbar ---
document.documentElement.style.scrollPaddingTop = '90px';

console.log('🛡️ Trouble Shooters - Cyber Security & IT Services | Website Loaded');
