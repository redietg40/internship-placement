// Theme management
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  setTheme(currentTheme);
});

// Theme functionality
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  currentTheme = theme;

  const themeIcon = document.getElementById("theme-icon");
  if (theme === "dark") {
    themeIcon.className = "fas fa-sun";
  } else {
    themeIcon.className = "fas fa-moon";
  }
}

function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
}

// Enhanced back button functionality
function goBack(event) {
  event.preventDefault();
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = "index.html";
  }
}

// Smooth scrolling for internal links
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add keyboard navigation support
document.addEventListener("keydown", (event) => {
  // ESC key to go back
  if (event.key === "Escape") {
    goBack(event);
  }

  // T key to toggle theme
  if (event.key === "t" || event.key === "T") {
    toggleTheme();
  }
});
