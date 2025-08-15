// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // Hero buttons smooth scrolling
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Main Admission Form Validation and Submission
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        // Add error message elements to form groups
        const formGroups = admissionForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            group.appendChild(errorDiv);
        });

        // Real-time validation
        const inputs = admissionForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(this);
            
            // Validate all fields
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            // Check declaration checkbox
            const declaration = document.getElementById('declaration');
            if (!declaration.checked) {
                alert('कृपया घोषणा को स्वीकार करें।');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                showSuccessMessage();
                
                // Get form data for display
                const studentName = formData.get('studentName');
                const fatherName = formData.get('fatherName');
                const admissionClass = formData.get('admissionClass');
                const mobile = formData.get('mobile');
                
                // Show confirmation
                setTimeout(() => {
                    alert(`धन्यवाद! ${studentName} के कक्षा ${admissionClass} में प्रवेश के लिए आपका आवेदन सफलतापूर्वक जमा हो गया है।\n\nआवेदन संख्या: ADM${Date.now()}\n\nहम जल्द ही ${mobile} पर आपसे संपर्क करेंगे।`);
                    this.reset();
                    hideSuccessMessage();
                }, 1000);
            }
        });
    }

    // Field validation function
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        let isValid = true;
        let message = '';

        // Remove previous error state
        formGroup.classList.remove('error');
        errorMessage.textContent = '';

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'यह फील्ड आवश्यक है।';
        }
        // Mobile number validation
        else if (field.type === 'tel' && field.value) {
            const mobilePattern = /^[6-9]\d{9}$/;
            if (!mobilePattern.test(field.value)) {
                isValid = false;
                message = 'कृपया सही मोबाइल नंबर दर्ज करें (10 अंक)।';
            }
        }
        // Email validation
        else if (field.type === 'email' && field.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                isValid = false;
                message = 'कृपया सही ईमेल पता दर्ज करें।';
            }
        }
        // Aadhar number validation
        else if (field.name === 'aadharNumber' && field.value) {
            const aadharPattern = /^\d{12}$/;
            if (!aadharPattern.test(field.value)) {
                isValid = false;
                message = 'आधार नंबर 12 अंकों का होना चाहिए।';
            }
        }
        // Pincode validation
        else if (field.name === 'pincode' && field.value) {
            const pincodePattern = /^\d{6}$/;
            if (!pincodePattern.test(field.value)) {
                isValid = false;
                message = 'पिन कोड 6 अंकों का होना चाहिए।';
            }
        }
        // Percentage validation
        else if (field.name === 'percentage' && field.value) {
            const percentage = parseFloat(field.value);
            if (percentage < 0 || percentage > 100) {
                isValid = false;
                message = 'प्रतिशत 0 से 100 के बीच होना चाहिए।';
            }
        }
        // Date validation (age check)
        else if (field.type === 'date' && field.value) {
            const birthDate = new Date(field.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age < 10 || age > 19) {
                isValid = false;
                message = 'छात्र की आयु 10-19 वर्ष के बीच होनी चाहिए।';
            }
        }

        if (!isValid) {
            formGroup.classList.add('error');
            errorMessage.textContent = message;
        }

        return isValid;
    }

    // Success message functions
    function showSuccessMessage() {
        let successDiv = document.querySelector('.success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.innerHTML = '<i class="fas fa-check-circle"></i> आपका आवेदन सफलतापूर्वक जमा हो गया है!';
            admissionForm.insertBefore(successDiv, admissionForm.firstChild);
        }
        successDiv.classList.add('show');
    }

    function hideSuccessMessage() {
        const successDiv = document.querySelector('.success-message');
        if (successDiv) {
            successDiv.classList.remove('show');
        }
    }

    // Form submission handling for simple contact form (keeping existing functionality)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const childName = this.querySelector('input[placeholder="बच्चे का नाम"]').value;
            const parentName = this.querySelector('input[placeholder="माता-पिता का नाम"]').value;
            const mobile = this.querySelector('input[placeholder="मोबाइल नंबर"]').value;
            const grade = this.querySelector('select').value;
            
            // Basic validation
            if (!childName || !parentName || !mobile || !grade) {
                alert('कृपया सभी फील्ड भरें।');
                return;
            }
            
            // Mobile number validation
            const mobilePattern = /^[6-9]\d{9}$/;
            if (!mobilePattern.test(mobile)) {
                alert('कृपया सही मोबाइल नंबर दर्ज करें।');
                return;
            }
            
            // Show success message
            alert(`धन्यवाद ${parentName} जी! ${childName} के प्रवेश के लिए आपका आवेदन प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।`);
            
            // Reset form
            this.reset();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.feature, .academic-card, .faculty-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 60, 114, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
            header.style.backdropFilter = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add counter animation for statistics (if you want to add stats section later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Add smooth hover effects for cards
    const cards = document.querySelectorAll('.feature, .academic-card, .faculty-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image img');
        
        if (hero && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add search functionality (basic)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'खोजें...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px;
            border: none;
            border-radius: 25px;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            z-index: 1001;
            display: none;
        `;
        
        document.body.appendChild(searchInput);
        
        // Add search button to header
        const searchBtn = document.createElement('button');
        searchBtn.innerHTML = '<i class="fas fa-search"></i>';
        searchBtn.className = 'search-btn';
        searchBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 10px;
            margin-left: 20px;
        `;
        
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.appendChild(searchBtn);
        }
        
        searchBtn.addEventListener('click', function() {
            searchInput.style.display = searchInput.style.display === 'none' ? 'block' : 'none';
            if (searchInput.style.display === 'block') {
                searchInput.focus();
            }
        });
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (text.includes(searchTerm) || searchTerm === '') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
    
    // Initialize search functionality
    addSearchFunctionality();
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav a.active {
        background: rgba(255,215,0,0.2);
        color: #ffd700 !important;
    }
    
    .search-input:focus {
        outline: none;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
    }
    
    .search-btn:hover {
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
    }
    
    @media (max-width: 768px) {
        .nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(30, 60, 114, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .nav.active ul {
            flex-direction: column;
            gap: 15px;
        }
        
        .search-input {
            top: 80px;
            right: 15px;
            left: 15px;
            width: auto;
        }
    }
    
    body.loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

document.head.appendChild(style);
