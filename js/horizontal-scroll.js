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

// ====== Плавний скрол на планшетах (імітація нативного прокручування) ======
let touchStartX = 0
let lastTouchMoveX = 0
let velocity = 0
let isTouching = false
let momentumInterval

main.addEventListener("touchstart", function (e) {
  if (window.innerWidth < 1024) return // Виходимо, якщо мобільний екран

  touchStartX = e.touches[0].clientX
  lastTouchMoveX = touchStartX
  isTouching = true
  velocity = 0
  clearInterval(momentumInterval) // Зупиняємо інерцію, якщо вже йшла
})

main.addEventListener("touchmove", function (e) {
  if (window.innerWidth < 1024) return // Дозволяємо стандартний скрол на мобільних

  let touchMoveX = e.touches[0].clientX
  let distanceX = lastTouchMoveX - touchMoveX
  velocity = distanceX * 0.6 // Зменшуємо різкість руху, робимо плавніше

  window.scrollBy({
    top: velocity, // Плавний скролінг
    behavior: "instant"
  })

  lastTouchMoveX = touchMoveX
  e.preventDefault() // Блокуємо стандартний скрол ТІЛЬКИ НА ПЛАНШЕТАХ і ДЕСКТОПАХ
})

main.addEventListener("touchend", function () {
  if (window.innerWidth < 1024) return // Виходимо, якщо мобільний екран

  isTouching = false
  startMomentumScroll()
})

// ====== Імітація інерції після свайпу ======
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

    velocity *= 0.95 // Поступове сповільнення (ефект інерції)
  }, 16) // Майже 60 FPS
}

// ====== Горизонтальний скрол на тачпадах ======
main.addEventListener(
  "wheel",
  function (e) {
    if (window.innerWidth >= 1024) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        window.scrollTo({
          top: window.scrollY + e.deltaX * 2, // Плавне горизонтальне гортання
          behavior: "instant"
        })

        e.preventDefault()
      }
    }
  },
  {passive: false}
)
