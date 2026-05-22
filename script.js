document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.classList.add('hidden');
        }
    }, 1500);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle (simple implementation)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#FFF';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            }
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
            offset: 100
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.stat-item h3, .review-text strong, .wcu-stat-number, .percentage, .ac-badge-text strong, .ac-stat');
    
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Find the text node that contains the number
                    const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.nodeValue.trim().length > 0);
                    
                    if (textNodes.length > 0) {
                        const textNode = textNodes[textNodes.length - 1]; // Get the last text node
                        const text = textNode.nodeValue.trim();
                        const match = text.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/);
                        
                        if (match) {
                            const prefix = match[1];
                            const target = parseFloat(match[2]);
                            const suffix = match[3];
                            
                            let current = 0;
                            const duration = 2000;
                            const stepTime = 20;
                            const steps = duration / stepTime;
                            const increment = target / steps;
                            const isInteger = target % 1 === 0;
                            
                            const updateCounter = () => {
                                current += increment;
                                if (current < target) {
                                    textNode.nodeValue = ' ' + prefix + (isInteger ? Math.ceil(current) : current.toFixed(1)) + suffix;
                                    setTimeout(updateCounter, stepTime);
                                } else {
                                    textNode.nodeValue = ' ' + prefix + target + suffix;
                                }
                            };
                            
                            updateCounter();
                            observer.unobserve(el);
                        }
                    }
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
});
