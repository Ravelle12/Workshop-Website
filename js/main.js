// Language Switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Store language preference
        localStorage.setItem('language', btn.textContent);
        
        // Here you would load translations
        console.log('Language switched to:', btn.textContent);
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top button (optional - you can add this)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled > 300) {
        // Show back to top button
        console.log('Scrolled past 300px');
    }
});