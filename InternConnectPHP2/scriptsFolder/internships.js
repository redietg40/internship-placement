// Sample job data with images from Pexels
const jobsData = [
  {
    id: 1,
    title: "Bahir Dar Incubation Center",
    company: "Innovation Hub",
    logo: "TC",
    image: "Images/inter1.webp",
    location: "remote",
    type: "internship",
    salary: 3500,
    duration: "2-6",
    industry: "technology",
    status: "open",
    tags: ["Website development", "Networking", "System development", "UI/UX"],
    description:
      "A leading innovation hub supporting startups and entrepreneurs through comprehensive internship programs and mentorship opportunities.",
    fullDescription:
      "As a BIC Center at innovation hub , you will work alongside our experienced development team to create responsive and accessible assistances. You'll gain hands-on experience with modern works, and learn best practices for your work. This internship is perfect for students looking to apply their knowledge in a real-world setting. You'll participate in code reviews, contribute to open-source projects, and work on cutting-edge web technologies.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong communication skills",
      "Relevant field of study",
      "Strong problem-solving skills and attention to detail",
      "Ability to work collaboratively in a team environment",
      "Understanding of version control systems (Git)",
    ],
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "ICT4D Research Center Company",
    company: "InnovateTech",
    logo: "IT",
    image: "Images/intern2.jpg",
    location: "H9WP+75H, Bahir Dar",
    type: "internship",
    salary: 4500,
    duration: "2-6",
    industry: "technology",
    status: "open",
    tags: ["Java", "Spring Boot", "Microservices", "Cloud"],
    description:
      "Empowering future tech leaders through cutting-edge web development and AI-focused internship projects with industry experts.",
    fullDescription:
      "ICT4D Research Center Company is a forward-thinking technology company specializing in web development, artificial intelligence, and digital solutions. Founded in 2020, we have rapidly grown to become one of Ethiopia's leading tech companies, serving clients across Africa and beyond.",
    requirements: [
      "Computer Science, Software Engineering, or related field",
      "Basic programming knowledge (JavaScript, Python, or Java)",
      "Excellent English communication skills",
      "Strong problem-solving and analytical skills",
      "Interest in cloud technologies and distributed systems",
      "Excellent English communication skills",
    ],
    posted: "1 day ago",
  },

  {
    id: 3,
    title: "Nile Engineering Group",
    company: "DataAnalytics Co.",
    logo: "DA",
    image: "Images/intern3.webp",
    location: "san-francisco",
    type: "internship",
    salary: 4200,
    duration: "2-6",
    industry: "technology",
    status: "closed",
    tags: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    description:
      "Premier engineering firm providing internships in civil, water resources, and environmental engineering with real project exposure.",
    fullDescription:
      "Nile Engineering Group is a premier engineering consultancy firm specializing in civil, mechanical, electrical, and environmental engineering solutions. With over 15 years of experience, we have successfully completed major infrastructure projects across Ethiopia, contributing to the nation's development through innovative engineering practices and sustainable solutions.",
    requirements: [
      "Bachelor's degree in Engineering (Civil, Mechanical, Electrical, Environmental)",
      "Minimum GPA of 3.0",
      "Strong foundation in mathematics and physics",
      "Knowledge of engineering software (AutoCAD, SolidWorks, etc.)",
      "Strong analytical and problem-solving skills",
      "Ability to work in team environments",
    ],
    posted: "1 week ago",
  },
  {
    id: 4,
    title: "Addis Software",
    company: "Creative Solutions",
    logo: "CS",
    image: "Images/intern4.webp",
    location: "Bahir Dar, Ethiopia",
    type: "internship",
    salary: 3200,
    duration: "2-6",
    industry: "design",
    status: "open",
    tags: ["Figma", "User Research", "Wireframing", "Prototyping"],
    description:
      "Leading software development company specializing in enterprise solutions and mobile applications with comprehensive internship programs.",
    fullDescription:
      "Addis Software is a leading software development company specializing in custom software solutions, web applications, mobile apps, and digital transformation services. With over 8 years of experience, we have delivered innovative software solutions to clients across Ethiopia and East Africa, helping businesses digitize their operations and achieve technological excellence.",
    requirements: [
      "Bachelor's degree in Computer Science, Software Engineering, or IT",
      "Strong academic performance (GPA 3.0+)",
      "Understanding of user-centered design principles",
      "Basic knowledge of wireframing and prototyping",
      "Strong visual design skills and attention to detail",
      "Portfolio showcasing design projects",
    ],
    posted: "3 days ago",
  },
  {
    id: 5,
    title: "Nile Engineering Group",
    company: "Capital Investments",
    logo: "CI",
    image: "Images/engneer.avif",
    location: "new-Kebele 02, Near Blue Nile Bridge Bahir Dar, Ethiopia",
    type: "internship",
    salary: 3800,
    duration: "2-6",
    industry: "finance",
    status: "open",
    tags: [
      "AutoCAD",
      "Structural Analysis",
      "Project Management",
      "Thermodynamics",
    ],
    description:
      "Premier engineering firm providing internships in civil, water resources, and environmental engineering with real project exposure.",
    fullDescription:
      "Engineering Excellence for All Levels: NEG welcomes engineering students from all backgrounds - from fresh graduates seeking their first professional experience to advanced students with prior internship experience",
    requirements: [
      "Currently pursuing a degree in Finance, Economics, or related field",
      "Strong analytical and quantitative skills",
      "Currently enrolled in university",
      "Strong communication skills",
      "Relevant field of study",
      "CFA Level I candidate status is preferred but not required",
    ],
    posted: "4 days ago",
  },
  {
    id: 6,
    title: "Healthcare Administration Intern",
    company: "MediCare Group",
    logo: "MC",
    image: "Images/intern6.jpeg",
    location: "Bahir Dar, Ethiopia",
    type: "part-time",
    salary: 2600,
    duration: "6+",
    industry: "healthcare",
    status: "open",
    tags: ["Administration", "Healthcare", "Coordination", "Records"],
    description:
      "Ideal for healthcare management students looking to gain practical experience in hospital administration and patient care coordination.",
    fullDescription:
      "As a Healthcare Administration Intern at MediCare Group, you'll work with our administrative team to support various healthcare operations. You'll gain experience in patient coordination, records management, and healthcare administration processes. This internship is perfect for students pursuing careers in healthcare management or administration. You'll learn about healthcare regulations, quality improvement, and healthcare information systems.",
    requirements: [
      "Currently pursuing a degree in Healthcare Administration, Public Health, or related field",
      "Strong organizational and communication skills",
      "Interest in healthcare operations and management",
      "Ability to handle sensitive information with confidentiality",
      "Proficiency in Microsoft Office applications",
      "Knowledge of HIPAA regulations is a plus",
    ],
    posted: "1 week ago",
  },
  {
    id: 7,
    title: "ethiodent Software Engineering Intern",
    company: "InnovateTech",
    logo: "IT",
    image: "Images/intern7.webp",
    location: "Signal Mall 3rd Floor, Bahir Dar",
    type: "internship",
    salary: 4500,
    duration: "6+",
    industry: "technology",
    status: "open",
    tags: ["Java", "Spring Boot", "Microservices", "Cloud"],
    description:
      "Work on scalable backend systems and microservices architecture. You'll collaborate with senior engineers on high-impact projects.",
    fullDescription:
      "As a Software Engineering Intern at InnovateTech, you'll work on building scalable backend systems and microservices that serve millions of users. You'll collaborate with senior engineers, participate in architecture discussions, and contribute to our cloud-native infrastructure. This internship offers exposure to cutting-edge technologies and best practices in software development.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Strong programming skills in Java or similar languages",
      "Understanding of object-oriented programming principles",
      "Familiarity with database systems and SQL",
      "Interest in cloud technologies and distributed systems",
      "Experience with Git and agile development practices",
    ],
    posted: "1 day ago",
  },
  {
    id: 8,
    title: "Digital Marketing Intern",
    company: "BrandBoost",
    logo: "BB",
    image: "Images/intern8.webp",
    location: "remote",
    type: "part-time",
    salary: 3000,
    duration: "3-6",
    industry: "marketing",
    status: "closed",
    tags: ["PPC", "Google Ads", "Facebook Ads", "Analytics"],
    description:
      "Join our digital marketing team to manage paid advertising campaigns and analyze performance metrics across multiple platforms.",
    fullDescription:
      "As a Digital Marketing Intern at BrandBoost, you'll manage paid advertising campaigns across Google Ads, Facebook Ads, and other platforms. You'll learn campaign optimization, A/B testing, and performance analysis. This role is perfect for marketing students interested in the technical side of digital advertising and data-driven marketing strategies.",
    requirements: [
      "Currently pursuing a degree in Marketing, Business, or related field",
      "Interest in digital advertising and paid media",
      "Basic understanding of Google Analytics",
      "Strong analytical skills and attention to detail",
      "Excellent communication and presentation skills",
      "Google Ads or Facebook Ads certification is a plus",
    ],
    posted: "6 days ago",
  },
];

// DOM elements
const jobsContainer = document.getElementById("jobs-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetFiltersButton = document.getElementById("reset-filters");
const sortSelect = document.getElementById("sort-select");
const modal = document.getElementById("job-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");

// State management
let currentJobs = [...jobsData];
let currentFilters = {
  search: "",
  status: "",
  jobTypes: [],
  industries: [],
  locations: [],
  durations: [],
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  renderJobs(jobsData);
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });

  // Real-time search
  searchInput.addEventListener("input", debounce(handleSearch, 300));

  // Reset filters
  resetFiltersButton.addEventListener("click", resetFilters);

  // Sort functionality
  sortSelect.addEventListener("change", handleSort);

  // Real-time filtering when checkboxes/radio buttons change
  const filterInputs = document.querySelectorAll(".filter-options input");
  filterInputs.forEach((input) => {
    input.addEventListener("change", handleFilter);
  });

  // Apply filters button
  document
    .getElementById("apply-filters")
    .addEventListener("click", handleFilter);

  // Modal functionality
  closeModal.addEventListener("click", closeJobModal);

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeJobModal();
    }
  });
}

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Render jobs to the page
function renderJobs(jobs) {
  if (jobs.length === 0) {
    jobsContainer.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <h3>No internships found</h3>
                        <p>Try adjusting your filters or search terms</p>
                    </div>
                `;
    return;
  }

  jobsContainer.innerHTML = "";

  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.setAttribute("data-job-id", job.id);

    jobCard.innerHTML = `
                    <img src="${job.image}" alt="${
      job.title
    }" class="job-image">
                    <div class="job-status ${job.status}">${
      job.status.charAt(0).toUpperCase() + job.status.slice(1)
    }</div>
                    <button class="save-job" data-job-id="${job.id}">
                        <i class="far fa-bookmark"></i>
                    </button>
                    <div class="job-content">
                        <div class="job-header">
                            <div>
                                <h3 class="job-title">${job.title}</h3>
                                <div class="company">
                                    <div class="company-logo">${job.logo}</div>
                                    <div class="company-info">
                                        <div class="company-name">${
                                          job.company
                                        }</div>
                                        <div class="company-industry">
                                            <i class="fas fa-building"></i>
                                            ${
                                              job.industry
                                                .charAt(0)
                                                .toUpperCase() +
                                              job.industry.slice(1)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${formatLocation(job.location)}</span>
                            </div>
                            
                            <div class="job-detail">
                                <i class="fas fa-clock"></i>
                                <span>${formatJobType(job.type)}</span>
                            </div>
                        </div>
                        <div class="job-tags">
                            ${job.tags
                              .slice(0, 3)
                              .map((tag) => `<span class="tag">${tag}</span>`)
                              .join("")}
                            ${
                              job.tags.length > 3
                                ? `<span class="tag">+${
                                    job.tags.length - 3
                                  } more</span>`
                                : ""
                            }
                        </div>
                        <div class="job-description">
                            <p>${job.description}</p>
                        </div>
                        <div class="job-actions">
                            
                            <a href="BIC.html"><button class="btn btn-outline learn-more-btn">
                                Learn More
                            </button></a>
                        </div>
                        <div class="posted-date">Posted ${job.posted}</div>
                    </div>
                `;

    jobsContainer.appendChild(jobCard);
  });

  // Add event listeners to the new job cards
  addJobCardEventListeners();
}

// Add event listeners to job cards
function addJobCardEventListeners() {
  // Save job functionality
  const saveButtons = document.querySelectorAll(".save-job");
  saveButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleSaveJob(this);
    });
  });

  // Apply now functionality
  const applyButtons = document.querySelectorAll(".apply-btn");
  applyButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!this.disabled) {
        handleApply(this.getAttribute("data-job-id"));
      }
    });
  });

  // Learn more functionality
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const jobId = this.getAttribute("data-job-id");
      showJobModal(jobId);
    });
  });

  // Job card click to open modal
  const jobCards = document.querySelectorAll(".job-card");
  jobCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Don't open modal if clicking on buttons or links
      if (e.target.closest(".btn") || e.target.closest(".save-job")) {
        return;
      }
      const jobId = this.getAttribute("data-job-id");
      showJobModal(jobId);
    });
  });
}

// Toggle save job
function toggleSaveJob(button) {
  const icon = button.querySelector("i");
  button.classList.toggle("saved");

  if (button.classList.contains("saved")) {
    icon.className = "fas fa-bookmark";
  } else {
    icon.className = "far fa-bookmark";
  }
}

// Handle apply functionality
function handleApply(jobId) {
  const job = jobsData.find((j) => j.id === Number.parseInt(jobId));
  if (job) {
    alert(
      `Thank you for your interest in the ${job.title} position at ${job.company}! The application process would start here.`
    );
  }
}

// Show job details in modal
function showJobModal(jobId) {
  const job = jobsData.find((job) => job.id === Number.parseInt(jobId));
  if (!job) return;

  modalBody.innerHTML = `
                <img src="${job.image}" alt="${
    job.title
  }" class="modal-job-image">
                <div class="modal-job-header">
                    <h2 class="modal-job-title">${job.title}</h2>
                    <div class="modal-company">
                        <div class="modal-company-logo">${job.logo}</div>
                        <div class="modal-company-info">
                            <h3>${job.company}</h3>
                            <p><i class="fas fa-building"></i> ${
                              job.industry.charAt(0).toUpperCase() +
                              job.industry.slice(1)
                            }</p>
                        </div>
                    </div>
                </div>
                <div class="modal-job-details">
                    <div class="modal-job-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><strong>Location:</strong> ${formatLocation(
                          job.location
                        )}</span>
                    </div>
                    <div class="modal-job-detail">
                        <i class="fas fa-dollar-sign"></i>
                        <span><strong>Salary:</strong> $${job.salary.toLocaleString()}/mo</span>
                    </div>
                    <div class="modal-job-detail">
                        <i class="fas fa-clock"></i>
                        <span><strong>Type:</strong> ${formatJobType(
                          job.type
                        )}</span>
                    </div>
                    <div class="modal-job-detail">
                        <i class="fas fa-calendar"></i>
                        <span><strong>Posted:</strong> ${job.posted}</span>
                    </div>
                </div>
                <div class="modal-job-tags">
                    ${job.tags
                      .map((tag) => `<span class="modal-tag">${tag}</span>`)
                      .join("")}
                </div>
                <div class="modal-job-description">
                    <p>${job.fullDescription}</p>
                </div>
                <div class="modal-job-requirements">
                    <h4>Requirements:</h4>
                    <ul>
                        ${job.requirements
                          .map((req) => `<li>${req}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="handleApply(${
                      job.id
                    })" ${job.status === "closed" ? "disabled" : ""}>
                        ${
                          job.status === "open"
                            ? "Apply Now"
                            : "Position Closed"
                        }
                    </button>
                    <button class="btn btn-outline" onclick="closeJobModal()">
                        Close
                    </button>
                </div>
            `;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Close job modal
function closeJobModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Format location for display
function formatLocation(location) {
  if (location === "remote") return "Remote";
  return location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Format job type for display
function formatJobType(type) {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Handle search functionality
function handleSearch() {
  currentFilters.search = searchInput.value.toLowerCase().trim();
  applyFilters();
}

// Handle filter functionality
function handleFilter() {
  // Get status filter
  const statusRadio = document.querySelector('input[name="status"]:checked');
  currentFilters.status = statusRadio ? statusRadio.value : "";

  // Get checkbox filters

  currentFilters.industries = getSelectedValues("industry");
  currentFilters.locations = getSelectedValues("location");
  currentFilters.durations = getSelectedValues("duration");

  applyFilters();
}

// Apply all filters
function applyFilters() {
  let filteredJobs = jobsData.filter((job) => {
    // Search filter
    const searchMatch =
      !currentFilters.search ||
      job.title.toLowerCase().includes(currentFilters.search) ||
      job.company.toLowerCase().includes(currentFilters.search) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(currentFilters.search)
      ) ||
      job.description.toLowerCase().includes(currentFilters.search);

    // Status filter
    const statusMatch =
      !currentFilters.status || job.status === currentFilters.status;

    // Job type filter
    const jobTypeMatch =
      currentFilters.jobTypes.length === 0 ||
      currentFilters.jobTypes.includes(job.type);

    // Industry filter
    const industryMatch =
      currentFilters.industries.length === 0 ||
      currentFilters.industries.includes(job.industry);

    // Location filter
    const locationMatch =
      currentFilters.locations.length === 0 ||
      currentFilters.locations.includes(job.location);

    // Duration filter
    const durationMatch =
      currentFilters.durations.length === 0 ||
      currentFilters.durations.includes(job.duration);

    return (
      searchMatch &&
      statusMatch &&
      jobTypeMatch &&
      industryMatch &&
      locationMatch &&
      durationMatch
    );
  });

  // Apply sorting
  const sortValue = sortSelect.value;
  filteredJobs = sortJobs(filteredJobs, sortValue);

  currentJobs = filteredJobs;
  renderJobs(filteredJobs);
}

// Get selected values from checkboxes
function getSelectedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

// Reset all filters
function resetFilters() {
  // Reset search input
  searchInput.value = "";

  // Reset all checkboxes and radio buttons
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  // Check the "All" status radio button
  document.querySelector('input[name="status"][value=""]').checked = true;

  // Reset sort selection
  sortSelect.value = "newest";

  // Reset filters object
  currentFilters = {
    search: "",
    status: "",
    jobTypes: [],
    industries: [],
    locations: [],
    durations: [],
  };

  // Render all jobs
  currentJobs = [...jobsData];
}

// Handle sort functionality
function handleSort() {
  const sortValue = sortSelect.value;
  const sortedJobs = sortJobs([...currentJobs], sortValue);
  renderJobs(sortedJobs);
}

// Sort jobs based on criteria
function sortJobs(jobs, sortBy) {
  switch (sortBy) {
    case "newest":
      return jobs.sort((a, b) => b.id - a.id);
    case "salary":
      return jobs.sort((a, b) => b.salary - a.salary);
    case "relevance":
      return jobs.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return jobs;
  }
}

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeJobModal();
  }
});
