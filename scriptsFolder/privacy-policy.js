// Privacy Policy JavaScript Functionality

// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeScrollEffects();
  initializeSmoothScrolling();
  initializeReadingProgress();
  initializePrintFunctionality();
});

// Theme Toggle Functionality
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);
  localStorage.setItem("theme", currentTheme);

  // Add animation effect
  document.body.style.transition = "all 0.3s ease";
  setTimeout(() => {
    document.body.style.transition = "";
  }, 300);
}

function initializeTheme() {
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeIcon = document.getElementById("theme-icon");

  if (themeIcon) {
    if (theme === "dark") {
      themeIcon.className = "fas fa-sun";
    } else {
      themeIcon.className = "fas fa-moon";
    }
  }
}

// Smooth Scrolling for Quick Links
function initializeSmoothScrolling() {
  const quickLinks = document.querySelectorAll('.quick-links a[href^="#"]');

  quickLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Add highlight effect
        targetElement.style.backgroundColor = "rgba(37, 99, 235, 0.1)";
        setTimeout(() => {
          targetElement.style.backgroundColor = "";
        }, 2000);
      }
    });
  });
}

// Scroll Effects
function initializeScrollEffects() {
  const sections = document.querySelectorAll(".policy-section");
  const quickLinks = document.querySelectorAll(".quick-links a");

  // Intersection Observer for section highlighting
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Remove active class from all links
          quickLinks.forEach((link) => link.classList.remove("active"));

          // Add active class to corresponding link
          const sectionId = entry.target.id;
          const correspondingLink = document.querySelector(
            `.quick-links a[href="#${sectionId}"]`
          );
          if (correspondingLink) {
            correspondingLink.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-20% 0px -70% 0px",
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Reading Progress Indicator
function initializeReadingProgress() {
  // Create progress bar
  const progressBar = document.createElement("div");
  progressBar.id = "reading-progress";
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  // Update progress on scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}

// Print Functionality
function initializePrintFunctionality() {
  // Add print button
  const printButton = document.createElement("button");
  printButton.innerHTML = '<i class="fas fa-print"></i> Print Policy';
  printButton.className = "print-btn";
  printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

  printButton.addEventListener("click", () => {
    window.print();
  });

  printButton.addEventListener("mouseenter", () => {
    printButton.style.transform = "scale(1.05)";
  });

  printButton.addEventListener("mouseleave", () => {
    printButton.style.transform = "scale(1)";
  });

  document.body.appendChild(printButton);
}

// Search Functionality within Policy
function initializeSearch() {
  const searchContainer = document.createElement("div");
  searchContainer.className = "policy-search";
  searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="policy-search-input" placeholder="Search within policy...">
            <button onclick="searchPolicy()"><i class="fas fa-search"></i></button>
        </div>
        <div id="search-results"></div>
    `;

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.insertBefore(searchContainer, sidebar.firstChild);
  }
}

function searchPolicy() {
  const searchTerm = document
    .getElementById("policy-search-input")
    .value.toLowerCase();
  const sections = document.querySelectorAll(".policy-section");
  const resultsContainer = document.getElementById("search-results");

  if (!searchTerm) {
    resultsContainer.innerHTML = "";
    return;
  }

  const results = [];

  sections.forEach((section, index) => {
    const text = section.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      const title = section.querySelector("h2").textContent;
      results.push({
        title: title,
        section: section,
        index: index,
      });
    }
  });

  if (results.length > 0) {
    resultsContainer.innerHTML = `
            <h4>Search Results (${results.length})</h4>
            <ul>
                ${results
                  .map(
                    (result) => `
                    <li><a href="#" onclick="scrollToSection(${result.index})">${result.title}</a></li>
                `
                  )
                  .join("")}
            </ul>
        `;
  } else {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  }
}

function scrollToSection(index) {
  const sections = document.querySelectorAll(".policy-section");
  if (sections[index]) {
    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Copy Section Link
function initializeCopyLinks() {
  const headings = document.querySelectorAll(".policy-section h2");

  headings.forEach((heading) => {
    heading.style.cursor = "pointer";
    heading.title = "Click to copy link to this section";

    heading.addEventListener("click", () => {
      const sectionId = heading.parentElement.id;
      const url =
        window.location.origin + window.location.pathname + "#" + sectionId;

      navigator.clipboard.writeText(url).then(() => {
        showNotification("Link copied to clipboard!");
      });
    });
  });
}

// Notification System
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); }
        to { transform: translateX(-50%) translateY(0); }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); }
        to { transform: translateX(-50%) translateY(-100%); }
    }
    
    .quick-links a.active {
        color: var(--primary-color) !important;
        background: var(--bg-color) !important;
        font-weight: 600;
    }
    
    .policy-search {
        background: var(--card-bg);
        padding: 20px;
        border-radius: 15px;
        box-shadow: var(--shadow);
        margin-bottom: 20px;
    }
    
    .search-box {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .search-box input {
        flex: 1;
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-color);
        color: var(--text-color);
    }
    
    .search-box button {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
    }
    
    #search-results ul {
        list-style: none;
        padding: 0;
    }
    
    #search-results li {
        margin-bottom: 8px;
    }
    
    #search-results a {
        color: var(--primary-color);
        text-decoration: none;
        padding: 5px 10px;
        border-radius: 5px;
        display: block;
        transition: background 0.3s ease;
    }
    
    #search-results a:hover {
        background: var(--bg-color);
    }
`;
document.head.appendChild(style);

// Initialize additional features
document.addEventListener("DOMContentLoaded", () => {
  initializeSearch();
  initializeCopyLinks();
});

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + P for print
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    window.print();
  }

  // Ctrl/Cmd + F for search
  if ((e.ctrlKey || e.metaKey) && e.key === "f") {
    e.preventDefault();
    const searchInput = document.getElementById("policy-search-input");
    if (searchInput) {
      searchInput.focus();
    }
  }

  // T for theme toggle
  if (e.key === "t" || e.key === "T") {
    if (!e.target.matches("input, textarea")) {
      toggleTheme();
    }
  }
});

// Analytics (placeholder for future implementation)
function trackPolicyView(section) {
  // This would integrate with analytics service
  console.log(`Policy section viewed: ${section}`);
}

// Accessibility improvements
function initializeAccessibility() {
  // Add skip links
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px";
  });

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content ID
  const policyContent = document.querySelector(".policy-content");
  if (policyContent) {
    policyContent.id = "main-content";
  }
}

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", initializeAccessibility);
