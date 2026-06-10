// ═══════════════════════════════════════════
// BLOG POST - SHARED JAVASCRIPT
// ═══════════════════════════════════════════

// Copy link to clipboard
function copyLink() {
    const btn = document.getElementById('copyBtn');
    if (!btn) return;

    navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.background = 'rgba(0, 214, 143, 0.15)';
        btn.style.color = '#00D68F';
        btn.style.borderColor = '#00D68F';

        setTimeout(() => {
            btn.innerHTML = original;
            btn.style.background = '';
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    });
}

// Active TOC highlight on scroll
document.addEventListener('DOMContentLoaded', () => {
    const tocLinks = document.querySelectorAll('.toc-link');
    const headings = document.querySelectorAll('.article-content h2[id]');

    if (tocLinks.length && headings.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    tocLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });

        headings.forEach(h => observer.observe(h));

        // Smooth scroll
        tocLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
});
