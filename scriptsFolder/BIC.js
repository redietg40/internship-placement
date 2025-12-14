// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

function initializeTheme() {
  document.body.setAttribute("data-theme", currentTheme);
  updateThemeIcon();
}

function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    themeIcon.className =
      currentTheme === "light" ? "fas fa-moon" : "fas fa-sun";
  }
}

// Mobile Menu Management
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenu.classList.toggle("active");
  menuBtn.classList.toggle("active");

  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuBtn = document.querySelector(".mobile-menu-btn");

  mobileMenu.classList.remove("active");
  menuBtn.classList.remove("active");
  document.body.style.overflow = "";
}

// Navigation Management
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Enhanced Scroll Animation System
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a small delay for staggered animations
        setTimeout(() => {
          entry.target.classList.add("animate-in");
        }, index * 100);
      } else {
        // Optional: Remove animation class when element goes out of view
        // entry.target.classList.remove('animate-in')
      }
    });
  }, observerOptions);

  // Observe all elements that should animate on scroll
  const animatedElements = document.querySelectorAll(
    ".section-header, .bic-content p, .overview-item, .contact-card, .job-card, .overview-content, .overview-images"
  );

  animatedElements.forEach((el, index) => {
    // Add base animation class
    el.classList.add("animate-on-scroll");

    // Add variation classes for different animation types
    if (index % 3 === 0) {
      el.classList.add("animate-from-left");
    } else if (index % 3 === 1) {
      el.classList.add("animate-from-right");
    } else {
      el.classList.add("animate-scale");
    }

    observer.observe(el);
  });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Parallax Effect for Hero Section
function handleParallaxEffect() {
  const heroSection = document.querySelector(".hero-section");
  const scrolled = window.pageYOffset;
  const speed = scrolled * 0.5;

  if (heroSection && scrolled < window.innerHeight) {
    heroSection.style.transform = `translateY(${speed}px)`;
  }
}

// Navbar Scroll Effect with Motion
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    navbar.style.transform = "translateY(0)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
}

// Floating Elements Animation Enhancement
function enhanceFloatingElements() {
  const floatingElements = document.querySelectorAll(".floating-element");

  floatingElements.forEach((element, index) => {
    // Add random sizes and speeds
    const size = Math.random() * 6 + 2; // 2-8px
    const animationDuration = Math.random() * 4 + 6; // 6-10 seconds

    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.animationDuration = `${animationDuration}s`;
    element.style.left = `${Math.random() * 100}%`;
  });
}

// Content Motion Effects
function addContentMotion() {
  const cards = document.querySelectorAll(
    ".job-card, .contact-card, .overview-item"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)";
      card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Enhanced Chat Functionality
const chatResponses = {
  greetings: [
    "Hello! How can I help you with your internship application today?",
    "Hi there! I'm here to answer any questions about BIC internships.",
    "Welcome! What would you like to know about our internship opportunities?",
  ],
  positions: [
    "We currently have 6 main internship positions: Business Development, Technology Innovation, Marketing & Communications, Program Management, UI/UX Design, and Data Analytics. Each offers unique learning opportunities!",
    "Our internship positions range from 3-6 months and cover various fields including business, technology, marketing, design, and data analytics.",
    "All our positions offer hands-on experience with real startup projects and direct mentorship from successful entrepreneurs.",
  ],
  requirements: [
    "Our main requirements include being enrolled in university (3rd year or above), strong interest in entrepreneurship, excellent communication skills, and basic computer proficiency.",
    "We welcome students from all backgrounds! Whether you're experienced or just starting out, our AI-powered learning approach adapts to your skill level.",
    "The key requirements are university enrollment, entrepreneurship interest, good communication skills in English and Amharic, and eagerness to learn.",
  ],
  benefits: [
    "Benefits include hands-on startup experience, direct mentorship, professional networking, official certification, modern workspace access, flexible hours, and potential to launch your own startup!",
    "You'll get real project experience, expert mentorship, extensive networking opportunities, and access to cutting-edge technology and workspace.",
    "Our interns receive comprehensive support including mentorship, certification, networking opportunities, and the chance to work on innovative projects.",
  ],
  application: [
    "You can apply by clicking the 'Apply for Internship' button on this page, which will take you to our application form. The process is straightforward and user-friendly!",
    "To apply, simply click on any 'Apply Now' button on the position cards or use the main application button. We'll guide you through the process step by step.",
    "Applications are submitted through our online form. Just click 'Apply for Internship' and follow the instructions. We review applications regularly!",
  ],
  contact: [
    "You can reach us at info@bicethiopia.com or internships@bicethiopia.com. Our phone numbers are +251-58-220-5678 and +251-91-456-7890.",
    "We're located at Kebele 05, ICT Park, Bahir Dar, Ethiopia. Feel free to contact us via email or phone for any questions!",
    "For immediate assistance, call us at +251-58-220-5678 or email internships@bicethiopia.com. We're here to help!",
  ],
  default: [
    "That's a great question! For detailed information, I recommend contacting our team directly at internships@bicethiopia.com or calling +251-58-220-5678.",
    "I'd be happy to help! For specific details about that topic, please reach out to our internship coordinators who can provide comprehensive information.",
    "Thanks for asking! Our team can provide detailed answers to your specific questions. Contact us at info@bicethiopia.com or visit our office in Bahir Dar.",
  ],
};

function getResponseCategory(message) {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return "greetings";
  } else if (
    lowerMessage.includes("position") ||
    lowerMessage.includes("job") ||
    lowerMessage.includes("internship") ||
    lowerMessage.includes("role")
  ) {
    return "positions";
  } else if (
    lowerMessage.includes("requirement") ||
    lowerMessage.includes("qualify") ||
    lowerMessage.includes("eligible")
  ) {
    return "requirements";
  } else if (
    lowerMessage.includes("benefit") ||
    lowerMessage.includes("advantage") ||
    lowerMessage.includes("offer")
  ) {
    return "benefits";
  } else if (
    lowerMessage.includes("apply") ||
    lowerMessage.includes("application") ||
    lowerMessage.includes("how to")
  ) {
    return "application";
  } else if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("address")
  ) {
    return "contact";
  } else {
    return "default";
  }
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatMessages = document.getElementById("chatMessages");
  const message = input.value.trim();

  if (message === "") return;

  // Add user message
  const userMessage = createMessageElement(message, "user");
  chatMessages.appendChild(userMessage);

  // Clear input
  input.value = "";

  // Show typing indicator
  const typingIndicator = createTypingIndicator();
  chatMessages.appendChild(typingIndicator);

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Generate AI response after delay
  setTimeout(() => {
    chatMessages.removeChild(typingIndicator);

    const category = getResponseCategory(message);
    const responses = chatResponses[category];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    const aiMessage = createMessageElement(randomResponse, "ai");
    chatMessages.appendChild(aiMessage);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000 + Math.random() * 1000);
}

function createMessageElement(content, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${type}-message`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.innerHTML =
    type === "ai"
      ? '<i class="fas fa-robot"></i>'
      : '<i class="fas fa-user"></i>';

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.innerHTML = `<p>${content}</p>`;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageContent);

  // Add animation
  messageDiv.style.opacity = "0";
  messageDiv.style.transform = "translateY(20px)";

  setTimeout(() => {
    messageDiv.style.transition = "all 0.3s ease";
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateY(0)";
  }, 100);

  return messageDiv;
}

function createTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.className = "message ai-message typing-indicator";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.innerHTML = '<i class="fas fa-robot"></i>';

  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  messageContent.innerHTML =
    '<div class="typing-dots"><span></span><span></span><span></span></div>';

  typingDiv.appendChild(avatar);
  typingDiv.appendChild(messageContent);

  return typingDiv;
}

function handleEnterKey(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Job Data and Functions
const jobsData = [
  {
    id: 1,
    title: "Business Development Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Technology",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "3-6 months",
    status: "open",
    salary: "Stipend + Benefits",
    posted: "2 days ago",
    image: "/business-development-office.png",
    tags: ["Strategy", "Analysis", "Communication", "Business Planning"],
    description:
      "Support startup incubation programs and business strategy development. Work directly with entrepreneurs to refine business models and market strategies. This role offers hands-on experience in the Ethiopian startup ecosystem.",
    requirements: [
      "Currently enrolled in university (3rd year or above)",
      "Strong interest in entrepreneurship and business development",
      "Excellent analytical and problem-solving skills",
      "Good communication skills in English and Amharic",
      "Basic understanding of business principles",
    ],
  },
  {
    id: 2,
    title: "Technology Innovation Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Technology",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "4-6 months",
    status: "open",
    salary: "Stipend + Benefits",
    posted: "1 week ago",
    image: "/ai-coding-workspace.png",
    tags: ["AI/ML", "Programming", "Research", "Innovation"],
    description:
      "Work on emerging technology projects and research initiatives. Collaborate with our tech team on AI, blockchain, and IoT solutions. Perfect opportunity to work with cutting-edge technologies in a startup environment.",
    requirements: [
      "Computer Science, Engineering, or related field",
      "Programming experience (Python, JavaScript, or similar)",
      "Interest in AI, machine learning, or emerging technologies",
      "Strong problem-solving and analytical skills",
      "Ability to work in a fast-paced environment",
    ],
  },
  {
    id: 3,
    title: "Marketing & Communications Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Marketing",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "3-4 months",
    status: "open",
    salary: "Stipend + Benefits",
    posted: "3 days ago",
    image: "/marketing-communications-workspace.png",
    tags: ["Content Creation", "Social Media", "Design", "Communications"],
    description:
      "Develop marketing strategies for incubated startups and events. Create compelling content and manage social media presence. Help build brand awareness for BIC and our portfolio companies.",
    requirements: [
      "Marketing, Communications, or related field",
      "Creative writing and content creation skills",
      "Social media management experience",
      "Basic design skills (Canva, Photoshop, etc.)",
      "Strong communication and interpersonal skills",
    ],
  },
  {
    id: 4,
    title: "Program Management Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Management",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "4-5 months",
    status: "open",
    salary: "Stipend + Benefits",
    posted: "5 days ago",
    image: "/program-management-events-workspace.png",
    tags: ["Project Management", "Organization", "Leadership", "Events"],
    description:
      "Assist in organizing workshops, events, and mentorship programs. Coordinate between different stakeholders and manage project timelines. Great opportunity to develop leadership and organizational skills.",
    requirements: [
      "Business Administration, Management, or related field",
      "Strong organizational and time management skills",
      "Leadership experience or potential",
      "Excellent communication and coordination abilities",
      "Proficiency in project management tools",
    ],
  },
  {
    id: 5,
    title: "UI/UX Design Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Design",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "3-5 months",
    status: "open",
    salary: "Stipend + Benefits",
    posted: "1 day ago",
    image: "/ui-ux-creative-workspace.png",
    tags: ["UI Design", "UX Research", "Prototyping", "User Testing"],
    description:
      "Design user interfaces and experiences for startup products. Conduct user research and create prototypes. Work closely with development teams to bring designs to life.",
    requirements: [
      "Design, Computer Science, or related field",
      "Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)",
      "Understanding of user-centered design principles",
      "Portfolio demonstrating design skills",
      "Strong attention to detail and creativity",
    ],
  },
  {
    id: 6,
    title: "Data Analytics Intern",
    company: "Bahir Dar Incubation Center",
    industry: "Technology",
    location: "Bahir Dar, Ethiopia",
    type: "Internship",
    duration: "4-6 months",
    status: "closed",
    salary: "Stipend + Benefits",
    posted: "2 weeks ago",
    image: "/data-analytics-workspace.png",
    tags: ["Data Analysis", "Python", "SQL", "Visualization"],
    description:
      "Analyze data from various startup projects and create insights. Build dashboards and reports to help startups make data-driven decisions. Work with real business data and modern analytics tools.",
    requirements: [
      "Statistics, Mathematics, Computer Science, or related field",
      "Proficiency in Python, R, or similar analytics tools",
      "SQL database experience",
      "Data visualization skills (Tableau, Power BI, etc.)",
      "Strong analytical and problem-solving abilities",
    ],
  },
];

const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");

function initializeJobListings() {
  renderJobs(jobsData);
  setupModalEventListeners();
}

function renderJobs(jobs) {
  const container = document.getElementById("jobs-container");
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No internships found</h3>
        <p>Please check back later for new opportunities.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = jobs
    .map(
      (job) => `
    <div class="job-card animate-on-scroll" onclick="openJobModal(${job.id})">
      <div class="job-header">
        <div class="job-info">
          <h3 class="job-title">${job.title}</h3>
          <div class="company-name">${job.company}</div>
          <div class="job-location">
            <i class="fas fa-map-marker-alt"></i>
            ${job.location}
          </div>
        </div>
        <div class="job-status status-${job.status}">${job.status}</div>
      </div>
      
      <div class="job-meta">
        <div class="meta-item">
          <i class="fas fa-clock"></i>
          ${job.duration}
        </div>
        <div class="meta-item">
          <i class="fas fa-briefcase"></i>
          ${job.type}
        </div>
        <div class="meta-item">
          <i class="fas fa-dollar-sign"></i>
          ${job.salary}
        </div>
      </div>
      
      <p class="job-description">${job.description}</p>
      
      <div class="job-tags">
        ${job.tags.map((tag) => `<span class="job-tag">${tag}</span>`).join("")}
      </div>
      
      <div class="job-actions">
      <a href="profile.html" style="text-decoration: none;">
        <button class="btn-apply">   
          View Details 
        </button>
         </a>
        <button class="btn-save ${savedJobs.includes(job.id) ? "saved" : ""}" 
                onclick="event.stopPropagation(); toggleSaveJob(${job.id})" 
                title="${
                  savedJobs.includes(job.id) ? "Remove from saved" : "Save job"
                }">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");

  // Re-initialize scroll animations for new job cards
  setTimeout(() => {
    initializeScrollAnimations();
  }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initializeTheme();

  // Initialize scroll animations
  initializeScrollAnimations();

  // Initialize job listings
  initializeJobListings();

  // Enhance floating elements
  enhanceFloatingElements();

  // Add content motion effects
  addContentMotion();

  // Add event listeners
  window.addEventListener("scroll", () => {
    updateActiveNavLink();
    handleNavbarScroll();
    handleParallaxEffect();
  });

  // Add click event listeners to nav links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToSection(targetId);
      closeMobileMenu();
    });
  });

  // Add click event listeners to mobile nav links
  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToSection(targetId);
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.querySelector(".mobile-menu-btn");

    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Initialize chat with welcome message
  setTimeout(() => {
    const chatMessages = document.getElementById("chatMessages");
    if (chatMessages && chatMessages.children.length === 1) {
      const welcomeMessage = createMessageElement(
        "Feel free to ask me about our internship positions, requirements, benefits, or application process. I'm here to help! 🚀",
        "ai"
      );
      chatMessages.appendChild(welcomeMessage);
    }
  }, 2000);

  // Add dynamic styles for animations
  const style = document.createElement("style");
  style.textContent = `
    .typing-dots {
      display: flex;
      gap: 4px;
      padding: 8px 0;
    }
    
    .typing-dots span {
      width: 6px;
      height: 6px;
      background: var(--text-muted);
      border-radius: 50%;
      animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: 0s; }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.4;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    .modal-header {
      padding: 2rem;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      color: white;
      text-align: center;
    }

    .modal-job-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto 1rem auto;
      object-fit: cover;
      border: 4px solid rgba(255, 255, 255, 0.3);
    }

    .modal-job-title {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .modal-company h3 {
      margin-bottom: 0.5rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .modal-job-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      padding: 2rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-job-detail {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-muted);
    }

    .modal-job-tags {
      padding: 1rem 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .modal-tag {
      background: rgba(255, 107, 53, 0.1);
      color: var(--primary-color);
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.875rem;
    }

    .modal-job-description,
    .modal-job-requirements {
      padding: 2rem;
    }

    .modal-job-description h4,
    .modal-job-requirements h4 {
      margin-bottom: 1rem;
      color: var(--text-color);
    }

    .modal-job-requirements ul {
      padding-left: 1.5rem;
    }

    .modal-job-requirements li {
      margin-bottom: 0.5rem;
      color: var(--text-muted);
    }

    .modal-actions {
      padding: 2rem;
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      flex: 1;
    }

    .btn-primary:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
    }

    .btn-outline:hover {
      background: var(--primary-color);
      color: white;
    }

    .btn-large {
      padding: 1rem 2rem;
    }
  `;
  document.head.appendChild(style);
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Prevent form submission on enter in chat
document.addEventListener("keydown", (e) => {
  if (e.target.id === "userInput" && e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
