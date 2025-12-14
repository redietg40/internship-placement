// Sample internship data
const internships = [
  {
    id: 1,
    company: "Incubation Center",
    position: "Software Development Intern",
    field: "IT",
    location: "Bahir Dar",
    duration: "3 months",
    deadline: "2025-02-15",
    requirements: ["Computer Science or related field", "Basic programming knowledge", "Good communication skills"],
    description: "Join our innovative software development team and work on cutting-edge projects.",
    contact: {
      email: "hr@incubationcenter.et",
      phone: "+251-58-220-1001",
    },
    featured: true,
    comment: "This company is exceptional—make it your choice!",
  },
  {
    id: 2,
    company: "TechSolutions Ethiopia",
    position: "Web Development Intern",
    field: "IT",
    location: "Bahir Dar",
    duration: "4 months",
    deadline: "2025-02-20",
    requirements: ["HTML, CSS, JavaScript knowledge", "Familiarity with React or Angular", "Portfolio of projects"],
    description: "Work with our web development team to create modern, responsive websites.",
    contact: {
      email: "internships@techsolutions.et",
      phone: "+251-58-220-1002",
    },
    featured: false,
  },
  {
    id: 3,
    company: "Ethiopian Bank",
    position: "Finance Intern",
    field: "Finance",
    location: "Bahir Dar",
    duration: "6 months",
    deadline: "2025-03-01",
    requirements: ["Finance or Accounting major", "Strong analytical skills", "Excel proficiency"],
    description: "Gain hands-on experience in banking operations and financial analysis.",
    contact: {
      email: "careers@ethiopianbank.et",
      phone: "+251-58-220-1003",
    },
    featured: false,
  },
  {
    id: 4,
    company: "Green Energy Solutions",
    position: "Engineering Intern",
    field: "Engineering",
    location: "Bahir Dar",
    duration: "5 months",
    deadline: "2025-02-28",
    requirements: ["Engineering student (any discipline)", "AutoCAD knowledge preferred", "Problem-solving skills"],
    description: "Work on renewable energy projects and sustainable engineering solutions.",
    contact: {
      email: "internships@greenenergy.et",
      phone: "+251-58-220-1004",
    },
    featured: false,
  },
  {
    id: 5,
    company: "Digital Marketing Hub",
    position: "Marketing Intern",
    field: "Marketing",
    location: "Remote",
    duration: "3 months",
    deadline: "2025-02-10",
    requirements: ["Marketing or Business major", "Social media knowledge", "Creative thinking"],
    description: "Learn digital marketing strategies and campaign management.",
    contact: {
      email: "team@digitalmarketing.et",
      phone: "+251-58-220-1005",
    },
    featured: false,
  },
  {
    id: 6,
    company: "Healthcare Innovations",
    position: "Healthcare Administration Intern",
    field: "Healthcare",
    location: "Bahir Dar",
    duration: "4 months",
    deadline: "2025-03-15",
    requirements: ["Healthcare or Business major", "Interest in healthcare systems", "Communication skills"],
    description: "Support healthcare administration and learn about medical systems.",
    contact: {
      email: "hr@healthcareinnovations.et",
      phone: "+251-58-220-1006",
    },
    featured: false,
  },
]
// Current theme (default: light)
let currentTheme = localStorage.getItem("theme") || "light"

// Initialize page animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for any anchor links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  // Observe animated elements
  const animatedElements = document.querySelectorAll(".content-card, .hero-text, .hero-image-container")
  animatedElements.forEach((el) => observer.observe(el))

  // Add hover sound effect for interactive elements
  const interactiveElements = document.querySelectorAll(".learn-more-btn, .content-card")
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", playHoverSound)
  })

  // Enhanced image hover effects
  const imageWrapper = document.querySelector(".image-wrapper")
  if (imageWrapper) {
    imageWrapper.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)"
    })

    imageWrapper.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg)"
    })
  }

  // Add parallax effect on scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero-image")

    parallaxElements.forEach((element) => {
      const speed = 0.5
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Add typing effect to main title
  const mainTitle = document.querySelector(".featured-main-title")
  if (mainTitle) {
    const text = mainTitle.textContent
    mainTitle.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 500)
  }

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll(".learn-more-btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Hover sound effect function
function playHoverSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (AudioContext) {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }
}

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .learn-more-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// DOM elements
const searchInput = document.getElementById("searchInput")
const fieldFilter = document.getElementById("fieldFilter")
const locationFilter = document.getElementById("locationFilter")
const deadlineFilter = document.getElementById("deadlineFilter")
const internshipsGrid = document.getElementById("internshipsGrid")
const noResults = document.getElementById("noResults")
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const currencySwitcher = document.querySelector(".currency-switcher")
const currencyDropdown = document.querySelector(".currency-dropdown")
const currentCurrency = document.getElementById("current-currency")
const heroPainting = document.querySelector(".hero-painting")
const sliderDots = document.querySelectorAll(".slider-pagination .dot")
const heroImages = [
  "/placeholder.svg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
  "/placeholder.svg?height=600&width=1200",
]
let currentSlide = 0

// Sample data for quick previews (internships.html)
const companyData = {
  "Bahir Dar Incubation Center": {
    description: "Leading innovation hub in Bahir Dar",
    positions: 15,
    duration: "3-6 months",
    requirements: ["Computer Science background", "Innovation mindset", "Team collaboration"],
    benefits: ["Mentorship program", "Startup exposure", "Networking opportunities", "Certificate of completion"],
  },
  "Peange Technologies": {
    description: "Cutting-edge technology company",
    positions: 8,
    duration: "4-6 months",
    requirements: ["Programming knowledge", "Web development skills", "AI/ML interest"],
    benefits: ["Remote work options", "Industry certification", "Project portfolio", "Job placement assistance"],
  },
  "Minas Innovations": {
    description:
      "Provides hands-on software engineering internships and entrepreneurial training to help students build real-world solutions.",
    positions: 12,
    duration: "3-5 months",
    requirements: ["Software engineering background", "Problem-solving skills", "Entrepreneurial spirit"],
    benefits: ["Real project experience", "Entrepreneurship training", "Team leadership", "Innovation workshops"],
  },
  "Ethiopian Tech Solutions": {
    description:
      "Leading technology company offering comprehensive internships in software development, cybersecurity, and digital transformation.",
    positions: 10,
    duration: "6 months",
    requirements: ["Strong programming skills", "Cybersecurity interest", "Problem-solving"],
    benefits: ["Professional growth", "Cloud computing exposure", "Digital transformation projects"],
  },
  "Nile Engineering Group": {
    description:
      "Premier engineering firm providing internships in civil, water resources, and environmental engineering with real project exposure.",
    positions: 7,
    duration: "5 months",
    requirements: ["Engineering student", "AutoCAD knowledge", "Field experience"],
    benefits: ["Civil engineering projects", "Water resources management", "Environmental impact studies"],
  },
  "Blue Nile Innovation Hub": {
    description:
      "Dynamic innovation center fostering creativity and entrepreneurship through immersive internship experiences and startup incubation.",
    positions: 18,
    duration: "3-6 months",
    requirements: ["Creative thinking", "Business development interest", "Team collaboration"],
    benefits: ["Innovation workshops", "Startup incubation", "Networking opportunities"],
  },
}

// DOM elements for internships.html
const searchInputInternships = document.getElementById("searchInputInternships")
const categoryFilter = document.getElementById("categoryFilter")
const sortSelect = document.getElementById("sortSelect")
const organizationList = document.getElementById("organizationList")
const noResultsInternships = document.getElementById("noResultsInternships")
const loadingInternships = document.getElementById("loadingInternships")

// Function declarations
function setupFloatingShapesParallax() {
  // Placeholder for parallax setup
}

function searchOrganizations() {
  // Placeholder for search organizations logic
}

function filterOrganizations() {
  // Placeholder for filter organizations logic
}

function sortOrganizations() {
  // Placeholder for sort organizations logic
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayInternships(internships)
  setupEventListeners()
  showSlide(currentSlide) // Initialize first slide

  // Load saved theme (default light)
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  // Initialize interactive background particles
  createFloatingParticles()

  // Setup floating shapes parallax (if elements exist)
  if (document.querySelector(".floating-shapes")) {
    setupFloatingShapesParallax()
  }

  // Initialize index.html specific elements
  if (heroPainting) {
    showSlide(currentSlide)
    sliderDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  }

  // Initialize internships.html specific elements
  if (organizationList) {
    // Initial display of organizations (if needed, otherwise filter/sort will handle)
    // displayOrganizations(initialOrganizationsData); // Assuming you have this data
    if (searchInputInternships) {
      searchInputInternships.addEventListener("input", function () {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(searchOrganizations, 300)
      })
    }
    if (categoryFilter) categoryFilter.addEventListener("change", filterOrganizations)
    if (sortSelect) sortSelect.addEventListener("change", sortOrganizations)
    setTimeout(updateStats, 500) // Animate stats after a short delay
  }

  // Observe sections for animations (used in about2.html)
  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section)
  })
  document.querySelectorAll(".timeline-item").forEach((item) => {
    observer.observe(item)
  })
  // Add stagger animation to feature items (used in about2.html)
  const featureItems = document.querySelectorAll(".feature-item")
  featureItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
  })

  // Close modals when clicking outside
  window.onclick = (event) => {
    const quickPreviewModal = document.getElementById("quickPreviewModal")
    const internshipModal = document.getElementById("internshipModal") // Assuming this is the modal for index.html
    if (quickPreviewModal && event.target === quickPreviewModal) {
      closeModal()
    }
    if (internshipModal && event.target === internshipModal) {
      closeInternshipModal()
    }
  }

  // Close modals with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const quickPreviewModal = document.getElementById("quickPreviewModal")
      const internshipModal = document.getElementById("internshipModal")
      if (quickPreviewModal && quickPreviewModal.style.display === "block") {
        closeModal()
      }
      if (internshipModal && internshipModal.style.display === "block") {
        closeInternshipModal()
      }
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    const mobileMenu = document.querySelector(".mobile-menu")
    const mobileNav = document.getElementById("mobileNav")

    if (mobileMenu && mobileNav && !mobileMenu.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileNav.classList.remove("active")
      mobileMenu.classList.remove("active")
    }
  })

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("open") // Optional: for animating hamburger icon
    })
  }

  // Smooth scroll for navigation links
  document.querySelectorAll("nav-menu a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - (document.querySelector(".header")?.offsetHeight || 0),
          behavior: "smooth",
        })
        // Close mobile menu after clicking a link
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          hamburger.classList.remove("open")
        }
      }
    })
  })

  // Simple counter animation for stats
  const animateValue = (id, start, end, duration) => {
    const obj = document.getElementById(id)
    if (!obj) return

    let startTimestamp = null
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      obj.innerHTML = Math.floor(progress * (end - start) + start)
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  // Trigger animations when sections are in view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // When 50% of the section is visible
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "about") {
          animateValue("stat1", 0, 100, 2000)
          animateValue("stat2", 0, 250, 2000)
          animateValue("stat3", 0, 5, 2000)
          observer.unobserve(entry.target) // Stop observing once animated
        }
      }
    })
  }, observerOptions)

  const aboutSection = document.getElementById("about")
  if (aboutSection) {
    observer.observe(aboutSection)
  }
})

// Display internships
function displayInternships(internshipsToShow) {
  if (internshipsToShow.length === 0) {
    internshipsGrid.style.display = "none"
    noResults.style.display = "block"
    return
  }

  internshipsGrid.style.display = "grid"
  noResults.style.display = "none"

  internshipsGrid.innerHTML = internshipsToShow
    .map(
      (internship) => `
        <div class="internship-card ${internship.featured ? "featured" : ""}">
            ${internship.featured ? '<div class="featured-badge">Featured</div>' : ""}
            <div class="company-header">
                <div class="company-logo">
                    ${internship.company.charAt(0)}
                </div>
                <div class="company-info">
                    <h3>${internship.company}</h3>
                    <div class="position">${internship.position}</div>
                </div>
            </div>
            
            <div class="internship-details">
                <div class="detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${internship.field}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${internship.location}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${internship.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Deadline: ${formatDate(internship.deadline)}</span>
                </div>
            </div>
            
            <p>${internship.description}</p>
            
            ${
              internship.comment
                ? `<div style="background: #fef3c7; padding: 1rem; border-radius: 8px; margin: 1rem 0; border-left: 4px solid #fbbf24;"><strong>Note:</strong> ${internship.comment}</div>`
                : ""
            }
            
            <div class="requirements">
                <h4>Requirements:</h4>
                <ul>
                    ${internship.requirements.map((req) => `<li>${req}</li>`).join("")}
                </ul>
            </div>
            
            <div class="contact-info">
                <h4>Contact Information</h4>
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <span>${internship.contact.email}</span>
                </div>
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <span>${internship.contact.phone}</span>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Filter internships
function filterInternships() {
  const searchTerm = searchInput.value.toLowerCase()
  const selectedField = fieldFilter.value
  const selectedLocation = locationFilter.value
  const selectedDeadline = deadlineFilter.value

  const filtered = internships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchTerm) ||
      internship.position.toLowerCase().includes(searchTerm) ||
      internship.field.toLowerCase().includes(searchTerm) ||
      internship.description.toLowerCase().includes(searchTerm)

    const matchesField = !selectedField || internship.field === selectedField
    const matchesLocation = !selectedLocation || internship.location === selectedLocation
    const matchesDeadline = !selectedDeadline || checkDeadlineFilter(internship.deadline, selectedDeadline)

    return matchesSearch && matchesField && matchesLocation && matchesDeadline
  })

  displayInternships(filtered)
}

// Check deadline filter
function checkDeadlineFilter(deadline, filter) {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

  switch (filter) {
    case "upcoming":
      return deadlineDate >= today && deadlineDate <= thirtyDaysFromNow
    case "ongoing":
      return deadlineDate >= today
    default:
      return true
  }
}

// Format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Scroll animations
window.addEventListener("scroll", () => {
  const cards = document.querySelectorAll(".internship-card")
  cards.forEach((card) => {
    const cardTop = card.getBoundingClientRect().top
    const cardVisible = 150

    if (cardTop < window.innerHeight - cardVisible) {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }
  })
})

// Initialize card animations
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent = `
        .internship-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `
  document.head.appendChild(style)
})

// Show slide function
function showSlide(index) {
  heroPainting.src = heroImages[index]
  sliderDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })
}

// Common functions for interactive background and theme
function createFloatingParticles() {
  const overlay = document.getElementById("backgroundOverlay")
  if (!overlay) return // Ensure overlay exists

  setInterval(() => {
    const particle = document.createElement("div")
    particle.className = "floating-particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDuration = Math.random() * 3 + 5 + "s"
    particle.style.animationDelay = Math.random() * 2 + "s"

    overlay.appendChild(particle)

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    }, 8000)
  }, 300)
}

function goBack(event) {
  event.preventDefault()
  if (window.history.length > 1) {
    window.history.back()
  } else {
    window.location.href = "index.html"
  }
}

// Theme functionality

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  const themeBtn = document.getElementById("theme-toggle-btn")
  if (themeBtn) {
    const icon = themeBtn.querySelector("i")
    if (icon) {
      // When dark mode: show sun icon (to switch to light)
      // When light mode: show moon icon (to switch to dark)
      if (theme === "dark") {
        icon.className = "fas fa-sun"
        themeBtn.title = "Switch to Light Mode"
      } else {
        icon.className = "fas fa-moon"
        themeBtn.title = "Switch to Dark Mode"
      }
    }
  }

  currentTheme = theme
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light"
  setTheme(newTheme)
}

// Search functionality
function toggleSearchOptions() {
  const options = document.getElementById("searchOptions")
  options.style.display = options.style.display === "block" ? "none" : "block"
}

function hideSearchOptions() {
  setTimeout(() => {
    document.getElementById("searchOptions").style.display = "none"
  }, 200)
}

function selectSearchOption(type) {
  const input = document.querySelector(".search-input")
  switch (type) {
    case "company":
      input.placeholder = "Search by company name..."
      break
    case "department":
      input.placeholder = "Search by department..."
      break
    case "location":
      input.placeholder = "Search by location..."
      break
  }
  hideSearchOptions()
  input.focus()
}

// Mobile menu functionality
function toggleMobileMenu() {
  const mobileNav = document.getElementById("mobileNav")
  const menuBtn = document.querySelector(".mobile-menu")
  mobileNav.classList.toggle("active")
  if (menuBtn) menuBtn.classList.toggle("active")
}

// Modal functionality
function closeInternshipModal() {
  document.getElementById("internshipModal").style.display = "none"
}

function closeModal() {
  const modal = document.getElementById("quickPreviewModal")
  if (modal) modal.style.display = "none"
}

function toggleFavorite(button) {
  const icon = button.querySelector("i")
  if (icon) {
    if (icon.classList.contains("far")) {
      icon.classList.remove("far")
      icon.classList.add("fas")
      button.style.color = "#e74c3c" // Red for favorited
    } else {
      icon.classList.remove("fas")
      icon.classList.add("far")
      button.style.color = "var(--primary-color)"
    }
  }
}

function showLoading() {
  if (loadingInternships) loadingInternships.style.display = "block"
  if (organizationList) organizationList.style.opacity = "0.5"
}

function hideLoading() {
  if (loadingInternships) loadingInternships.style.display = "none"
  if (organizationList) organizationList.style.opacity = "1"
}

function toggleNoResults(show) {
  if (noResultsInternships) noResultsInternships.style.display = show ? "block" : "none"
  if (organizationList) organizationList.style.display = show ? "none" : "grid"
}

function updateStats() {
  const totalCompanies = document.getElementById("totalCompanies")
  if (totalCompanies) {
    const visibleCards = document.querySelectorAll('.org-card[style*="block"], .org-card:not([style*="none"])').length
    totalCompanies.textContent = visibleCards
  }
}

function setupEventListeners() {
  // Placeholder for event listeners setup
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme)
  }
}

// Terms page specific functionality
function initializeTermsAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"

        // Add stagger effect for list items
        const listItems = entry.target.querySelectorAll("li")
        listItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observe all terms sections
  document.querySelectorAll(".terms-section").forEach((section) => {
    observer.observe(section)

    // Initially hide list items for animation
    const listItems = section.querySelectorAll("li")
    listItems.forEach((item) => {
      item.style.opacity = "0"
      item.style.transform = "translateX(-20px)"
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    })
  })

  // Add interactive hover effects
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-5px) scale(1)"
    })
  })

  // Add click effect to highlight boxes
  const highlightBoxes = document.querySelectorAll(".highlight-box")
  highlightBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      this.style.transform = "scale(1.02)"
      setTimeout(() => {
        this.style.transform = "scale(1)"
      }, 150)
    })
  })
}

// Initialize terms page if we're on terms.html
if (window.location.pathname.includes("terms.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    initializeTermsAnimations()

    // Add keyboard navigation support
    document.addEventListener("keydown", (event) => {
      // T key to toggle theme
      if (event.key === "t" || event.key === "T") {
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        setTheme(newTheme)
      }
    })

    // Console welcome message
    console.log(`🎓 Welcome to InternConnect Terms of Service!
📋 These terms ensure a safe and fair experience for all users.
🔧 Developer tools detected - Happy coding!
`)
  })
}
