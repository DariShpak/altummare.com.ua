const scrollToTopBtn = document.getElementById("scroll-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block"
  } else {
    scrollToTopBtn.style.display = "none"
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})
