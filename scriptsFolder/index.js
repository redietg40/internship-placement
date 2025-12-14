// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior for any future navigation
  document.documentElement.style.scrollBehavior = "smooth";

  // Add fade-in animation to cards
  const cards = document.querySelectorAll(".card");

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Apply initial styles and observe cards
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Add image loading optimization
  const featuredImage = document.querySelector(".featured-image");
  if (featuredImage) {
    featuredImage.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    featuredImage.style.opacity = "0";
    featuredImage.style.transition = "opacity 0.5s ease";
  }
});

// Initialize page animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling for any anchor links
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

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    ".content-card, .hero-text, .hero-image-container"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Add hover sound effect for interactive elements
  const interactiveElements = document.querySelectorAll(
    ".learn-more-btn, .content-card"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", playHoverSound);
  });

  // Enhanced image hover effects
  const imageWrapper = document.querySelector(".image-wrapper");
  if (imageWrapper) {
    imageWrapper.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)";
    });

    imageWrapper.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg)";
    });
  }

  // Add parallax effect on scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-image");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Add typing effect to main title
  const mainTitle = document.querySelector(".featured-main-title");
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    setTimeout(typeWriter, 500);
  }

  // Add click ripple effect to buttons
  const buttons = document.querySelectorAll(".learn-more-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Hover sound effect function
function playHoverSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (AudioContext) {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.1
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }
}

// Add CSS for ripple effect
const style = document.createElement("style");
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
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = "smooth";

  // Enhanced intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll(".enhanced-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.8s ease ${
      index * 0.2
    }s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(card);
  });

  const featuredImage = document.querySelector(".enhanced-image");
  if (featuredImage) {
    featuredImage.addEventListener("load", function () {
      this.style.opacity = "1";
      this.style.transform = "scale(1)";
    });

    featuredImage.style.opacity = "0";
    featuredImage.style.transform = "scale(0.95)";
    featuredImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  }

  const imageWrapper = document.querySelector(".enhanced-wrapper");
  if (imageWrapper) {
    let hoverTimeout;

    imageWrapper.addEventListener("mouseenter", function () {
      clearTimeout(hoverTimeout);
      this.style.transform = "translateY(-15px) scale(1.02) rotateY(2deg)";

      // Add particle effect on hover
      createHoverParticles(this);
    });

    imageWrapper.addEventListener("mouseleave", function () {
      hoverTimeout = setTimeout(() => {
        this.style.transform = "translateY(0) scale(1) rotateY(0deg)";
      }, 100);
    });

    // Mouse move parallax effect
    imageWrapper.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * 5;

      this.style.transform = `translateY(-15px) scale(1.02) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".enhanced-image");

    parallaxElements.forEach((element) => {
      const speed = 0.3;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    // Add floating animation to icons based on scroll
    const floatingIcons = document.querySelectorAll(".floating-icon");
    floatingIcons.forEach((icon, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = Math.sin(scrolled * 0.01 + index) * 10;
      icon.style.transform = `translateY(${yPos}px) rotate(${
        scrolled * speed
      }deg)`;
    });
  });

  const mainTitle = document.querySelector(".featured-main-title");
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        mainTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      } else {
        // Add cursor blink effect
        const cursor = document.createElement("span");
        cursor.textContent = "|";
        cursor.style.animation = "blink 1s infinite";
        mainTitle.appendChild(cursor);

        setTimeout(() => {
          cursor.remove();
        }, 3000);
      }
    };

    setTimeout(typeWriter, 800);
  }

  const enhancedBtns = document.querySelectorAll(".enhanced-btn");
  enhancedBtns.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    // Add magnetic effect
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      this.style.transform = `translateY(-3px) scale(1.05) translate(${
        x * 0.1
      }px, ${y * 0.1}px)`;
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1) translate(0, 0)";
    });
  });
});

function createHoverParticles(element) {
  for (let i = 0; i < 5; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.background = "#667eea";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";

    const rect = element.getBoundingClientRect();
    particle.style.left = rect.left + Math.random() * rect.width + "px";
    particle.style.top = rect.top + Math.random() * rect.height + "px";

    document.body.appendChild(particle);

    // Animate particle
    particle.animate(
      [
        { transform: "translateY(0) scale(1)", opacity: 1 },
        { transform: "translateY(-50px) scale(0)", opacity: 0 },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      }
    ).onfinish = () => particle.remove();
  }
}

const enhancedStyles = document.createElement("style");
enhancedStyles.textContent = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  
  .animate-in {
    animation: slideInScale 0.8s ease-out forwards;
  }
  
  @keyframes slideInScale {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
document.head.appendChild(enhancedStyles);
