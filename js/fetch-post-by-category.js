document.addEventListener("DOMContentLoaded", () => {
  const categoryMapping = {
    "dreams-blog": 1,
    "art-blog": 2,
    "body-blog": 3,
    "astro-blog": 4,
    "reading-blog": 5
  }

  const bodyElement = document.body
  const pageCategory = bodyElement.getAttribute("data-category")

  if (!pageCategory || !categoryMapping[pageCategory]) {
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
    } catch (error) {}
  }

  function displayPosts(posts) {
    const postsContainer = document.getElementById("postsContainer")
    if (!postsContainer) {
      return
    }

    const fragment = document.createDocumentFragment()

    posts.forEach((post) => {
      const postElement = document.createElement("article")
      postElement.classList.add("article")

      const titleElement = document.createElement("h3")
      titleElement.classList.add("article-title")
      titleElement.textContent = post.Title || "Без заголовка"
      titleElement.style.cursor = "pointer"

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

      const articleContent = document.createElement("div")
      articleContent.classList.add("article-content")
      articleContent.style.display = "none"

      const descriptionElement = document.createElement("p")
      descriptionElement.classList.add("section-text")
      descriptionElement.textContent = post.Description || "Опис відсутній."

      articleContent.appendChild(descriptionElement)

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
        } catch (e) {}
      }

      titleElement.addEventListener("click", () => {
        const isHidden = articleContent.style.display === "none"
        articleContent.style.display = isHidden ? "block" : "none"
        svgElement.style.transform = isHidden
          ? "rotate(180deg)"
          : "rotate(0deg)"
      })

      postElement.appendChild(titleElement)
      postElement.appendChild(articleContent)
      fragment.prepend(postElement)
    })

    postsContainer.innerHTML = ""
    postsContainer.appendChild(fragment)
  }

  fetchPostsByCategory()
})
