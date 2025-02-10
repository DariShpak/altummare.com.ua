let main = document.querySelector(".main")
let horizontal = document.querySelector(".horizontal")

function updateScrollBehavior() {
  if (window.innerWidth >= 1024) {
    let totalWidth = main.scrollWidth
    horizontal.style.height = `${totalWidth - window.innerWidth}px`
    window.addEventListener("scroll", scrollFunction)
  } else {
    main.style.transform = ""
    document.body.style.overflowY = "auto"
    window.removeEventListener("scroll", scrollFunction)
  }
}

function scrollFunction() {
  let scrollY = window.scrollY
  main.style.transform = `translateX(-${scrollY}px)`
}

updateScrollBehavior()
window.addEventListener("resize", updateScrollBehavior)

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 1024) {
    let scrollTopButton = document.querySelector(".home-page-scroll-btn")
    if (scrollTopButton) {
      scrollTopButton.style.visibility = "hidden"
      scrollTopButton.style.opacity = "0"
      scrollTopButton.style.pointerEvents = "none"
    }
  }
})


