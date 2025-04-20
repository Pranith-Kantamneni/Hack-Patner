document.addEventListener('DOMContentLoaded', function() {
    // ===== Navigation and Mobile Menu =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    hamburger.addEventListener('click', function() {
        // Toggle active class for hamburger animation
        this.classList.toggle('active');
        
        // Create mobile menu if it doesn't exist
        if (!document.querySelector('.mobile-menu')) {
            const mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';
            
            // Clone nav links and auth buttons for mobile
            const navLinksClone = navLinks.cloneNode(true);
            const authButtonsClone = authButtons.cloneNode(true);
            
            mobileMenu.appendChild(navLinksClone);
            mobileMenu.appendChild(authButtonsClone);
            
            // Insert after navbar
            document.querySelector('.navbar').insertAdjacentElement('afterend', mobileMenu);
            
            // Add event listeners to the cloned buttons
            mobileMenu.querySelector('.login-btn').addEventListener('click', () => openModal('login-modal'));
            mobileMenu.querySelector('.signup-btn').addEventListener('click', () => openModal('signup-modal'));
            
            // Add styles for mobile menu
            const style = document.createElement('style');
            style.textContent = `
                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    background: white;
                    padding: 20px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    position: absolute;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    z-index: 999;
                }
                .mobile-menu .nav-links {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .mobile-menu .auth-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .mobile-menu .auth-buttons button {
                    width: 100%;
                }
                .mobile-menu.active {
                    display: flex;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Toggle mobile menu
        document.querySelector('.mobile-menu').classList.toggle('active');
    });
    
    // ===== Hero Carousel =====
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Add more slides if there's only one
    if (slides.length === 1) {
        const slideImages = [
            'https://images.unsplash.com/photo-1565882694798-4c9d004e65b7?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1637073849667-91120a924221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1733945761533-727f49908d70?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ];
        
        const slidesContainer = document.querySelector('.hero-slides-container');
        
        // Remove active class from the first slide
        slides[0].classList.remove('active');
        
        // Create slide indicators
        const indicators = document.createElement('div');
        indicators.className = 'slide-indicators';
        indicators.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 20;
        `;
        
        // Add all slides including the existing one
        for (let i = 0; i < slideImages.length; i++) {
            // Skip first image as it already exists
            if (i > 0) {
                const newSlide = document.createElement('div');
                newSlide.className = 'hero-slide';
                newSlide.style.backgroundImage = `url('${slideImages[i]}')`;
                slidesContainer.appendChild(newSlide);
            }
            
            // Create indicator for each slide
            const indicator = document.createElement('button');
            indicator.className = 'slide-indicator';
            indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
            indicator.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                border: none;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            // Add click event to indicators
            indicator.addEventListener('click', () => {
                goToSlide(i);
            });
            
            indicators.appendChild(indicator);
        }
        
        document.querySelector('.hero').appendChild(indicators);
    }
    
    // Update slides array after potentially adding new slides
    const allSlides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    
    function goToSlide(slideIndex) {
        // Remove active class from all slides
        allSlides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        allSlides[slideIndex].classList.add('active');
        
        // Update indicators
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                if (index === slideIndex) {
                    indicator.style.background = 'white';
                    indicator.style.width = '20px';
                    indicator.style.borderRadius = '10px';
                } else {
                    indicator.style.background = 'rgba(255, 255, 255, 0.5)';
                    indicator.style.width = '12px';
                    indicator.style.borderRadius = '50%';
                }
            });
        }
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % allSlides.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + allSlides.length) % allSlides.length;
        goToSlide(currentSlide);
    }
    
    // Initialize first slide
    goToSlide(0);
    
    // Set up auto-rotation
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // Add event listeners for carousel controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopSlideInterval();
            startSlideInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopSlideInterval();
            startSlideInterval();
        });
    }
    
    // Start auto-rotation
    startSlideInterval();
    
    // ===== Event Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const techFilter = document.getElementById('tech-filter');
    const priceFilter = document.getElementById('price-filter');
    const eventCards = document.querySelectorAll('.event-card');
    
    // Apply filters when buttons are clicked
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filter = btn.getAttribute('data-filter');
            
            // Apply filters
            applyFilters(filter, techFilter.value, priceFilter.value);
        });
    });
    
    // Apply filters when select inputs change
    techFilter.addEventListener('change', () => {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        applyFilters(activeFilter, techFilter.value, priceFilter.value);
    });
    
    priceFilter.addEventListener('change', () => {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        applyFilters(activeFilter, techFilter.value, priceFilter.value);
    });
    
    function applyFilters(typeFilter, techFilterValue, priceFilterValue) {
        eventCards.forEach(card => {
            let showCard = true;
            
            // Type filter
            if (typeFilter !== 'all') {
                const cardType = card.querySelector('.event-type').classList[1];
                if (cardType !== typeFilter) {
                    showCard = false;
                }
            }
            
            // Tech filter
            if (techFilterValue !== 'all' && showCard) {
                const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
                const matchesTech = techTags.some(tag => tag.includes(techFilterValue.replace('-', ' ').toLowerCase()));
                
                if (!matchesTech) {
                    showCard = false;
                }
            }
            
            // Price filter
            if (priceFilterValue !== 'all' && showCard) {
                const priceText = card.querySelector('.event-meta').lastElementChild.textContent.toLowerCase();
                if (!priceText.includes(priceFilterValue)) {
                    showCard = false;
                }
            }
            
            // Show or hide card
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Check if any cards are visible
        const visibleCards = Array.from(eventCards).filter(card => card.style.display !== 'none');
        
        // Show empty state if no cards are visible
        const eventsGrid = document.querySelector('.events-grid');
        const existingEmptyState = document.querySelector('.empty-state');
        
        if (visibleCards.length === 0) {
            if (!existingEmptyState) {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i class="fas fa-search"></i>
                    <p>No matching events found. Try adjusting your filters.</p>
                `;
                eventsGrid.appendChild(emptyState);
            }
        } else if (existingEmptyState) {
            existingEmptyState.remove();
        }
    }
    
    // ===== Modal Handling =====
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const createPostBtn = document.querySelector('.create-post-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showSignupLink = document.getElementById('show-signup');
    const showLoginLink = document.getElementById('show-login');
    
    // Create modals if they don't exist
    function createModals() {
        // Create login modal if it doesn't exist
        if (!document.getElementById('login-modal')) {
            const loginModal = document.createElement('div');
            loginModal.className = 'modal';
            loginModal.id = 'login-modal';
            loginModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">×</span>
                    <h2>Login</h2>
                    <form id="login-form">
                        <div class="form-group">
                            <label for="login-email">Email:</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Password:</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <button type="submit" class="submit-btn">Login</button>
                        <p class="form-footer">Don't have an account? <a href="#" id="show-signup">Sign up</a></p>
                    </form>
                </div>
            `;
            document.body.appendChild(loginModal);
        }
        
        // Create signup modal if it doesn't exist
        if (!document.getElementById('signup-modal')) {
            const signupModal = document.createElement('div');
            signupModal.className = 'modal';
            signupModal.id = 'signup-modal';
            signupModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">×</span>
                    <h2>Sign Up</h2>
                    <form id="signup-form">
                        <div class="form-group">
                            <label for="signup-username">Username:</label>
                            <input type="text" id="signup-username" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-email">Email:</label>
                            <input type="email" id="signup-email" required>
                        </div>
                        <div class="form-group">
                            <label for="signup-password">Password:</label>
                            <input type="password" id="signup-password" required>
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirm Password:</label>
                            <input type="password" id="confirm-password" required>
                        </div>
                        <button type="submit" class="submit-btn">Sign Up</button>
                        <p class="form-footer">Already have an account? <a href="#" id="show-login">Login</a></p>
                    </form>
                </div>
            `;
            document.body.appendChild(signupModal);
        }
        
        // Create post modal if it doesn't exist
        if (!document.getElementById('post-modal')) {
            const postModal = document.createElement('div');
            postModal.className = 'modal';
            postModal.id = 'post-modal';
            postModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">×</span>
                    <h2>Create a New Post</h2>
                    <form id="post-form">
                        <div class="form-group">
                            <label for="post-type">I am:</label>
                            <select id="post-type" required>
                                <option value="looking-for-team">Looking for team members</option>
                                <option value="looking-for-hackathon">Looking for a hackathon to join</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="event-name">Event Name:</label>
                            <input type="text" id="event-name" placeholder="Hackathon name (if applicable)">
                        </div>
                        <div class="form-group">
                            <label for="tech-stack">Tech Stack:</label>
                            <input type="text" id="tech-stack" placeholder="e.g., React, Node.js, Python" required>
                        </div>
                        <div class="form-group">
                            <label for="description">Description:</label>
                            <textarea id="description" placeholder="Describe what you're looking for..." required></textarea>
                        </div>
                        <button type="submit" class="submit-btn">Post</button>
                    </form>
                </div>
            `;
            document.body.appendChild(postModal);
        }
        
        // Update close modal buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });
        
        // Update show signup/login links
        document.getElementById('show-signup').addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal('signup-modal');
        });
        
        document.getElementById('show-login').addEventListener('click', (e) => {
            e.preventDefault();
            closeAllModals();
            openModal('login-modal');
        });
        
        // Form submissions
        document.getElementById('login-form').addEventListener('submit', handleLoginSubmit);
        document.getElementById('signup-form').addEventListener('submit', handleSignupSubmit);
        document.getElementById('post-form').addEventListener('submit', handlePostSubmit);
    }
    
    // Create modals
    createModals();
    
    // Open modal function
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            // Add animation class
            modal.querySelector('.modal-content').classList.add('fade-in');
        }
    }
    
    // Close all modals
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Open modals on button click
    loginBtn.addEventListener('click', () => openModal('login-modal'));
    signupBtn.addEventListener('click', () => openModal('signup-modal'));
    createPostBtn.addEventListener('click', () => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn) {
            openModal('post-modal');
        } else {
            openModal('login-modal');
            showNotification('Please login to create a post', 'info');
        }
    });
    
    // ===== Form Submissions =====
    function handleLoginSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // In a real app, this would validate with a backend
        // For demo, just simulate login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Update UI for logged in state
        updateUIForLoggedInUser(email);
        
        // Close modal and show notification
        closeAllModals();
        showNotification('Login successful!', 'success');
    }
    
    function handleSignupSubmit(e) {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Simple validation
        if (!username || !email || !password || !confirmPassword) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // In a real app, this would create a user in the backend
        // For demo, just simulate signup and login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('username', username);
        
        // Update UI for logged in state
        updateUIForLoggedInUser(email);
        
        // Close modal and show notification
        closeAllModals();
        showNotification('Account created successfully!', 'success');
    }
    
    function handlePostSubmit(e) {
        e.preventDefault();
        const postType = document.getElementById('post-type').value;
        const eventName = document.getElementById('event-name').value;
        const techStack = document.getElementById('tech-stack').value;
        const description = document.getElementById('description').value;
        
        // Simple validation
        if (!techStack || !description) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Add the new post to the events grid
        addNewPost(postType, eventName, techStack, description);
        
        // Close modal and show notification
        closeAllModals();
        showNotification('Post created successfully!', 'success');
        
        // Reset form
        document.getElementById('post-form').reset();
    }
    
    // ===== Event Card Interactions =====
    // Add event listeners to contact buttons
    document.querySelectorAll('.contact-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                showNotification('Contact request sent!', 'success');
            } else {
                openModal('login-modal');
                showNotification('Please login to contact team members', 'info');
            }
        });
    });
    
    // Add event listeners to save buttons
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Check if user is logged in
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                // Toggle saved state
                if (this.textContent === 'Save') {
                    this.textContent = 'Saved';
                    this.classList.add('saved');
                    this.style.background = '#f0e6ff';
                    this.style.borderColor = '#6b46c1';
                    this.style.color = '#6b46c1';
                    showNotification('Event saved to your profile!', 'success');
                } else {
                    this.textContent = 'Save';
                    this.classList.remove('saved');
                    this.style.background = 'transparent';
                    this.style.borderColor = '#ddd';
                    this.style.color = '#666';
                    showNotification('Event removed from your profile', 'info');
                }
            } else {
                openModal('login-modal');
                showNotification('Please login to save events', 'info');
            }
        });
    });
    
    // ===== Helper Functions =====
    // Add new post to events grid
    function addNewPost(postType, eventName, techStack, description) {
        const eventsGrid = document.querySelector('.events-grid');
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        // Parse tech stack into an array
        const techArray = techStack.split(',').map(tech => tech.trim());
        
        // Choose a random image from existing event cards
        const existingImages = Array.from(document.querySelectorAll('.event-image')).map(img => 
            img.style.backgroundImage.replace(/url$$['"](.+)['"]$$/, '$1')
        );
        const randomImage = existingImages[Math.floor(Math.random() * existingImages.length)];
        
        // Determine event type class
        const typeClass = postType === 'looking-for-team' ? 'technical' : 'fun';
        const typeText = postType === 'looking-for-team' ? 'Technical' : 'Fun';
        
        eventCard.innerHTML = `
            <div class="event-image" style="background-image: url('${randomImage}')">
                <div class="event-type ${typeClass}">${typeText}</div>
            </div>
            <div class="event-content">
                <h3 class="event-title">${eventName || (postType === 'looking-for-team' ? 'Looking for Team Members' : 'Looking for a Hackathon')}</h3>
                <p class="event-description">${description}</p>
                <div class="tech-tags">
                    ${techArray.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="event-meta">
                    <span>Just now</span>
                    <span>${Math.random() > 0.5 ? 'Free' : 'Paid'}</span>
                </div>
                <div class="event-actions">
                    <button class="contact-btn">Contact</button>
                    <button class="save-btn">Save</button>
                </div>
            </div>
        `;
        
        // Add to the beginning of the grid
        if (eventsGrid.firstChild) {
            eventsGrid.insertBefore(eventCard, eventsGrid.firstChild);
        } else {
            eventsGrid.appendChild(eventCard);
        }
        
        // Add event listeners to the new buttons
        const contactBtn = eventCard.querySelector('.contact-btn');
        const saveBtn = eventCard.querySelector('.save-btn');
        
        contactBtn.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                showNotification('Contact request sent!', 'success');
            } else {
                openModal('login-modal');
                showNotification('Please login to contact team members', 'info');
            }
        });
        
        saveBtn.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (isLoggedIn) {
                if (this.textContent === 'Save') {
                    this.textContent = 'Saved';
                    this.classList.add('saved');
                    this.style.background = '#f0e6ff';
                    this.style.borderColor = '#6b46c1';
                    this.style.color = '#6b46c1';
                    showNotification('Event saved to your profile!', 'success');
                } else {
                    this.textContent = 'Save';
                    this.classList.remove('saved');
                    this.style.background = 'transparent';
                    this.style.borderColor = '#ddd';
                    this.style.color = '#666';
                    showNotification('Event removed from your profile', 'info');
                }
            } else {
                openModal('login-modal');
                showNotification('Please login to save events', 'info');
            }
        });
        
        // Add animation
        eventCard.classList.add('fade-in');
    }
    
    // Show notification
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Add icon based on type
        let icon;
        switch (type) {
            case 'success':
                icon = 'check-circle';
                notification.style.borderLeft = '4px solid #10b981';
                break;
            case 'error':
                icon = 'exclamation-circle';
                notification.style.borderLeft = '4px solid #ef4444';
                break;
            case 'info':
                icon = 'info-circle';
                notification.style.borderLeft = '4px solid #3b82f6';
                break;
            default:
                icon = 'bell';
                notification.style.borderLeft = '4px solid #6b46c1';
        }
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span class="notification-message">${message}</span>
            <span class="notification-close">&times;</span>
        `;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '12px 20px';
        notification.style.background = 'white';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '10px';
        notification.style.animation = 'notificationIn 0.3s ease forwards';
        
        // Style icon based on type
        const iconElement = notification.querySelector('i');
        switch (type) {
            case 'success':
                iconElement.style.color = '#10b981';
                break;
            case 'error':
                iconElement.style.color = '#ef4444';
                break;
            case 'info':
                iconElement.style.color = '#3b82f6';
                break;
            default:
                iconElement.style.color = '#6b46c1';
        }
        
        // Add to document
        document.body.appendChild(notification);
        
        // Add click event to close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'notificationOut 0.3s ease forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Add animation keyframes
        if (!document.getElementById('notification-animations')) {
            const style = document.createElement('style');
            style.id = 'notification-animations';
            style.textContent = `
                @keyframes notificationIn {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes notificationOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Update UI for logged in user
    function updateUIForLoggedInUser(email) {
        // Create user menu if it doesn't exist
        if (!document.querySelector('.user-menu')) {
            // Remove login and signup buttons
            const authButtons = document.querySelector('.auth-buttons');
            authButtons.innerHTML = '';
            
            // Create user menu
            const userMenu = document.createElement('div');
            userMenu.className = 'user-menu';
            userMenu.innerHTML = `
                <div class="user-avatar">
                    <span>${email.charAt(0).toUpperCase()}</span>
                </div>
                <div class="user-dropdown">
                    <a href="#" class="dropdown-item">My Profile</a>
                    <a href="#" class="dropdown-item">My Events</a>
                    <a href="#" class="dropdown-item">Messages</a>
                    <a href="#" class="dropdown-item logout-btn">Logout</a>
                </div>
            `;
            
            // Style user menu
            userMenu.style.position = 'relative';
            userMenu.style.cursor = 'pointer';
            
            const userAvatar = userMenu.querySelector('.user-avatar');
            userAvatar.style.width = '36px';
            userAvatar.style.height = '36px';
            userAvatar.style.borderRadius = '50%';
            userAvatar.style.background = 'linear-gradient(135deg, #6b46c1, #8a67d8)';
            userAvatar.style.color = 'white';
            userAvatar.style.display = 'flex';
            userAvatar.style.alignItems = 'center';
            userAvatar.style.justifyContent = 'center';
            userAvatar.style.fontWeight = 'bold';
            
            const userDropdown = userMenu.querySelector('.user-dropdown');
            userDropdown.style.position = 'absolute';
            userDropdown.style.top = '45px';
            userDropdown.style.right = '0';
            userDropdown.style.background = 'white';
            userDropdown.style.borderRadius = '8px';
            userDropdown.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            userDropdown.style.padding = '10px 0';
            userDropdown.style.width = '150px';
            userDropdown.style.display = 'none';
            userDropdown.style.zIndex = '100';
            
            const dropdownItems = userMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.style.display = 'block';
                item.style.padding = '8px 15px';
                item.style.color = '#555';
                item.style.transition = 'background 0.3s ease';
            });
            
            // Add hover effect to dropdown items
            const style = document.createElement('style');
            style.textContent = `
                .dropdown-item:hover {
                    background: #f5f5f5;
                }
                .user-menu:hover .user-dropdown {
                    display: block;
                }
            `;
            document.head.appendChild(style);
            
            // Add logout functionality
            userMenu.querySelector('.logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('username');
                location.reload();
            });
            
            // Add user menu to auth buttons container
            authButtons.appendChild(userMenu);
        }
    }
    
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        const userEmail = localStorage.getItem('userEmail');
        updateUIForLoggedInUser(userEmail);
    }
    
    // ===== Dark Mode Toggle =====
    // Add dark mode toggle if it doesn't exist
    if (!document.querySelector('.dark-mode-toggle')) {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        // Add to navbar
        document.querySelector('.auth-buttons').insertAdjacentElement('beforebegin', darkModeToggle);
        
        // Check for saved preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply dark mode if saved
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        // Add dark mode styles
        const darkModeStyles = document.createElement('style');
        darkModeStyles.textContent = `
            .dark-mode {
                background-color: #1a1a2e;
                color: #f0f0f0;
            }
            
            .dark-mode .navbar,
            .dark-mode .modal-content,
            .dark-mode .event-card,
            .dark-mode .filters,
            .dark-mode .user-dropdown {
                background-color: #16213e;
                color: #f0f0f0;
            }
            
            .dark-mode .nav-links li a {
                color: #d1d1d1;
            }
            
            .dark-mode .nav-links li.active a {
                color: #8a67d8;
            }
            
            .dark-mode .event-title {
                color: #f0f0f0;
            }
            
            .dark-mode .event-description,
            .dark-mode .form-group label {
                color: #d1d1d1;
            }
            
            .dark-mode .tech-tag {
                background: #2a2a4a;
                color: #d1d1d1;
            }
            
            .dark-mode .event-meta {
                border-top: 1px solid #2a2a4a;
                color: #a0a0a0;
            }
            
            .dark-mode .save-btn {
                border-color: #2a2a4a;
                color: #d1d1d1;
            }
            
            .dark-mode .save-btn:hover {
                background: #2a2a4a;
            }
            
            .dark-mode .form-group input,
            .dark-mode .form-group select,
            .dark-mode .form-group textarea,
            .dark-mode .tech-filters select {
                background: #2a2a4a;
                border-color: #3a3a5a;
                color: #f0f0f0;
            }
            
            .dark-mode .dropdown-item {
                color: #d1d1d1 !important;
            }
            
            .dark-mode .dropdown-item:hover {
                background: #2a2a4a !important;
            }
        `;
        document.head.appendChild(darkModeStyles);
        
        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Update icon
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'true');
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
});