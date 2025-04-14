// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const postModal = document.getElementById('post-modal');
const createPostBtn = document.querySelector('.create-post-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const filterBtns = document.querySelectorAll('.filter-btn');
const eventsGrid = document.getElementById('events-grid');
const postForm = document.getElementById('post-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Tab elements on profile page
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const editProfileBtn = document.querySelector('.edit-profile-btn');
const editProfileModal = document.getElementById('edit-profile-modal');

// Chat elements
const chatList = document.getElementById('chat-list');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message');

// Sample data for events
const events = [
  {
    id: 1,
    title: 'TechFest 2023',
    type: 'technical',
    date: '2023-12-15',
    location: 'Virtual',
    description: 'Looking for a full-stack developer and UI/UX designer for the upcoming TechFest hackathon.',
    tags: ['Web Development', 'UI/UX', 'Full-stack'],
    price: 'free'
  },
  {
    id: 2,
    title: 'AI Hackathon',
    type: 'technical',
    date: '2023-11-20',
    location: 'New York',
    description: 'Need a machine learning expert and data scientist for an AI-focused hackathon.',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    price: 'paid'
  },
  {
    id: 3,
    title: 'Game Jam 2023',
    type: 'fun',
    date: '2023-12-05',
    location: 'San Francisco',
    description: 'Looking for a game developer and artist for a weekend game jam.',
    tags: ['Game Development', 'Unity', 'Art'],
    price: 'free'
  },
  {
    id: 4,
    title: 'Local Hackathon',
    type: 'near',
    date: '2023-11-25',
    location: 'Your City',
    description: 'Seeking a mobile developer and backend engineer for a local hackathon.',
    tags: ['Mobile Development', 'Backend', 'API'],
    price: 'free'
  },
  {
    id: 5,
    title: 'Blockchain Challenge',
    type: 'technical',
    date: '2023-12-10',
    location: 'Virtual',
    description: 'Need a blockchain developer and smart contract expert for a crypto hackathon.',
    tags: ['Blockchain', 'Smart Contracts', 'Web3'],
    price: 'paid'
  },
  {
    id: 6,
    title: 'Design Sprint',
    type: 'fun',
    date: '2023-11-18',
    location: 'Chicago',
    description: 'Looking for UI/UX designers and frontend developers for a design-focused hackathon.',
    tags: ['UI/UX', 'Frontend', 'Design'],
    price: 'free'
  }
];

// Sample data for chats
const chats = [
  {
    id: 1,
    name: 'Anonymous User 1',
    event: 'TechFest 2023',
    lastMessage: 'Hi, I saw your post about TechFest. I\'m interested in joining your team.',
    time: '10:30 AM',
    unread: 2
  },
  {
    id: 2,
    name: 'Anonymous User 2',
    event: 'AI Hackathon',
    lastMessage: 'I have experience with machine learning and AI. Would love to join your team.',
    time: '9:15 AM',
    unread: 0
  },
  {
    id: 3,
    name: 'Anonymous User 3',
    event: 'Game Jam 2023',
    lastMessage: 'I\'m a 3D artist looking for a game development team.',
    time: 'Yesterday',
    unread: 1
  },
  {
    id: 4,
    name: 'Anonymous User 4',
    event: 'Local Hackathon',
    lastMessage: 'Do you still need a backend developer?',
    time: 'Yesterday',
    unread: 0
  },
  {
    id: 5,
    name: 'Anonymous User 5',
    event: 'Blockchain Challenge',
    lastMessage: 'I have experience with Solidity and smart contracts.',
    time: '2 days ago',
    unread: 0
  }
];

// Sample messages for a chat
const messages = [
  {
    id: 1,
    sender: 'other',
    text: 'Hi, I saw your post about TechFest. I\'m interested in joining your team.',
    time: '10:30 AM'
  },
  {
    id: 2,
    sender: 'me',
    text: 'Hello! Thanks for reaching out. What\'s your tech stack?',
    time: '10:32 AM'
  },
  {
    id: 3,
    sender: 'other',
    text: 'I\'m a full-stack developer with experience in React, Node.js, and MongoDB.',
    time: '10:35 AM'
  },
  {
    id: 4,
    sender: 'me',
    text: 'That sounds perfect! We\'re looking for someone with exactly those skills.',
    time: '10:38 AM'
  },
  {
    id: 5,
    sender: 'other',
    text: 'Great! Can you tell me more about the project idea?',
    time: '10:40 AM'
  }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Modal handlers
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      loginModal.style.display = 'block';
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener('click', () => {
      signupModal.style.display = 'block';
    });
  }

  if (createPostBtn) {
    createPostBtn.addEventListener('click', () => {
      postModal.style.display = 'block';
    });
  }

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      loginModal.style.display = 'none';
      signupModal.style.display = 'none';
      postModal.style.display = 'none';
      if (editProfileModal) {
        editProfileModal.style.display = 'none';
      }
    });
  });

  if (showSignupLink) {
    showSignupLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginModal.style.display = 'none';
      signupModal.style.display = 'block';
    });
  }

  if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      signupModal.style.display = 'none';
      loginModal.style.display = 'block';
    });
  }

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
      signupModal.style.display = 'none';
    }
    if (e.target === postModal) {
      postModal.style.display = 'none';
    }
    if (editProfileModal && e.target === editProfileModal) {
      editProfileModal.style.display = 'none';
    }
  });

  // Filter buttons
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        filterEvents(filter);
      });
    });
  }

  // Render events
  if (eventsGrid) {
    renderEvents(events);
  }

  // Form submissions
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle post form submission
      alert('Post submitted successfully!');
      postModal.style.display = 'none';
      postForm.reset();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle login form submission
      alert('Login successful!');
      loginModal.style.display = 'none';
      loginForm.reset();
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Handle signup form submission
      alert('Signup successful!');
      signupModal.style.display = 'none';
      signupForm.reset();
    });
  }

  // Profile page tabs
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        tabContents.forEach(content => {
          content.classList.remove('active');
        });
        document.getElementById(`${tab}-tab`).classList.add('active');
      });
    });
  }

  // Edit profile button
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      editProfileModal.style.display = 'block';
    });
  }

  // Chat page
  if (chatList) {
    renderChats(chats);
  }

  if (sendMessageBtn && messageInput) {
    sendMessageBtn.addEventListener('click', () => {
      const message = messageInput.value.trim();
      if (message) {
        sendMessage(message);
        messageInput.value = '';
      }
    });

    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageBtn.click();
      }
    });
  }
});

// Render events to the grid
function renderEvents(eventsArray) {
  eventsGrid.innerHTML = '';
  eventsArray.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <div class="event-image">${event.title.charAt(0)}</div>
      <div class="event-details">
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <span>${event.date}</span>
          <span>${event.location}</span>
        </div>
        <p class="event-description">${event.description}</p>
        <div class="event-tags">
          ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
        </div>
        <div class="event-actions">
          <button class="event-btn primary-btn">Connect</button>
          <button class="event-btn secondary-btn">Details</button>
        </div>
      </div>
    `;
    eventsGrid.appendChild(eventCard);
  });
}

// Filter events based on type
function filterEvents(filter) {
  if (filter === 'all') {
    renderEvents(events);
  } else {
    const filteredEvents = events.filter(event => event.type === filter);
    renderEvents(filteredEvents);
  }
}

// Render chats to the chat list
function renderChats(chatsArray) {
  chatList.innerHTML = '';
  chatsArray.forEach(chat => {
    const chatItem = document.createElement('div');
    chatItem.className = 'chat-item';
    chatItem.setAttribute('data-id', chat.id);
    chatItem.innerHTML = `
      <div class="chat-avatar">${chat.name.charAt(0)}</div>
      <div class="chat-info">
        <div class="chat-name">${chat.name}</div>
        <div class="chat-preview">${chat.lastMessage}</div>
      </div>
      <div class="chat-meta">
        <div class="chat-time">${chat.time}</div>
        ${chat.unread > 0 ? `<div class="chat-badge">${chat.unread}</div>` : ''}
      </div>
    `;
    chatItem.addEventListener('click', () => {
      document.querySelectorAll('.chat-item').forEach(item => {
        item.classList.remove('active');
      });
      chatItem.classList.add('active');
      renderMessages(messages);
      // Update chat header
      const chatHeader = document.querySelector('.chat-user-details');
      if (chatHeader) {
        chatHeader.innerHTML = `
          <h3>${chat.name}</h3>
          <p>${chat.event}</p>
        `;
      }
    });
    chatList.appendChild(chatItem);
  });
}

// Render messages in the chat
function renderMessages(messagesArray) {
  chatMessages.innerHTML = '';
  messagesArray.forEach(message => {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.sender === 'me' ? 'message-outgoing' : 'message-incoming'}`;
    messageElement.innerHTML = `
      <p>${message.text}</p>
      <div class="message-time">${message.time}</div>
    `;
    chatMessages.appendChild(messageElement);
  });
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send a new message
function sendMessage(text) {
  const newMessage = {
    id: messages.length + 1,
    sender: 'me',
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  messages.push(newMessage);
  renderMessages(messages);
}

// Hero Carousel Script
document.addEventListener('DOMContentLoaded', function() {
  const slidesContainer = document.querySelector('.hero-slides-container');
  const nextBtn = document.querySelector('.next-slide');
  const prevBtn = document.querySelector('.prev-slide');
  const slideCount = document.querySelectorAll('.hero-slide').length;
  let currentSlide = 0;
  
  // Function to update slides
  function goToSlide(index) {
      // Handle wrapping
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      
      // Update current slide index
      currentSlide = index;
      
      // Move slides container
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Set up click events for arrows
  nextBtn.addEventListener('click', function() {
      goToSlide(currentSlide + 1);
      // Reset the interval timer
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
  });
  
  prevBtn.addEventListener('click', function() {
      goToSlide(currentSlide - 1);
      // Reset the interval timer
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
  });
  
  // Function for automatic sliding
  function nextSlide() {
      goToSlide(currentSlide + 1);
  }
  
  // Start automatic sliding
  let slideInterval = setInterval(nextSlide, 6000);
});

// Hero Carousel Script
document.addEventListener('DOMContentLoaded', function() {
  const slidesContainer = document.querySelector('.hero-slides-container');
  const nextBtn = document.querySelector('.next-slide');
  const prevBtn = document.querySelector('.prev-slide');
  const slideCount = document.querySelectorAll('.hero-slide').length;
  let currentSlide = 0;
  
  // Function to update slides
  function goToSlide(index) {
      // Handle wrapping
      if (index < 0) index = slideCount - 1;
      if (index >= slideCount) index = 0;
      
      // Update current slide index
      currentSlide = index;
      
      // Move slides container
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Set up click events for arrows
  nextBtn.addEventListener('click', function() {
      goToSlide(currentSlide + 1);
      // Reset the interval timer
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
  });
  
  prevBtn.addEventListener('click', function() {
      goToSlide(currentSlide - 1);
      // Reset the interval timer
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
  });
  
  // Function for automatic sliding
  function nextSlide() {
      goToSlide(currentSlide + 1);
  }
  
  // Start automatic sliding
  let slideInterval = setInterval(nextSlide, 6000);
});