// Theme management
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme);
  createFloatingParticles();
  updateThemeIcon();
  initializeForm();

  // Add smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Create floating particles
function createFloatingParticles() {
  const overlay = document.getElementById("backgroundOverlay");
  if (!overlay) return;

  setInterval(() => {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 3 + 5 + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";

    overlay.appendChild(particle);

    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 8000);
  }, 300);
}

// Theme toggle functionality
function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(currentTheme);
  updateThemeIcon();
}

// Set theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  currentTheme = theme;
}

// Update theme icon
function updateThemeIcon() {
  const themeIcon = document.querySelector(".theme-btn i");
  if (themeIcon) {
    if (currentTheme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }
}

// Initialize form functionality
function initializeForm() {
  const form = document.getElementById("contactForm");
  const themeToggle = document.getElementById("themeToggle");

  // Theme toggle event
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Form submission
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }

  // Form input enhancements
  const inputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );
  inputs.forEach((input) => {
    // Add focus/blur effects
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
    });

    // Add input validation feedback
    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.style.borderColor = "#f97316";
      } else {
        this.style.borderColor = "#ef4444";
      }
    });
  });
}

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form elements
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  // Get form data
  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject").trim();
  const message = formData.get("message").trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    showAlert("Please fill in all required fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Please enter a valid email address.", "error");
    return;
  }

  // Show loading state
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    successMessage.style.display = "block";
    form.reset();

    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth" });

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);

    // Reset input styles
    const inputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );
    inputs.forEach((input) => {
      input.style.borderColor = "#e5e7eb";
    });
  }, 2000);
}

// Show alert function
function showAlert(message, type = "info") {
  // Create alert element
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

  // Set background color based on type
  if (type === "error") {
    alert.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
  } else if (type === "success") {
    alert.style.background = "linear-gradient(135deg, #10b981, #059669)";
  } else {
    alert.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
  }

  alert.textContent = message;
  document.body.appendChild(alert);

  // Animate in
  setTimeout(() => {
    alert.style.transform = "translateX(0)";
  }, 100);

  // Remove after 4 seconds
  setTimeout(() => {
    alert.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert);
      }
    }, 300);
  }, 4000);
}

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Toggle theme with 'T' key
  if (e.key === "t" || e.key === "T") {
    if (!e.ctrlKey && !e.altKey && !e.target.matches("input, textarea")) {
      toggleTheme();
    }
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  document.body.style.transform = "scale(1)";
});

// Console welcome message
console.log(`
📧 Contact Page Loaded Successfully!
🎨 Theme: ${currentTheme}
🔧 Developer tools detected - Happy coding!
💡 Press 'T' to toggle theme
`);

// Add click sound effect (optional)
function playClickSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }
}

// Add click sound to interactive elements
document.addEventListener("DOMContentLoaded", () => {
  const clickableElements = document.querySelectorAll(
    ".theme-btn, .submit-btn"
  );
  clickableElements.forEach((element) => {
    element.addEventListener("click", playClickSound);
  });
});
