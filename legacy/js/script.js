// Simple Intersection Observer for Scroll Triggering
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const images = document.querySelectorAll('.dynamic-img');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Highlight text
                steps.forEach(s => s.classList.remove('active'));
                entry.target.classList.add('active');

                // Switch Image
                const targetId = entry.target.getAttribute('data-target');
                images.forEach(img => {
                    img.classList.remove('active');
                    if (img.id === targetId) img.classList.add('active');
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    steps.forEach(step => observer.observe(step));
});
