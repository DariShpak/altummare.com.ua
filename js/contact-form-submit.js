document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("successMessage")
  const modal = document.getElementById("contactModal")

  if (!form) {
    console.error("❌ Помилка: Форма не знайдена!")
    return
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault()

    const formData = new FormData(form)

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {Accept: "application/json"}
      })

      if (response.ok) {
        // 😏 Ось він – секс: красиво ховаємо форму, показуємо повідомлення
        form.style.display = "none"
        successMessage.style.display = "block"

        // Закриваємо модалку через 3 секунди, бо діла зроблені 😎
        setTimeout(() => {
          modal.style.display = "none"
          resetForm()
        }, 3000)
      } else {
        alert("❌ Помилка! Спробуйте ще раз.")
      }
    } catch (error) {
      console.error("❌ Виникла помилка:", error)
      alert("❌ Щось пішло не так. Перевірте інтернет-з'єднання.")
    }
  })

  // Функція скидання форми, щоб усе виглядало як свіженьке після закриття
  function resetForm() {
    form.style.display = "block"
    successMessage.style.display = "none"
    form.reset()

    // Примусове оновлення стилів, щоб відступи не схлопувались
    form.classList.remove("reset")
    void form.offsetWidth
    form.classList.add("reset")
  }
})
