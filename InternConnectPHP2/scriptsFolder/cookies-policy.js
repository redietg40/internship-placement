// Cookies Policy JavaScript Functionality

// Cookie Management System
class CookieManager {
  constructor() {
    this.cookiePreferences = this.loadPreferences();
    this.initializeEventListeners();
    this.updateCookieStatus();
  }

  loadPreferences() {
    const saved = localStorage.getItem("cookiePreferences");
    return saved
      ? JSON.parse(saved)
      : {
          essential: true,
          analytics: false,
          functional: false,
          marketing: false,
          consentGiven: false,
        };
  }

  savePreferences(preferences) {
    this.cookiePreferences = { ...preferences, consentGiven: true };
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify(this.cookiePreferences)
    );
    this.updateCookieStatus();
    this.applyCookieSettings();
  }

  initializeEventListeners() {
    // Modal event listeners will be added when modal is opened
  }

  updateCookieStatus() {
    const statusDisplay = document.getElementById("cookie-status-display");
    if (!statusDisplay) return;

    const { essential, analytics, functional, marketing, consentGiven } =
      this.cookiePreferences;

    if (!consentGiven) {
      statusDisplay.innerHTML = `
                <div class="status-item">
                    <i class="fas fa-exclamation-triangle" style="color: var(--warning-color);"></i>
                    <span>Cookie preferences not set</span>
                </div>
            `;
      return;
    }

    statusDisplay.innerHTML = `
            <div class="status-item">
                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                <span>Essential: Enabled</span>
            </div>
            <div class="status-item">
                <i class="fas ${
                  analytics ? "fa-check-circle" : "fa-times-circle"
                }" 
                   style="color: var(--${
                     analytics ? "success" : "danger"
                   }-color);"></i>
                <span>Analytics: ${analytics ? "Enabled" : "Disabled"}</span>
            </div>
            <div class="status-item">
                <i class="fas ${
                  functional ? "fa-check-circle" : "fa-times-circle"
                }" 
                   style="color: var(--${
                     functional ? "success" : "danger"
                   }-color);"></i>
                <span>Functional: ${functional ? "Enabled" : "Disabled"}</span>
            </div>
            <div class="status-item">
                <i class="fas ${
                  marketing ? "fa-check-circle" : "fa-times-circle"
                }" 
                   style="color: var(--${
                     marketing ? "success" : "danger"
                   }-color);"></i>
                <span>Marketing: ${marketing ? "Enabled" : "Disabled"}</span>
            </div>
        `;
  }

  applyCookieSettings() {
    // Apply analytics cookies
    if (this.cookiePreferences.analytics) {
      this.enableAnalytics();
    } else {
      this.disableAnalytics();
    }

    // Apply functional cookies
    if (this.cookiePreferences.functional) {
      this.enableFunctional();
    } else {
      this.disableFunctional();
    }

    // Apply marketing cookies
    if (this.cookiePreferences.marketing) {
      this.enableMarketing();
    } else {
      this.disableMarketing();
    }
  }

  enableAnalytics() {
    // Enable Google Analytics or other analytics services
    console.log("Analytics cookies enabled");
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
  }

  disableAnalytics() {
    // Disable analytics tracking
    console.log("Analytics cookies disabled");
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { 'anonymize_ip': true });
  }

  enableFunctional() {
    // Enable functional cookies like theme preferences, language settings
    console.log("Functional cookies enabled");
  }

  disableFunctional() {
    // Disable functional cookies
    console.log("Functional cookies disabled");
    // Clear functional cookies
    this.clearFunctionalCookies();
  }

  enableMarketing() {
    // Enable marketing and advertising cookies
    console.log("Marketing cookies enabled");
  }

  disableMarketing() {
    // Disable marketing cookies
    console.log("Marketing cookies disabled");
    this.clearMarketingCookies();
  }

  clearFunctionalCookies() {
    // Clear functional cookies except essential ones
    const functionalCookies = [
      "theme_preference",
      "language_pref",
      "search_history",
    ];
    functionalCookies.forEach((cookie) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }

  clearMarketingCookies() {
    // Clear marketing cookies
    const marketingCookies = ["_fbp", "_fbc", "fr"];
    marketingCookies.forEach((cookie) => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
}

// Initialize Cookie Manager
let cookieManager;

// Theme Management
let currentTheme = localStorage.getItem("theme") || "light";

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  cookieManager = new CookieManager();
  initializeTheme();
  initializeScrollEffects();
  initializeSmoothScrolling();
  initializeReadingProgress();
  initializePrintFunctionality();
  initializeAccessibility();
});

// Theme Toggle Functionality
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme);

  // Only save theme preference if functional cookies are enabled
  if (cookieManager.cookiePreferences.functional) {
    localStorage.setItem("theme", currentTheme);
  }

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

// Cookie Settings Modal Functions
function openCookieSettings() {
  const modal = document.getElementById("cookie-settings-modal");
  if (!modal) return;

  // Set current preferences in modal
  const { analytics, functional, marketing } = cookieManager.cookiePreferences;

  document.getElementById("analytics-cookies").checked = analytics;
  document.getElementById("functional-cookies").checked = functional;
  document.getElementById("marketing-cookies").checked = marketing;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // Focus management for accessibility
  const firstFocusable = modal.querySelector("button, input");
  if (firstFocusable) firstFocusable.focus();
}

function closeCookieSettings() {
  const modal = document.getElementById("cookie-settings-modal");
  if (!modal) return;

  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function acceptAllCookies() {
  const preferences = {
    essential: true,
    analytics: true,
    functional: true,
    marketing: true,
  };

  cookieManager.savePreferences(preferences);
  closeCookieSettings();
  showNotification("All cookies accepted!", "success");
}

function acceptEssentialOnly() {
  const preferences = {
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  };

  cookieManager.savePreferences(preferences);
  closeCookieSettings();
  showNotification("Only essential cookies accepted!", "info");
}

function savePreferences() {
  const preferences = {
    essential: true, // Always true
    analytics: document.getElementById("analytics-cookies").checked,
    functional: document.getElementById("functional-cookies").checked,
    marketing: document.getElementById("marketing-cookies").checked,
  };

  cookieManager.savePreferences(preferences);
  closeCookieSettings();
  showNotification("Cookie preferences saved!", "success");
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  const modal = document.getElementById("cookie-settings-modal");
  if (event.target === modal) {
    closeCookieSettings();
  }
});

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

// Notification System
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  const colors = {
    success: "#10b981",
    info: "#3b82f6",
    warning: "#f59e0b",
    error: "#ef4444",
  };

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${colors[type] || colors.success};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideDown 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideUp 0.3s ease";
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Accessibility improvements
function initializeAccessibility() {
  // Add skip links
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";

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

  // Keyboard navigation for modal
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("cookie-settings-modal");
    if (modal && modal.style.display === "block") {
      if (e.key === "Escape") {
        closeCookieSettings();
      }

      // Tab trapping
      if (e.key === "Tab") {
        const focusableElements = modal.querySelectorAll(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}

// Cookie Banner (for first-time visitors)
function showCookieBanner() {
  if (cookieManager.cookiePreferences.consentGiven) return;

  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.innerHTML = `
        <div class="cookie-banner-content">
            <div class="banner-text">
                <h3><i class="fas fa-cookie-bite"></i> We use cookies</h3>
                <p>We use cookies to enhance your browsing experience, analyze site traffic, and provide personalized content. By clicking "Accept All", you consent to our use of cookies.</p>
            </div>
            <div class="banner-actions">
                <button onclick="acceptEssentialOnly()" class="btn-secondary">Essential Only</button>
                <button onclick="openCookieSettings()" class="btn-secondary">Customize</button>
                <button onclick="acceptAllCookies()" class="btn-primary">Accept All</button>
            </div>
        </div>
    `;

  banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--card-bg);
        border-top: 1px solid var(--border-color);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;

  document.body.appendChild(banner);
}

// Hide cookie banner
function hideCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.style.animation = "slideDown 0.3s ease";
    setTimeout(() => {
      if (document.body.contains(banner)) {
        document.body.removeChild(banner);
      }
    }, 300);
  }
}

// Override cookie manager save to hide banner
const originalSave = cookieManager.savePreferences;
cookieManager.savePreferences = function (preferences) {
  originalSave.call(this, preferences);
  hideCookieBanner();
};

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + P for print
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    window.print();
  }

  // T for theme toggle
  if (e.key === "t" || e.key === "T") {
    if (!e.target.matches("input, textarea")) {
      toggleTheme();
    }
  }

  // C for cookie settings
  if (e.key === "c" || e.key === "C") {
    if (!e.target.matches("input, textarea")) {
      openCookieSettings();
    }
  }
});

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
    
    .status-item {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.9rem;
    }
    
    .cookie-banner-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        gap: 20px;
    }
    
    .banner-text h3 {
        margin: 0 0 8px 0;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .banner-text p {
        margin: 0;
        color: var(--text-light);
        font-size: 0.9rem;
    }
    
    .banner-actions {
        display: flex;
        gap: 10px;
        flex-shrink: 0;
    }
    
    @media (max-width: 768px) {
        .cookie-banner-content {
            flex-direction: column;
            text-align: center;
        }
        
        .banner-actions {
            width: 100%;
            justify-content: center;
        }
    }
`;
document.head.appendChild(style);

// Show cookie banner on page load if needed
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(showCookieBanner, 1000); // Show after 1 second
});

// Analytics tracking (placeholder)
function trackEvent(category, action, label) {
  if (cookieManager.cookiePreferences.analytics) {
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
    // Example: gtag('event', action, { event_category: category, event_label: label });
  }
}

// Track cookie preference changes
const originalSavePreferences = cookieManager.savePreferences;
cookieManager.savePreferences = function (preferences) {
  originalSavePreferences.call(this, preferences);

  // Track the event
  trackEvent("Cookies", "Preferences Updated", JSON.stringify(preferences));
};
