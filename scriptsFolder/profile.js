let currentStep = 1
let currentTestimonialIndex = 0
const totalSteps = 4
const testimonials = document.querySelectorAll(".testimonial")
const dots = document.querySelectorAll(".dot")

const API_BASE_URL = "http://localhost/InternConnectPHP2";

function showNotification(message, type = "info", duration = 5000) {
  const existingNotifications = document.querySelectorAll(".notification")
  if (existingNotifications.length > 3) {
    existingNotifications[0].remove()
  }

  const notification = document.createElement("div")
  notification.className = `notification ${type}`

  const content = document.createElement("div")
  content.className = "notification-content"

  const icon = document.createElement("i")
  switch (type) {
    case "success":
      icon.className = "fas fa-check-circle"
      break
    case "error":
      icon.className = "fas fa-exclamation-circle"
      break
    case "warning":
      icon.className = "fas fa-exclamation-triangle"
      break
    default:
      icon.className = "fas fa-info-circle"
  }

  const messageSpan = document.createElement("span")
  messageSpan.textContent = message

  const closeBtn = document.createElement("button")
  closeBtn.className = "notification-close"
  closeBtn.innerHTML = "&times;"
  closeBtn.onclick = () => removeNotification(notification)

  content.appendChild(icon)
  content.appendChild(messageSpan)
  notification.appendChild(content)
  notification.appendChild(closeBtn)

  const container = document.getElementById("notificationContainer")
  container.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    removeNotification(notification)
  }, duration)
}

function removeNotification(notification) {
  if (notification && notification.parentNode) {
    notification.classList.remove("show")
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }
}

function validateEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

function validateGPA(gpa) {
  if (!gpa || gpa === "") return { valid: true, message: "" }

  const gpaValue = Number.parseFloat(gpa)

  if (isNaN(gpaValue)) {
    return { valid: false, message: "GPA must be a valid number" }
  }

  if (gpaValue < 0) {
    return { valid: false, message: "GPA cannot be negative" }
  }

  if (gpaValue > 4.0) {
    return { valid: false, message: "GPA cannot be greater than 4.0 on standard scale" }
  }

  return { valid: true, message: "" }
}

function validatePhone(phone) {
  const cleanPhone = phone.replace(/\D/g, "")

  if (cleanPhone.length < 10) {
    return { valid: false, message: "Phone number must be at least 10 digits" }
  }

  if (cleanPhone.length > 15) {
    return { valid: false, message: "Phone number cannot exceed 15 digits" }
  }

  return { valid: true, message: "" }
}

function validateURL(url) {
  if (!url || url === "") return { valid: true, message: "" }

  try {
    const urlObj = new URL(url)
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return { valid: false, message: "URL must start with http:// or https://" }
    }
    return { valid: true, message: "" }
  } catch (error) {
    return { valid: false, message: "Please enter a valid URL" }
  }
}

function validateRequired(value, fieldName) {
  if (!value || value.trim() === "") {
    return { valid: false, message: `${fieldName} is required` }
  }
  return { valid: true, message: "" }
}

function validateMinLength(value, minLength, fieldName) {
  if (value && value.length < minLength) {
    return { valid: false, message: `${fieldName} must be at least ${minLength} characters` }
  }
  return { valid: true, message: "" }
}

const validationRules = {
  fullName: [(value) => validateRequired(value, "Full name"), (value) => validateMinLength(value, 2, "Full name")],
  email: [
    (value) => validateRequired(value, "Email"),
    (value) =>
      validateEmail(value)
        ? { valid: true, message: "" }
        : { valid: false, message: "Please enter a valid email address" },
  ],
  phone: [(value) => validateRequired(value, "Phone number"), (value) => validatePhone(value)],
  university: [
    (value) => validateRequired(value, "University/Institution"),
    (value) => validateMinLength(value, 2, "University/Institution"),
  ],
  program: [(value) => validateRequired(value, "Study program")],
  year: [(value) => validateRequired(value, "Year of study")],
  gpa: [(value) => validateGPA(value)],
  programmingLanguages: [
    (value) => validateRequired(value, "Programming languages"),
    (value) => validateMinLength(value, 5, "Programming languages"),
  ],
  portfolio: [(value) => validateURL(value)],
  motivation: [(value) => validateRequired(value, "Motivation"), (value) => validateMinLength(value, 50, "Motivation")],
  technologies: [(value) => validateRequired(value, "Technologies")],
  experience: [(value) => validateRequired(value, "Experience")],
}

function validateField(fieldName, value, showNotification = false) {
  const rules = validationRules[fieldName]
  if (!rules) return { valid: true, message: "" }

  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      setFieldError(fieldName, result.message)
      if (showNotification) {
        showNotification(result.message, "error")
      }
      return result
    }
  }

  clearFieldError(fieldName)
  return { valid: true, message: "" }
}

function setFieldError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}-error`)
  const inputElement = document.getElementById(fieldName)

  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
  }

  if (inputElement) {
    inputElement.classList.add("error")
  }
}

function clearFieldError(fieldName) {
  const errorElement = document.getElementById(`${fieldName}-error`)
  const inputElement = document.getElementById(fieldName)

  if (errorElement) {
    errorElement.textContent = ""
    errorElement.style.display = "none"
  }

  if (inputElement) {
    inputElement.classList.remove("error")
  }
}

function initializeFormValidation() {
  const form = document.getElementById("applicationForm")
  if (!form) return

  const inputs = form.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.name) {
        validateField(this.name, this.value, false)
      }
    })

    input.addEventListener("input", function () {
      if (this.name && this.classList.contains("error")) {
        clearFieldError(this.name)
      }

      if (this.name === "motivation") {
        updateCharacterCount()
      }

      if (this.name === "gpa" && this.value) {
        const validation = validateGPA(this.value)
        if (!validation.valid) {
          showNotification(validation.message, "error")
        }
      }

      if (this.name === "email" && this.value) {
        if (!validateEmail(this.value)) {
          showNotification("Please enter a valid email address", "error", 3000)
        }
      }
    })

    if (input.name === "gpa") {
      input.addEventListener("input", function () {
        const value = Number.parseFloat(this.value)
        if (value > 4.0) {
          this.value = "4.0"
          showNotification("GPA cannot be greater than 4.0", "error")
        }
      })
    }
  })

  form.addEventListener("submit", handleFormSubmit)
}

function updateCharacterCount() {
  const motivationField = document.getElementById("motivation")
  const countElement = document.getElementById("motivation-count")

  if (motivationField && countElement) {
    const length = motivationField.value.length
    const minimum = 50

    countElement.textContent = `${length}/${minimum} minimum`

    if (length >= minimum) {
      countElement.style.color = "green"
    } else {
      countElement.style.color = "#666"
    }
  }
}

function validateCurrentStep() {
  const stepFields = {
    1: ["fullName", "email", "phone", "university"],
    2: ["program", "year", "gpa"],
    3: ["programmingLanguages", "portfolio"],
    4: ["motivation"],
  }

  const fieldsToValidate = stepFields[currentStep] || []
  let isValid = true
  const errors = []

  fieldsToValidate.forEach((fieldName) => {
    const input = document.getElementById(fieldName)
    if (input) {
      const validation = validateField(fieldName, input.value, false)
      if (!validation.valid) {
        isValid = false
        errors.push(validation.message)
      }
    }
  })

  if (!isValid) {
    showNotification(`Please fix the following errors: ${errors.join(", ")}`, "error", 7000)
  }

  return isValid
}

async function handleFormSubmit(e) {
  e.preventDefault()

  console.log("[v0] Form submission started")

  let allValid = true
  const allErrors = []

  const allFields = [
    "fullName",
    "email",
    "phone",
    "university",
    "program",
    "year",
    "gpa",
    "portfolio",
    "programmingLanguages",
    "technologies",
    "motivation",
    "experience",
  ]

  allFields.forEach((fieldName) => {
    const input = document.getElementById(fieldName)
    if (input) {
      const validation = validateField(fieldName, input.value, false)
      if (!validation.valid) {
        allValid = false
        allErrors.push(`${fieldName}: ${validation.message}`)
        console.log(`[v0] Validation error for ${fieldName}:`, validation.message)
      }
    }
  })

  if (!allValid) {
    showNotification(`Please fix validation errors: ${allErrors.join("; ")}`, "error", 10000)
    console.error("[v0] Validation errors:", allErrors)
    return
  }

  const submitBtn = document.getElementById("submitBtn")
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  btnText.style.display = "none"
  btnLoading.style.display = "inline-block"
  submitBtn.disabled = true

  try {
    const formData = new FormData(document.getElementById("applicationForm"))
    const applicationData = {}

    for (const [key, value] of formData.entries()) {
      applicationData[key] = value.trim()
    }

    console.log("[v0] Submitting application data:", applicationData)
    showNotification("Submitting your application...", "info")

    const response = await fetch(`${API_BASE_URL}/process_application.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    }).catch(error => {
      console.error("[v0] Network error details:", error);
      throw new Error(`Cannot connect to server: ${error.message}`);
    });

    console.log("[v0] Response status:", response.status)
    console.log("[v0] Response headers:", response.headers)

    const responseText = await response.text()
    console.log("[v0] Raw response:", responseText)

    let result
    try {
      result = JSON.parse(responseText)
    } catch (parseError) {
      console.error("[v0] JSON parse error:", parseError)

      if (responseText.includes('<?php') || responseText.includes('<!DOCTYPE')) {
        throw new Error(`Server returned PHP/HTML instead of JSON. Make sure you're accessing the application through Apache (http://localhost/InternConnectPHP2/) not Live Server. Raw response: ${responseText.substring(0, 200)}`)
      }

      if (response.status >= 500) {
        throw new Error(`Server error (${response.status}): ${responseText.substring(0, 200)}`)
      }

      throw new Error(`Server returned invalid JSON: ${responseText.substring(0, 200)}`)
    }

    console.log("[v0] Parsed response data:", result)

    if (result.success) {
      showNotification("Application submitted successfully! We will contact you soon.", "success", 8000)
      closeApplicationModal()
      resetForm()
    } else {
      if (result.errors && Array.isArray(result.errors)) {
        const errorMessage = result.errors.join("; ")
        showNotification(`Validation errors: ${errorMessage}`, "error", 10000)
        console.error("[v0] Server validation errors:", result.errors)
      } else if (result.error_type === "duplicate_email") {
        showNotification(
          "An application with this email already exists. Please use a different email address.",
          "error",
          8000,
        )
      } else {
        showNotification(result.message || "Failed to submit application", "error", 8000)
        console.error("[v0] Server error:", result)
      }
    }
  } catch (error) {
    console.error("[v0] Application submission error:", error)
    showNotification(`Network error: ${error.message}. Please check your connection and try again.`, "error", 8000)
  } finally {
    btnText.style.display = "inline-block"
    btnLoading.style.display = "none"
    submitBtn.disabled = false
  }
}

function resetForm() {
  const form = document.getElementById("applicationForm")
  if (form) {
    form.reset()

    const errorElements = form.querySelectorAll(".error-message")
    errorElements.forEach((error) => {
      error.textContent = ""
      error.style.display = "none"
    })

    const inputs = form.querySelectorAll(".error")
    inputs.forEach((input) => input.classList.remove("error"))

    currentStep = 1
    showStep(currentStep)

    updateCharacterCount()
  }
}

function initializeAnimations() {
  document.documentElement.style.scrollBehavior = "smooth"

  const elements = document.querySelectorAll(".section-card, .hero")
  elements.forEach((element, index) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 100)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme()
  initializeTestimonialSlider()
  initializeAnimations()
  initializeFormValidation()
  updateCharacterCount()
  setupThemeToggle()
})

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme)
  } else if (!prefersDark) {
    document.body.setAttribute("data-theme", "light")
  } else {
    document.body.setAttribute("data-theme", "dark")
  }

  updateThemeIcon()
}

function setupThemeToggle() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme)
  }
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-theme") || "dark"
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  document.body.setAttribute("data-theme", newTheme)
  localStorage.setItem("theme", newTheme)

  updateThemeIcon()

  showNotification(`Switched to ${newTheme} mode`, "info", 2000)
}

function updateThemeIcon() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  if (!themeToggleBtn) return

  const icon = themeToggleBtn.querySelector("i")
  const currentTheme = document.body.getAttribute("data-theme") || "dark"

  if (icon) {
    if (currentTheme === "dark") {
      icon.className = "fas fa-sun"
      themeToggleBtn.setAttribute("aria-label", "Switch to light mode")
    } else {
      icon.className = "fas fa-moon"
      themeToggleBtn.setAttribute("aria-label", "Switch to dark mode")
    }
  }
}

function initializeTestimonialSlider() {
  if (testimonials.length > 0) {
    setInterval(() => {
      currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length
      showTestimonial(currentTestimonialIndex)
    }, 5000)
  }
}

function currentTestimonial(index) {
  currentTestimonialIndex = index
  showTestimonial(index)
}

function showTestimonial(index) {
  testimonials.forEach((testimonial) => {
    testimonial.classList.remove("active")
  })

  dots.forEach((dot) => {
    dot.classList.remove("active")
  })

  if (testimonials[index]) {
    testimonials[index].classList.add("active")
  }
  if (dots[index]) {
    dots[index].classList.add("active")
  }
}

function toggleFAQ(index) {
  const faqItems = document.querySelectorAll(".faq-item")
  const faqItem = faqItems[index]

  if (faqItem) {
    const isActive = faqItem.classList.contains("active")

    faqItems.forEach((item) => {
      item.classList.remove("active")
    })

    if (!isActive) {
      faqItem.classList.add("active")
    }
  }
}

function openApplicationModal() {
  const modal = document.getElementById("applicationModal")
  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  currentStep = 1
  showStep(currentStep)
}

function closeApplicationModal() {
  const modal = document.getElementById("applicationModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

window.onclick = (event) => {
  const modal = document.getElementById("applicationModal")
  if (event.target === modal) {
    closeApplicationModal()
  }
}

function changeStep(direction) {
  if (direction === 1 && currentStep < totalSteps) {
    if (validateCurrentStep()) {
      currentStep++
      showStep(currentStep)
    }
  } else if (direction === -1 && currentStep > 1) {
    currentStep--
    showStep(currentStep)
    const stepFields = {
      1: ["fullName", "email", "phone", "university"],
      2: ["program", "year", "gpa"],
      3: ["programmingLanguages", "portfolio"],
      4: ["motivation"],
    }
    const fieldsToValidate = stepFields[currentStep] || []
    fieldsToValidate.forEach((fieldName) => clearFieldError(fieldName))
  }
}

function showStep(step) {
  const steps = document.querySelectorAll(".form-step")
  steps.forEach((stepElement) => {
    stepElement.classList.remove("active")
  })

  const currentStepElement = document.querySelector(`[data-step="${step}"]`)
  if (currentStepElement) {
    currentStepElement.classList.add("active")
  }

  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const submitBtn = document.getElementById("submitBtn")

  prevBtn.style.display = step === 1 ? "none" : "inline-block"
  nextBtn.style.display = step === totalSteps ? "none" : "inline-block"
  submitBtn.style.display = step === totalSteps ? "inline-block" : "none"
}

async function testBackendConnection() {
  try {
    console.log("Testing backend connection to:", `${API_BASE_URL}/process_application.php`)
    const response = await fetch(`${API_BASE_URL}/process_application.php`)

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log("Raw response:", responseText)

    let result
    try {
      result = JSON.parse(responseText)
      console.log("Backend connection test successful:", result)
      return result
    } catch (parseError) {
      console.error("JSON parse error:", parseError)

      if (responseText.includes('<?php')) {
        console.error("Server is returning PHP code instead of executing it!")
        console.error("Solution: Make sure you're accessing via Apache (http://localhost/InternConnectPHP2/) not Live Server")
        showNotification("Backend Error: Server not executing PHP. Use Apache URL: http://localhost/InternConnectPHP2/", "error", 10000)
      } else if (response.status === 404) {
        console.error("Endpoint not found!")
        showNotification("Backend Error: process_application.php not found", "error", 8000)
      } else {
        console.error("Unexpected response format")
        showNotification("Backend Error: Unexpected server response", "error", 8000)
      }

      return null
    }
  } catch (error) {
    console.error("Network error:", error)

    if (error.message.includes('Failed to fetch')) {
      console.error("Cannot connect to server!")
      console.error("Solution: Make sure XAMPP Apache is running and accessible at http://localhost/InternConnectPHP2/")
      showNotification("Cannot connect to server. Check if XAMPP Apache is running.", "error", 8000)
    } else {
      showNotification("Backend connection failed: " + error.message, "error", 8000)
    }

    return null
  }
}

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(testBackendConnection, 1000)
  })
}
