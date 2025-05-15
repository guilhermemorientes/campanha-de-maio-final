document.addEventListener("DOMContentLoaded", () => {
  // Initialize slider
  initSlider()

  // Initialize form submission
  initFormSubmission()

  // Initialize animations
  initAnimations()
})

function initSlider() {
  let currentIndex = 0
  const slides = document.querySelectorAll(".slide")

  if (!slides.length) return

  // Show first slide
  slides[0].classList.add("active")

  // Set up automatic rotation
  setInterval(() => {
    slides[currentIndex].classList.remove("active")
    currentIndex = (currentIndex + 1) % slides.length
    slides[currentIndex].classList.add("active")
  }, 5000)
}

function initFormSubmission() {
  const form = document.getElementById("leadForm")
  const status = document.getElementById("status")

  if (!form || !status) return

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Show loading state
    status.textContent = "Enviando..."
    status.style.color = "#666"

    // Collect form data
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
      // Send data to Google Sheets
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyRjQnLWrREWPFh2ywt_ATSxpkSMRxoju4vvTsEfA5vhnmsVxMu91cMnRzpKfrNPlLG/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data),
        },
      )

      // Show success message
      status.textContent = "✅ Dados enviados com sucesso!"
      status.style.color = "green"
      form.reset()
    } catch (error) {
      // Show error message
      status.textContent = "❌ Erro ao enviar os dados."
      status.style.color = "red"
      console.error("Form submission error:", error)
    }
  })
}

function initAnimations() {
  // Animate tarjas and texts with a slight delay
  const tarjas = document.querySelectorAll(".tarja-img")
  const textos = document.querySelectorAll(".tarja-text")

  // Add animation classes with staggered timing
  tarjas.forEach((el, i) => {
    setTimeout(() => (el.style.animation = "slideInTarja 0.6s ease-out forwards"), 200 + i * 100)
  })

  textos.forEach((el, i) => {
    setTimeout(() => (el.style.animation = "fadeTextIn 0.6s ease-out forwards"), 400 + i * 100)
  })
}
