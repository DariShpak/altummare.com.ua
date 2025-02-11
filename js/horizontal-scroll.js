

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


let main = document.querySelector(".main");
let horizontal = document.querySelector(".horizontal");

function updateScrollBehavior() {
  if (window.innerWidth >= 1024) {
    let totalWidth = main.scrollWidth;
    horizontal.style.height = `${totalWidth - window.innerWidth}px`;
    document.body.style.overflowY = "scroll";
    window.addEventListener("scroll", scrollFunction);
  } else {
    main.style.transform = "";
    document.body.style.overflowY = "auto";
    window.removeEventListener("scroll", scrollFunction);
  }
}

function scrollFunction() {
  let scrollY = window.scrollY;
  main.style.transform = `translateX(-${scrollY}px)`;
}

updateScrollBehavior();
window.addEventListener("resize", updateScrollBehavior);

document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 1024) {
    let scrollTopButton = document.querySelector(".home-page-scroll-btn");
    if (scrollTopButton) {
      scrollTopButton.style.visibility = "hidden";
      scrollTopButton.style.opacity = "0";
      scrollTopButton.style.pointerEvents = "none";
    }
  }
});

// ====== Плавний скрол на планшетах (імітація тачпаду) ======
let touchStartX = 0;
let lastTouchMoveX = 0;
let isTouching = false;

main.addEventListener("touchstart", function (e) {
  touchStartX = e.touches[0].clientX;
  lastTouchMoveX = touchStartX;
  isTouching = true;
});

main.addEventListener("touchmove", function (e) {
  if (!isTouching) return;

  let touchMoveX = e.touches[0].clientX;
  let distanceX = lastTouchMoveX - touchMoveX; // Різниця між останнім рухом

  window.scrollBy({
    top: distanceX * 1.5, // Плавне горизонтальне гортання
    behavior: "instant"
  });

  lastTouchMoveX = touchMoveX;
  e.preventDefault(); // Запобігає стандартному вертикальному прокручуванню
});

main.addEventListener("touchend", function () {
  isTouching = false;
});

// ====== Підтримка горизонтального скролу на тачпадах ======
main.addEventListener("wheel", function (e) {
  if (window.innerWidth >= 1024) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { 
      // Використовуємо scrollLeft замість window.scrollBy для кращої роботи з тачпадами
      window.scrollTo({
        top: window.scrollY + e.deltaX * 2.5, // Гортання сторінки вгору/вниз впливає на горизонтальну прокрутку
        behavior: "instant"
      });

      e.preventDefault(); // Важливо для блокування стандартного поведінки браузера
    }
  }
}, { passive: false }); // Додаємо `passive: false`, щоб браузер дозволяв `preventDefault`

