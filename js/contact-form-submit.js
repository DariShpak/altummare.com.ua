document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form")
  const successMessage = document.getElementById("successMessage")
  const modal = document.getElementById("contactModal")
  const sourceInput = document.getElementById("source-input")
  const openFormButtons = document.querySelectorAll(".openModalBtn")

  if (!form || !successMessage || !modal || !sourceInput) {
    return
  }

  openFormButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const source = this.getAttribute("data-source") || "Невідоме джерело"
      sourceInput.value = source 
    })
  })

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
      alert("❌ Щось пішло не так. Перевірте інтернет-з'єднання.")
    }
  })

  function resetForm() {
    form.style.display = "flex"
    successMessage.style.display = "none"
    form.reset()
  }
})
