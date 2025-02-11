document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search)
  const accessKey = urlParams.get("key")
  const postId = urlParams.get("id")

  if (accessKey !== "mySecretKey123123123") {
    alert("⛔ Доступ заборонено!")
    window.location.href = "index.html"
    return
  }

  const categoryMapping = {
    1: "dreams-blog",
    2: "art-blog",
    3: "body-blog",
    4: "astro-blog",
    5: "reading-blog"
  }

  const reverseCategoryMapping = {
    "dreams-blog": 1,
    "art-blog": 2,
    "body-blog": 3,
    "astro-blog": 4,
    "reading-blog": 5
  }

  if (postId) {

    try {
      const response = await fetch(
        `https://altummare.com.ua/api.php?id=${postId}`
      )
      if (!response.ok) {
        throw new Error("❌ Помилка отримання даних поста.")
      }

      const postData = await response.json()

      document.getElementById("category").value =
        categoryMapping[postData.CategoryId] || "body-blog"
      document.getElementById("title").value = postData.Title || ""
      document.getElementById("description").value = postData.Description || ""
      document.getElementById("links").value = postData.Links || ""
    } catch (error) {
      alert("❌ Не вдалося завантажити дані поста.")
    }
  }

  // 📝 Обробка сабміту форми
  document
    .getElementById("postForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault()

      const updatedCategoryText = document.getElementById("category").value
      const updatedCategoryId = reverseCategoryMapping[updatedCategoryText] || 3
      const updatedTitle = document.getElementById("title").value
      const updatedDescription = document.getElementById("description").value
      const updatedLinks = document.getElementById("links").value

      try {
        const response = await fetch(
          `https://altummare.com.ua/api.php?id=${postId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              CategoryId: updatedCategoryId,
              Title: updatedTitle,
              Description: updatedDescription,
              Links: updatedLinks
            })
          }
        )

        const result = await response.json()
        console.log("✅ Update Response:", result)

        if (response.ok) {
          alert("✅ Пост успішно оновлено!")

          const redirectUrl = `https://altummare.com.ua/${categoryMapping[updatedCategoryId]}.html`

          console.log(`🔀 Перенаправлення на: ${redirectUrl}`)
          window.location.href = redirectUrl // Перенаправлення на сторінку категорії
        } else {
          alert("❌ Помилка оновлення поста.")
        }
      } catch (error) {
        alert("❌ Помилка оновлення поста.")
      }
    })
})
