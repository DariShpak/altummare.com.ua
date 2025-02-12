let main = document.querySelector(".main")
let horizontal = document.querySelector(".horizontal")

function updateScrollBehavior() {
  if (window.innerWidth >= 1024) {
    let sections = document.querySelectorAll(
      ".main > .section, .blog-list .blog-item"
    )
    let totalWidth = 0

    sections.forEach((section) => {
      totalWidth += section.getBoundingClientRect().width
    })

    totalWidth += 300 // Додаємо запас
    main.style.width = `${totalWidth}px`
    horizontal.style.height = `${totalWidth - window.innerWidth}px`

    document.body.style.overflowY = "scroll"
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

let touchStartX = 0
let lastTouchMoveX = 0
let velocity = 0
let isTouching = false
let momentumInterval

main.addEventListener("touchstart", function (e) {
  if (window.innerWidth < 1024) return

  touchStartX = e.touches[0].clientX
  lastTouchMoveX = touchStartX
  isTouching = true
  velocity = 0
  clearInterval(momentumInterval)
})

main.addEventListener("touchmove", function (e) {
  if (window.innerWidth < 1024) return

  let touchMoveX = e.touches[0].clientX
  let distanceX = lastTouchMoveX - touchMoveX
  velocity = distanceX * 0.6

  window.scrollBy({
    top: velocity,
    behavior: "instant"
  })

  lastTouchMoveX = touchMoveX
  e.preventDefault()
})

main.addEventListener("touchend", function () {
  if (window.innerWidth < 1024) return

  isTouching = false
  startMomentumScroll()
})

function startMomentumScroll() {
  momentumInterval = setInterval(() => {
    if (Math.abs(velocity) < 0.5) {
      clearInterval(momentumInterval)
      return
    }

    window.scrollBy({
      top: velocity,
      behavior: "instant"
    })

    velocity *= 0.95
  }, 16)
}

main.addEventListener(
  "wheel",
  function (e) {
    if (window.innerWidth >= 1024) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        window.scrollTo({
          top: window.scrollY + e.deltaX * 2,
          behavior: "instant"
        })

        e.preventDefault()
      }
    }
  },
  {passive: false}
)
