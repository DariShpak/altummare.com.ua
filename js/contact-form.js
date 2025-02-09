document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal")
  const openModalBtns = document.querySelectorAll(".openModalBtn") // Беремо всі кнопки
  const closeModal = document.querySelector(".close")
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("successMessage")

  console.log("Модалка знайдена:", modal)
  console.log("Кнопок для відкриття знайдено:", openModalBtns.length)

  if (!modal || openModalBtns.length === 0) {
    console.error("❌ Помилка: Модалка або кнопки не знайдені!")
    return
  }

  // Додаємо подію на всі кнопки відкриття
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex"

      // Примусове оновлення стилів, щоб відступи не схлопувались
      setTimeout(() => {
        form.classList.remove("reset")
        void form.offsetWidth // Хитрий трюк для перезапуску стилів
        form.classList.add("reset")
      }, 10)
    })
  })

  // Закриття модалки
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

    // Оновлення стилів після повторного відкриття
    form.classList.remove("reset")
    void form.offsetWidth // Перезапуск рендеру
    form.classList.add("reset")
  }
})
