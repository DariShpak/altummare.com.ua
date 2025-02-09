document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("successMessage")
  const modal = document.getElementById("contactModal")

  if (!form || !successMessage || !modal) {
    console.error("❌ Помилка: Форма, повідомлення або модалка не знайдені!")
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
        console.log("✅ Відправлено! Ховаємо форму...")

        // 🔥 Форма зникає, повідомлення стає на її місце
        form.style.display = "none"
        successMessage.style.display = "block"

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

  function resetForm() {
    form.style.display = "flex" // Повертаємо форму назад
    successMessage.style.display = "none"
    form.reset()
  }
})
