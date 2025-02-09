document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal")
  const openModalBtn = document.getElementById("openModalBtn")
  const closeModal = document.querySelector(".close")
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("successMessage")

  // Відкриття модального вікна
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex"
  })

  // Закриття при кліку на "×"
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    resetForm()
  })

  // Закриття при кліку поза вікном
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
      resetForm()
    }
  })

  // Обробка форми
  form.addEventListener("submit", function (e) {
    e.preventDefault()

    // Ховаємо форму, показуємо повідомлення
    form.style.display = "none"
    successMessage.style.display = "block"

    // Закриваємо модалку через 3 секунди
    setTimeout(() => {
      modal.style.display = "none"
      resetForm()
    }, 3000)
  })

  // Скидання форми після закриття
  function resetForm() {
    form.style.display = "block"
    successMessage.style.display = "none"
    form.reset()
  }
})
