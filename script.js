// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Responsive navigation menu for mobile devices
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // Create hamburger menu button
        const menuBtn = document.createElement('div');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Add the button to the header
        header.querySelector('.container').appendChild(menuBtn);
        
        // Toggle menu on click
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    };
    
    // Add mobile menu styles
    const addMobileStyles = () => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @media screen and (max-width: 768px) {
                nav ul {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background-color: #fff;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    padding: 20px 0;
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                    z-index: 999;
                }
                
                nav.active ul {
                    transform: translateY(0);
                }
                
                nav ul li {
                    margin: 15px 0;
                    text-align: center;
                }
                
                .mobile-menu-btn {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    width: 30px;
                    height: 20px;
                    cursor: pointer;
                }
                
                .mobile-menu-btn span {
                    display: block;
                    height: 3px;
                    width: 100%;
                    background-color: #2c3e50;
                    border-radius: 3px;
                    transition: all 0.3s ease;
                }
                
                .mobile-menu-btn.active span:nth-child(1) {
                    transform: translateY(8.5px) rotate(45deg);
                }
                
                .mobile-menu-btn.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .mobile-menu-btn.active span:nth-child(3) {
                    transform: translateY(-8.5px) rotate(-45deg);
                }
            }
        `;
        document.head.appendChild(styleEl);
    };
    
    // Initialize mobile menu for smaller screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
        addMobileStyles();
    }
    
    // Handle window resize
    let mobileMenuInitialized = window.innerWidth <= 768;
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !mobileMenuInitialized) {
            createMobileMenu();
            addMobileStyles();
            mobileMenuInitialized = true;
        }
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add scroll to top button
    const createScrollTopButton = () => {
        const scrollBtn = document.createElement('div');
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add styles for the button
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .scroll-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(to right, #3498db, #2ecc71);
                color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                z-index: 999;
            }
            
            .scroll-top-btn.show {
                opacity: 1;
                visibility: visible;
            }
            
            .scroll-top-btn:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
            }
        `;
        document.head.appendChild(styleEl);
    };
    
    createScrollTopButton();
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For now, just show a success message
                const formGroups = document.querySelectorAll('.form-group');
                formGroups.forEach(group => group.style.display = 'none');
                
                const submitBtn = document.querySelector('.contact-form .btn');
                submitBtn.style.display = 'none';
                
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${name}. We will get back to you soon.</p>
                `;
                
                contactForm.appendChild(successMessage);
                
                // Add styles for success message
                const styleEl = document.createElement('style');
                styleEl.textContent = `
                    .success-message {
                        text-align: center;
                        padding: 30px;
                    }
                    
                    .success-message i {
                        font-size: 4rem;
                        color: #2ecc71;
                        margin-bottom: 20px;
                    }
                    
                    .success-message h3 {
                        font-size: 1.5rem;
                        margin-bottom: 15px;
                        color: #2c3e50;
                    }
                    
                    .success-message p {
                        color: #555;
                    }
                `;
                document.head.appendChild(styleEl);
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                    formGroups.forEach(group => group.style.display = 'block');
                    submitBtn.style.display = 'inline-block';
                    contactForm.reset();
                }, 5000);
            }
        });
    }
});