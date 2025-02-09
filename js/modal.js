document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("contactModal")
  const openModalBtns = document.querySelectorAll(".openModalBtn")
  const closeModal = document.querySelector(".close")

  if (!modal || openModalBtns.length === 0) {
    return
  }
  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "flex"
    })
  })

  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
})
