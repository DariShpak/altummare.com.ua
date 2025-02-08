const menuBtn = document.querySelector(".mob-menu-btn")
const menu = document.getElementById("mob-menu")
const iconBurger = document.getElementById("icon-burger")
const iconClose = document.getElementById("icon-close")

menuBtn.addEventListener("click", () => {
  const isMenuOpen = menu.style.display === "block"

  menu.style.display = isMenuOpen ? "none" : "block"

  iconBurger.classList.toggle("hidden", !isMenuOpen)
  iconClose.classList.toggle("hidden", isMenuOpen)
})

const anchorLinks = document.querySelectorAll('a[href^="#"]')
anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (menu.style.display === "block") {
      menu.style.display = "none"
      iconBurger.classList.remove("hidden")
      iconClose.classList.add("hidden")
    }
  })
})

window.addEventListener("scroll", () => {
  if (menu.style.display === "block") {
    menu.style.display = "none"
    iconBurger.classList.remove("hidden")
    iconClose.classList.add("hidden")
  }
})
