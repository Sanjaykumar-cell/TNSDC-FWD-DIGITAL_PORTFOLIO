// Portfolio JavaScript Functionality
$(document).ready(function() {
    
    // Initialize the portfolio
    initializePortfolio();
    
    // Page Navigation System
    function initializePortfolio() {
        // Set up navigation event listeners
        setupNavigation();
        
        // Set up mobile navigation
        setupMobileNavigation();
        
        // Initialize with home page
        showPage('home');
        
        // Set up scroll animations
        setupScrollAnimations();
        
        // Set up hover effects
        setupHoverEffects();
        
        // Set up smooth scrolling
        setupSmoothScrolling();
    }
    
    // Navigation Event Handlers
    function setupNavigation() {
        $('a[data-page]').on('click', function(event) {
            event.preventDefault();
            var targetPage = $(this).data('page');
            
            // Show the target page
            showPage(targetPage);
            
            // Update navigation active state
            updateNavigationState(targetPage);
            
            // Close mobile navigation if open
            closeMobileNav();
        });
    }
    
    // Mobile Navigation Setup
    function setupMobileNavigation() {
        // Navigation toggle button
        $('#navToggle').on('click', function(event) {
            event.preventDefault();
            toggleMobileNav();
        });
        
        // Overlay click to close navigation
        $('#overlay').on('click', function(event) {
            event.preventDefault();
            closeMobileNav();
        });
        
        // Close navigation on escape key
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27) { // Escape key
                closeMobileNav();
            }
        });
    }
    
    // Page Display Functions
    function showPage(pageName) {
        // Hide all pages
        $('.page-section').removeClass('active');
        
        // Show target page
        $('#' + pageName + '-page').addClass('active');
        
        // Scroll to top smoothly
        $('html, body').animate({scrollTop: 0}, 300);
        
        // Trigger animations after a short delay
        setTimeout(function() {
            triggerPageAnimations(pageName);
        }, 100);
        
        // Update page title
        updatePageTitle(pageName);
    }
    
    // Navigation State Management
    function updateNavigationState(targetPage) {
        $('#colorlib-main-nav ul li').removeClass('active');
        $('#colorlib-main-nav ul li a[data-page="' + targetPage + '"]').parent().addClass('active');
    }
    
    // Mobile Navigation Functions
    function toggleMobileNav() {
        var nav = $('#colorlib-main-nav');
        var overlay = $('#overlay');
        var toggleIcon = $('#navToggle i');
        
        nav.toggleClass('active');
        overlay.toggleClass('active');
        
        // Update hamburger icon
        if (nav.hasClass('active')) {
            toggleIcon.removeClass('fa-bars').addClass('fa-times');
        } else {
            toggleIcon.removeClass('fa-times').addClass('fa-bars');
        }
    }
    
    function closeMobileNav() {
        $('#colorlib-main-nav').removeClass('active');
        $('#overlay').removeClass('active');
        $('#navToggle i').removeClass('fa-times').addClass('fa-bars');
    }
    
    // Animation Functions
    function triggerPageAnimations(pageName) {
        $('#' + pageName + '-page .animate-box').each(function(index) {
            var element = $(this);
            setTimeout(function() {
                element.addClass('animated fadeInUp');
            }, index * 100); // Stagger animations
        });
    }
    
    // Scroll Animation Setup
    function setupScrollAnimations() {
        $(window).scroll(function() {
            $('.page-section.active .animate-box').each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();
                var viewportTop = $(window).scrollTop();
                var viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animated fadeInUp');
                }
            });
        });
    }
    
    // Hover Effects
    function setupHoverEffects() {
        // Card hover effects
        $('.project-card, .skill-card, .contact-card').hover(
            function() {
                $(this).addClass('animated pulse');
            },
            function() {
                $(this).removeClass('animated pulse');
            }
        );
        
        // Button hover effects
        $('.btn-primary').hover(
            function() {
                $(this).addClass('animated heartBeat');
            },
            function() {
                $(this).removeClass('animated heartBeat');
            }
        );
        
        // Navigation hover effects
        $('#colorlib-main-nav ul li a').hover(
            function() {
                $(this).addClass('animated fadeIn');
            },
            function() {
                $(this).removeClass('animated fadeIn');
            }
        );
    }
    
    // Smooth Scrolling
    function setupSmoothScrolling() {
        $('a[href^="#"]').on('click', function(event) {
            var target = $(this.getAttribute('href'));
            if(target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
            }
        });
    }
    
    // Page Title Updates
    function updatePageTitle(pageName) {
        var titles = {
            'home': 'Sanjay - Digital Designer',
            'about': 'About - Sanjay Kumar',
            'skills': 'Skills - Sanjay Kumar',
            'projects': 'Projects - Sanjay Kumar',
            'contact': 'Contact - Sanjay Kumar'
        };
        
        document.title = titles[pageName] || 'Sanjay - Digital Designer';
    }
    
    // Utility Functions
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Optimized scroll handler
    var debouncedScroll = debounce(function() {
        setupScrollAnimations();
    }, 10);
    
    $(window).on('scroll', debouncedScroll);
    
    // Loading Animation
    function showLoadingAnimation() {
        $('body').addClass('loading');
    }
    
    function hideLoadingAnimation() {
        $('body').removeClass('loading');
    }
    
    // Preloader (if needed)
    $(window).on('load', function() {
        hideLoadingAnimation();
        
        // Trigger initial animations
        setTimeout(function() {
            $('.hero-content').addClass('animated fadeInUp');
        }, 500);
    });
    
    // Contact Form Validation (if form is added later)
    function setupContactForm() {
        $('#contact-form').on('submit', function(e) {
            e.preventDefault();
            
            var name = $('#name').val();
            var email = $('#email').val();
            var message = $('#message').val();
            
            if (validateForm(name, email, message)) {
                // Send form data
                sendContactForm(name, email, message);
            }
        });
    }
    
    function validateForm(name, email, message) {
        var isValid = true;
        
        if (!name || name.length < 2) {
            showError('Name is required and must be at least 2 characters');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            showError('Please enter a valid email address');
            isValid = false;
        }
        
        if (!message || message.length < 10) {
            showError('Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(message) {
        // Create or update error message
        var errorDiv = $('#form-error');
        if (errorDiv.length === 0) {
            errorDiv = $('<div id="form-error" class="alert alert-danger"></div>');
            $('#contact-form').prepend(errorDiv);
        }
        errorDiv.text(message).fadeIn();
        
        // Hide error after 5 seconds
        setTimeout(function() {
            errorDiv.fadeOut();
        }, 5000);
    }
    
    function sendContactForm(name, email, message) {
        // This would be connected to a backend service
        console.log('Sending contact form:', { name, email, message });
        
        // Show success message
        var successDiv = $('<div class="alert alert-success">Thank you for your message! I\'ll get back to you soon.</div>');
        $('#contact-form').prepend(successDiv);
        
        // Clear form
        $('#contact-form')[0].reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            successDiv.fadeOut();
        }, 5000);
    }
    
    // Keyboard Navigation
    $(document).on('keydown', function(e) {
        // Navigate with arrow keys
        if (e.altKey) {
            var currentPage = $('.page-section.active').attr('id').replace('-page', '');
            var pages = ['home', 'about', 'skills', 'projects', 'contact'];
            var currentIndex = pages.indexOf(currentPage);
            
            if (e.keyCode === 37 && currentIndex > 0) { // Left arrow
                showPage(pages[currentIndex - 1]);
                updateNavigationState(pages[currentIndex - 1]);
            } else if (e.keyCode === 39 && currentIndex < pages.length - 1) { // Right arrow
                showPage(pages[currentIndex + 1]);
                updateNavigationState(pages[currentIndex + 1]);
            }
        }
    });
    
    // Performance Optimization
    function optimizeImages() {
        // Lazy loading for images
        var images = $('img[data-src]');
        
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.each(function() {
            imageObserver.observe(this);
        });
    }
    
    // Initialize image optimization
    optimizeImages();
    
    // Analytics and Tracking (placeholder)
    function trackPageView(pageName) {
        // This would be connected to Google Analytics or similar
        console.log('Page view tracked:', pageName);
        
        // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_title: pageName });
    }
    
    // Theme Toggle (if dark/light mode is needed)
    function setupThemeToggle() {
        $('#theme-toggle').on('click', function() {
            $('body').toggleClass('light-theme');
            localStorage.setItem('theme', $('body').hasClass('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        var savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            $('body').addClass('light-theme');
        }
    }
    
    // Error Handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could send error reports to a logging service
    });
    
    // Print Styles Handler
    window.addEventListener('beforeprint', function() {
        // Ensure all content is visible for printing
        $('.page-section').addClass('active');
    });
    
    window.addEventListener('afterprint', function() {
        // Restore normal view
        $('.page-section').removeClass('active');
        showPage('home'); // or restore previous page
    });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}