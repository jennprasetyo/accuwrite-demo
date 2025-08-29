// A/B Testing Configuration
const ABTest = {
    version: Math.random() < 0.5 ? 'A' : 'B',
    
    init() {
        this.setupCTATest();
        this.trackVersion();
        this.setupFormHandling();
        this.setupAnalytics();
    },
    
    setupCTATest() {
        const mainCTA = document.getElementById('main-cta');
        const ctaButtons = document.querySelectorAll('.cta-primary');
        
        if (this.version === 'B') {
            // Version B: Different CTA text and positioning
            mainCTA.textContent = 'Get Started Free';
            mainCTA.style.background = '#38a169';
            
            // Move CTA to center for version B
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.textAlign = 'center';
            
            console.log('A/B Test: Running Version B (Center CTA)');
        } else {
            console.log('A/B Test: Running Version A (Left CTA)');
        }
    },
    
    trackVersion() {
        // Track which version the user sees
        window.abTestVersion = this.version;
        console.log(`A/B Test Version: ${this.version}`);
        
        // Send to analytics (simulated)
        this.sendAnalytics('page_view', {
            ab_test_version: this.version,
            timestamp: new Date().toISOString()
        });
    },
    
    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            });
        }
        
        // Track CTA clicks
        document.querySelectorAll('.cta-primary, .cta-secondary').forEach(button => {
            button.addEventListener('click', (e) => {
                this.trackCTAClick(e.target);
            });
        });
        
        // A/B test for contact form positioning
        this.setupContactFormABTest();
    },
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Add A/B test version to form data
        data.ab_test_version = this.version;
        
        console.log('Form submitted:', data);
        
        // Simulate form submission
        this.sendAnalytics('form_submit', data);
        
        // Show success message
        this.showSuccessMessage();
    },
    
    trackCTAClick(button) {
        const buttonText = button.textContent;
        const buttonType = button.classList.contains('cta-primary') ? 'primary' : 'secondary';
        
        this.sendAnalytics('cta_click', {
            button_text: buttonText,
            button_type: buttonType,
            ab_test_version: this.version,
            timestamp: new Date().toISOString()
        });
        
        console.log(`CTA clicked: ${buttonText} (${buttonType}) - Version ${this.version}`);
    },
    
    setupAnalytics() {
        // Track page performance metrics
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.sendAnalytics('page_performance', {
                load_time: Math.round(loadTime),
                ab_test_version: this.version
            });
        });
        
        // Track hero image loading performance
        const heroImg = document.querySelector('.dashboard-img');
        if (heroImg) {
            const imgLoadStart = performance.now();
            heroImg.addEventListener('load', () => {
                const imgLoadTime = performance.now() - imgLoadStart;
                console.log(`Hero image loaded in ${Math.round(imgLoadTime)}ms`);
                
                if (imgLoadTime > 3000) {
                    console.warn('Hero image loading too slow on mobile devices');
                }
            });
        }
    },
    
    sendAnalytics(event, data) {
        // Simulate sending to analytics service
        const analyticsData = {
            event,
            ...data,
            user_agent: navigator.userAgent,
            page_url: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        console.log('Analytics Event:', analyticsData);
        
        // In real implementation, send to your analytics service
        // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(analyticsData) });
    },
    
    showSuccessMessage() {
        const form = document.getElementById('contact-form');
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="background: #48bb78; color: white; padding: 1rem; border-radius: 8px; text-align: center; margin-top: 1rem;">
                <h3>Thank you for your interest!</h3>
                <p>We'll be in touch within 24 hours to set up your free trial.</p>
            </div>
        `;
        
        form.style.display = 'none';
        form.parentNode.appendChild(successMessage);
    },
    
    setupContactFormABTest() {
        // A/B test for contact form enhancements
        if (this.version === 'B') {
            const contactSection = document.querySelector('#contact');
            const formSubmitBtn = document.getElementById('form-submit-btn');
            
            // Version B: Enhanced form with social proof
            if (contactSection) {
                const subtitle = contactSection.querySelector('.contact-subtitle');
                if (subtitle) {
                    subtitle.textContent = 'Join 1,000+ teams who\'ve eliminated progress report pain';
                }
            }
            
            if (formSubmitBtn) {
                formSubmitBtn.textContent = 'Get Started Free - Join the Beta';
                formSubmitBtn.style.background = '#38a169';
            }
            
            console.log('A/B Test: Contact form version B - Enhanced social proof');
        } else {
            console.log('A/B Test: Contact form version A - Standard form');
        }
        
        // Track form field interactions
        const formFields = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', () => {
                this.sendAnalytics('form_field_focus', {
                    field_name: field.name,
                    ab_test_version: this.version
                });
            });
        });
    }
};

// Mobile Performance Optimization
const MobileOptimizer = {
    init() {
        this.optimizeImages();
        this.setupLazyLoading();
        this.optimizeAnimations();
    },
    
    optimizeImages() {
        const heroImg = document.querySelector('.dashboard-img');
        if (heroImg && window.innerWidth <= 768) {
            // Use smaller image for mobile
            heroImg.style.minHeight = '250px';
            console.log('Mobile optimization: Reduced hero image height');
        }
    },
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    },
    
    optimizeAnimations() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth <= 768) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.1s !important;
                    transition-duration: 0.1s !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    ABTest.init();
    MobileOptimizer.init();
    
    // Smooth scrolling for navigation links
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
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ABTest, MobileOptimizer };
}