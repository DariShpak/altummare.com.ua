document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()

    const categoryMapping = {
      "dreams-blog": 1,
      "art-blog": 2,
      "body-blog": 3,
      "astro-blog": 4,
      "reading-blog": 5
    }

    const categoryKey = document.getElementById("category").value

    const categoryId = categoryMapping[categoryKey]

    if (!categoryId) {
      return
    }

    const title = document.getElementById("title").value
    const description = document.getElementById("description").value

    const linksInput = document.getElementById("links").value

    const linksArray = linksInput
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link !== "")

    const postData = {
      CategoryId: categoryId,
      Title: title,
      Description: description,
      Links: linksArray
    }

    fetch("api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ Відповідь сервера:", data)
        document.getElementById("responseMessage").textContent = data.success
          ? "✅ Пост успішно створено!"
          : "❌ Помилка: " + data.error

        if (data.success) {
          clearForm()
        }
      })
      .catch((error) => {
        document.getElementById("responseMessage").textContent =
          "❌ Не вдалося відправити дані."
      })
  })

function clearForm() {
  document.getElementById("postForm").reset()
  document.getElementById("responseMessage").textContent = ""
}
