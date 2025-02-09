document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal")
  const openModalBtns = document.querySelectorAll(".openModalBtn")
  const closeModal = document.querySelector(".close")

  if (!modal || openModalBtns.length === 0) {
    console.error("❌ Помилка: Модалка або кнопки не знайдені!")
    return
  }

  // Відкриття модалки
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex"
    })
  })

  // Закриття модалки
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  // Закриття при кліку поза вікном
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
})
