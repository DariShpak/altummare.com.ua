// let main = document.querySelector(".main")
// let horizontal = document.querySelector(".horizontal")

// function updateScrollBehavior() {
//   if (window.innerWidth >= 1024) {
//     let totalWidth = main.scrollWidth
//     horizontal.style.height = `${totalWidth - window.innerWidth}px`
//     document.body.style.overflowY = "scroll"
//     window.addEventListener("scroll", scrollFunction)
//   } else {
//     main.style.transform = ""
//     document.body.style.overflowY = "auto"
//     window.removeEventListener("scroll", scrollFunction)
//   }
// }

// function scrollFunction() {
//   let scrollY = window.scrollY
//   main.style.transform = `translateX(-${scrollY}px)`
// }

// updateScrollBehavior()
// window.addEventListener("resize", updateScrollBehavior)

// document.addEventListener("DOMContentLoaded", () => {
//   if (window.innerWidth >= 1024) {
//     let scrollTopButton = document.querySelector(".home-page-scroll-btn")
//     if (scrollTopButton) {
//       scrollTopButton.style.visibility = "hidden"
//       scrollTopButton.style.opacity = "0"
//       scrollTopButton.style.pointerEvents = "none"
//     }
//   }
// })

// // ====== Додаємо підтримку горизонтального свайпу (тачскріни) ======
// let touchStartX = 0
// let touchEndX = 0
// let lastTouchMove = 0

// main.addEventListener("touchstart", function (e) {
//   touchStartX = e.touches[0].clientX
//   lastTouchMove = touchStartX
// })

// main.addEventListener("touchmove", function (e) {
//   touchEndX = e.touches[0].clientX
//   let distance = touchStartX - touchEndX

//   if (Math.abs(distance) > 10) {
//     // Мінімальна дистанція для свайпу
//     window.scrollBy({
//       top: distance * 1.5, // Збільшуємо чутливість прокручування
//       behavior: "instant"
//     })
//   }

//   lastTouchMove = touchEndX
//   e.preventDefault()
// })

// main.addEventListener("touchend", function () {
//   let velocity = touchEndX - lastTouchMove // Додаємо інерцію
//   if (Math.abs(velocity) > 5) {
//     window.scrollBy({
//       top: -velocity * 15, // Інерція для прокрутки
//       behavior: "smooth"
//     })
//   }
// })

// // ====== Додаємо підтримку горизонтального скролу на тачпадах ======
// main.addEventListener("wheel", function (e) {
//   if (window.innerWidth >= 1024) {
//     if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//       // Виявлення горизонтального скролу
//       window.scrollBy({
//         top: e.deltaX * 2.5, // Збільшення чутливості для тачпаду
//         behavior: "instant"
//       })
//       e.preventDefault()
//     }
//   }
// })

// let main = document.querySelector(".main")
// let horizontal = document.querySelector(".horizontal")

// function updateScrollBehavior() {
//   if (window.innerWidth >= 1024) {
//     // let totalWidth = main.scrollWidth
//     let totalWidth =
//       document.querySelector(".blog-list").scrollWidth + window.innerWidth * 0.1 
// horizontal.style.height = `${totalWidth - window.innerWidth}px`

//     // horizontal.style.height = `${totalWidth - window.innerWidth + 800}px` // Додає запас, щоб не обрізало
//     document.body.style.overflowY = "scroll"
//     window.addEventListener("scroll", scrollFunction)
//   } else {
//     main.style.transform = ""
//     document.body.style.overflowY = "auto"
//     window.removeEventListener("scroll", scrollFunction)
//   }
// }

// function scrollFunction() {
//   let scrollY = window.scrollY
//   main.style.transform = `translateX(-${scrollY}px)`
// }

// updateScrollBehavior()
// window.addEventListener("resize", updateScrollBehavior)

// document.addEventListener("DOMContentLoaded", () => {
//   if (window.innerWidth >= 1024) {
//     let scrollTopButton = document.querySelector(".home-page-scroll-btn")
//     if (scrollTopButton) {
//       scrollTopButton.style.visibility = "hidden"
//       scrollTopButton.style.opacity = "0"
//       scrollTopButton.style.pointerEvents = "none"
//     }
//   }
// })

// // ====== Плавний скрол на планшетах (імітація нативного прокручування) ======
// let touchStartX = 0
// let lastTouchMoveX = 0
// let velocity = 0
// let isTouching = false
// let momentumInterval

// main.addEventListener("touchstart", function (e) {
//   touchStartX = e.touches[0].clientX
//   lastTouchMoveX = touchStartX
//   isTouching = true
//   velocity = 0
//   clearInterval(momentumInterval) // Зупиняємо інерцію, якщо вже йшла
// })

// main.addEventListener("touchmove", function (e) {
//   if (!isTouching) return

//   let touchMoveX = e.touches[0].clientX
//   let distanceX = lastTouchMoveX - touchMoveX
//   velocity = distanceX * 0.6 // Зменшуємо різкість руху, робимо плавніше

//   window.scrollBy({
//     top: velocity, // Плавний скролінг
//     behavior: "instant"
//   })

//   lastTouchMoveX = touchMoveX
//   e.preventDefault()
// })

// main.addEventListener("touchend", function () {
//   isTouching = false
//   startMomentumScroll()
// })

// // ====== Імітація інерції після свайпу ======
// function startMomentumScroll() {
//   momentumInterval = setInterval(() => {
//     if (Math.abs(velocity) < 0.5) {
//       clearInterval(momentumInterval)
//       return
//     }

//     window.scrollBy({
//       top: velocity,
//       behavior: "instant"
//     })

//     velocity *= 0.95 // Поступове сповільнення (ефект інерції)
//   }, 16) // Майже 60 FPS
// }

// // ====== Горизонтальний скрол на тачпадах ======
// main.addEventListener(
//   "wheel",
//   function (e) {
//     if (window.innerWidth >= 1024) {
//       if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//         window.scrollTo({
//           top: window.scrollY + e.deltaX * 2, // Плавне горизонтальне гортання
//           behavior: "instant"
//         })

//         e.preventDefault()
//       }
//     }
//   },
//   {passive: false}
// )

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

    // Додаємо динамічний запас в залежності від розміру екрану
totalWidth += 300 

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
  touchStartX = e.touches[0].clientX
  lastTouchMoveX = touchStartX
  isTouching = true
  velocity = 0
  clearInterval(momentumInterval) // Зупиняємо інерцію, якщо вже йшла
})

main.addEventListener("touchmove", function (e) {
  if (!isTouching) return

  let touchMoveX = e.touches[0].clientX
  let distanceX = lastTouchMoveX - touchMoveX
  velocity = distanceX * 0.6 // Зменшуємо різкість руху, робимо плавніше

  window.scrollBy({
    top: velocity, // Плавний скролінг
    behavior: "instant"
  })

  lastTouchMoveX = touchMoveX
  e.preventDefault()
})

main.addEventListener("touchend", function () {
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
