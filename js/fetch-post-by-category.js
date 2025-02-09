document.addEventListener("DOMContentLoaded", () => {
  const categoryMapping = {
    "dreams-blog": 1,
    "art-blog": 2,
    "body-blog": 3,
    "astro-blog": 4,
    "reading-blog": 5
  }

  // Визначаємо категорію на основі data-атрибута
  const bodyElement = document.body
  const pageCategory = bodyElement.getAttribute("data-category")

  if (!pageCategory || !categoryMapping[pageCategory]) {
    console.error("❌ Категорія не знайдена або не визначена!")
    return
  }

  const categoryId = categoryMapping[pageCategory]

  async function fetchPostsByCategory() {
    try {
      const response = await fetch(`api.php?category_id=${categoryId}`)
      if (!response.ok) {
        throw new Error(`HTTP помилка! Статус: ${response.status}`)
      }
      const posts = await response.json()
      displayPosts(posts)
    } catch (error) {
      console.error("❌ Помилка при отриманні постів:", error)
    }
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById("postsContainer")
    if (!postsContainer) {
      console.error("❌ Помилка: елемент #postsContainer не знайдено!")
      return
    }

    const fragment = document.createDocumentFragment() // Використовуємо фрагмент для оптимізації

    posts.forEach((post) => {
      const postElement = document.createElement("article")
      postElement.classList.add("article")

      // Заголовок поста (видимий)
      const titleElement = document.createElement("h3")
      titleElement.classList.add("article-title")
      titleElement.textContent = post.Title || "Без заголовка"
      titleElement.style.cursor = "pointer" // Робимо курсор у вигляді "руки"

      // Додаємо SVG-іконку
      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      svgElement.setAttribute("class", "button-decor-icon")
      svgElement.setAttribute("width", "16")
      svgElement.setAttribute("height", "16")

      const useElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
      )
      useElement.setAttribute("href", "./images/icons/icons.svg#icon-down")

      svgElement.appendChild(useElement)
      titleElement.appendChild(svgElement)

      // Контейнер для тексту (прихований)
      const articleContent = document.createElement("div")
      articleContent.classList.add("article-content")
      articleContent.style.display = "none" // Ховаємо текст спочатку

      // Текст статті
      const descriptionElement = document.createElement("p")
      descriptionElement.classList.add("section-text")
      descriptionElement.textContent = post.Description || "Опис відсутній."

      articleContent.appendChild(descriptionElement)

      // Додаємо посилання, якщо є
      if (post.Links) {
        try {
          const linksArray = JSON.parse(post.Links)
          if (Array.isArray(linksArray) && linksArray.length > 0) {
            const linksContainer = document.createElement("div")
            linksContainer.classList.add("links-container")

            linksArray.forEach((link) => {
              if (typeof link === "string" && link.trim() !== "") {
                const linkElement = document.createElement("a")
                linkElement.href = link.trim()
                linkElement.textContent = link.trim()
                linkElement.target = "_blank"
                linkElement.rel = "noopener noreferrer"
                linksContainer.appendChild(linkElement)
                linksContainer.appendChild(document.createElement("br"))
              }
            })

            articleContent.appendChild(linksContainer)
          }
        } catch (e) {
          console.error("❌ Помилка обробки посилань:", e)
        }
      }

      // Додаємо подію кліку на заголовок
      titleElement.addEventListener("click", () => {
        const isHidden = articleContent.style.display === "none"
        articleContent.style.display = isHidden ? "block" : "none"
        svgElement.style.transform = isHidden
          ? "rotate(180deg)"
          : "rotate(0deg)" // Повертаємо іконку
      })

      postElement.appendChild(titleElement)
      postElement.appendChild(articleContent)
      fragment.prepend(postElement) // Додаємо у фрагмент (це швидше за appendChild/prepend)
    })

    postsContainer.innerHTML = "" // Чистимо контейнер перед додаванням нових постів
    postsContainer.appendChild(fragment) // Додаємо всі нові статті одразу
  }

  // Викликаємо функцію для отримання постів за категорією
  fetchPostsByCategory()
})
