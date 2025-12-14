// Create floating particles for interactive background
function createFloatingParticles() {
  const floatingBg = document.querySelector(".floating-bg");
  if (!floatingBg) return;

  setInterval(() => {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(249, 115, 22, 0.3);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: 100%;
      animation: floatUp ${Math.random() * 3 + 5}s linear forwards;
      animation-delay: ${Math.random() * 2}s;
    `;

    floatingBg.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 8000);
  }, 300);
}

// Add CSS for floating particles animation
function addFloatingParticlesCSS() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Enhanced back button functionality
function goBack(event) {
  event.preventDefault();

  // Try to go back in history first
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Fallback to index.html if no history
    window.location.href = "index.html";
  }
}

// Theme functionality
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update the toggle button icon
  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    if (theme === "light") {
      themeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeBtn.title = "Switch to Dark Mode";
    } else {
      themeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      `;
      themeBtn.title = "Switch to Light Mode";
    }
  }
}

// Add this new function to toggle between themes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -30px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
    }
  });
}, observerOptions);

// Add animation styles
function addAnimationCSS() {
  const style = document.createElement("style");
  style.textContent = `
    .animate-in {
      animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .timeline-card,
    .vision,
    .vision-statement {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .timeline-card.animate-in,
    .vision.animate-in,
    .vision-statement.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Add theme toggle functionality
  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Add floating particles CSS and start animation
  addFloatingParticlesCSS();
  createFloatingParticles();

  // Add animation CSS
  addAnimationCSS();

  // Observe elements for animations
  const animatedElements = document.querySelectorAll(
    ".timeline-card, .vision, .vision-statement"
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Add stagger animation to timeline items
  const timelineCards = document.querySelectorAll(".timeline-card");
  timelineCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });
});

// Add parallax effect to floating shapes
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const floatingCircles = document.querySelectorAll(".floating-circle");

  floatingCircles.forEach((circle, index) => {
    const speed = 0.3 + index * 0.1;
    circle.style.transform = `translateY(${scrolled * speed}px) rotate(${
      scrolled * 0.05
    }deg)`;
  });
});

// Mouse movement effect for interactive background
document.addEventListener("mousemove", (e) => {
  const floatingCircles = document.querySelectorAll(".floating-circle");
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  floatingCircles.forEach((circle, index) => {
    const moveX = (mouseX - 0.5) * 20 * (index + 1);
    const moveY = (mouseY - 0.5) * 20 * (index + 1);
    const currentTransform = circle.style.transform || "";
    circle.style.transform = `${currentTransform} translate(${moveX}px, ${moveY}px)`;
  });
});

// Add smooth scrolling for anchor links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
