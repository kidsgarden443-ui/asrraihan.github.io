// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1500);
    });

    // Image loading handler
    function handleImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', function() {
                    this.classList.add('loaded');
                });
                img.addEventListener('error', function() {
                    console.log('Failed to load image:', this.src);
                    // Set a fallback background color
                    this.style.backgroundColor = 'var(--accent-gold)';
                    this.style.opacity = '0.1';
                });
            }
        });
    }

    // Preload images
    function preloadImages() {
        const images = [
            'profile.jpg',
            // Add other image paths here if needed
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Initialize image handling
    preloadImages();
    handleImageLoading();

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
        
        // Animate cursor outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .hire-card, .info-card, .nav-link, .profile-image, .contact-image, .profile-image-about');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.width = '0px';
            cursorDot.style.height = '0px';
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'var(--accent-gold)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        });
    });

    // Navigation
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '20px 0';
        }
    });
    
    // Mobile nav toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.95)';
            navLinks.style.backdropFilter = 'blur(15px)';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '20px';
            navLinks.style.borderTop = '1px solid rgba(255, 255, 255, 0.05)';
        });
    }
    
    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });

    // Animated Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(current);
            }, 16);
        });
    };
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill bars
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = `${width}%`;
                    }, 300);
                }
                
                // Animate stats
                if (entry.target.classList.contains('profile-stats')) {
                    animateStats();
                }
                
                // Add animation class
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.skill-card, .profile-stats, .timeline-content, .project-card, .hire-card').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars on load
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        // Set the final width with delay for animation
        setTimeout(() => {
            bar.style.width = `${width}%`;
        }, 500);
    });

    // Text typing effect
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after hero animation
        setTimeout(typeWriter, 2000);
    }

    // Picture hover effects
    function initPictureEffects() {
        const profilePhotos = document.querySelectorAll('.profile-photo, .about-photo, .contact-photo');
        
        profilePhotos.forEach(photo => {
            photo.addEventListener('mouseenter', () => {
                photo.style.filter = 'grayscale(0%) contrast(120%) brightness(110%)';
            });
            
            photo.addEventListener('mouseleave', () => {
                photo.style.filter = 'grayscale(20%) contrast(110%)';
            });
        });
        
        // Add parallax effect to hero profile image
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.2;
                profileImage.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.01}deg)`;
            });
        }
    }

    // Initialize picture effects
    initPictureEffects();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // In a real implementation, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! In a real implementation, this would send your message to my email.');
            
            // Reset form
            this.reset();
            
            // Reset labels
            this.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.dispatchEvent(new Event('blur'));
            });
        });
    }

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Create dynamic particles in hero section
    function createParticles() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Set styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            container.appendChild(particle);
        }
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            25% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
            50% { transform: translateY(-10px) translateX(-10px); opacity: 0.3; }
            75% { transform: translateY(10px) translateX(5px); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize particles
    createParticles();

    // Window resize handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.background = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.flexDirection = 'row';
            navLinks.style.borderTop = 'none';
        } else {
            navLinks.style.display = 'none';
        }
    });

    // Initialize AOS-like scroll animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.section-title, .about-heading, .skill-card, .timeline-content, .project-card, .hire-card, .info-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
            
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            elementObserver.observe(element);
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();

    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // Add loading animation to buttons
    document.querySelectorAll('.btn[type="submit"], .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.closest('form')) {
                // Add loading animation
                const originalText = this.querySelector('.btn-text').textContent;
                this.querySelector('.btn-text').textContent = 'Sending...';
                this.classList.add('loading');
                
                // Reset after 3 seconds (for demo)
                setTimeout(() => {
                    this.querySelector('.btn-text').textContent = originalText;
                    this.classList.remove('loading');
                }, 3000);
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Initialize everything when page loads
    console.log('Premium Portfolio Website Loaded Successfully!');
    console.log('Designed for: ABU SABER RAIHAN');
    
    // Check if profile image exists
    setTimeout(() => {
        const profileImg = document.querySelector('.profile-photo');
        if (profileImg && !profileImg.complete) {
            console.warn('Profile image might not be loading. Please check the filename.');
            console.log('Expected image filename: profile.jpg');
            console.log('Please ensure your picture is named "profile.jpg" and placed in the same folder as the HTML file.');
        }
    }, 3000);
});