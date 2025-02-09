document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault() // Забороняємо перезавантаження сторінки

    // Відповідність назв категорій до ID
    const categoryMapping = {
      "dreams-blog": 1,
      "art-blog": 2,
      "body-blog": 3,
      "astro-blog": 4,
      "reading-blog": 5
    }

    // Отримуємо значення з select
    const categoryKey = document.getElementById("category").value
    console.log("🔎 Перевірка значення select перед обробкою:", categoryKey)

    // Визначаємо categoryId
    const categoryId = categoryMapping[categoryKey]
    console.log("✅ Правильний categoryId перед обробкою:", categoryId)

    if (!categoryId) {
      console.error("❌ Помилка: Невірне значення категорії!", categoryKey)
      return
    }

    const title = document.getElementById("title").value
    const description = document.getElementById("description").value

    // Отримуємо посилання та форматуємо їх як масив
    const linksInput = document.getElementById("links").value
    console.log("🔗 Введені посилання:", linksInput)

    const linksArray = linksInput
      .split(",")
      .map((link) => link.trim())
      .filter((link) => link !== "")

    console.log("🔗 Масив посилань після обробки:", linksArray)

    // Формуємо об'єкт для відправки
    const postData = {
      CategoryId: categoryId,
      Title: title,
      Description: description,
      Links: linksArray // Масив посилань
    }

    console.log("📩 Відправка поста з даними:", postData) // Додаємо вивід

    // Відправка даних через fetch
    //   fetch("api.php", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(postData)
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("✅ Відповідь сервера:", data)
    //       document.getElementById("responseMessage").textContent = data.success
    //         ? "Пост успішно створено!"
    //         : "Помилка: " + data.error
    //     })
    //     .catch((error) => {
    //       console.error("❌ Помилка при відправці:", error)
    //       document.getElementById("responseMessage").textContent =
    //         "Не вдалося відправити дані."
    //     })
    // })

    // Відправка даних через fetch
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
          clearForm() // Викликаємо функцію очищення форми
        }
      })
      .catch((error) => {
        console.error("❌ Помилка при відправці:", error)
        document.getElementById("responseMessage").textContent =
          "❌ Не вдалося відправити дані."
      })
  })

// Функція очищення форми після успішного створення поста
function clearForm() {
  document.getElementById("postForm").reset() // Очищає всі поля форми
  document.getElementById("responseMessage").textContent = "" // Прибирає повідомлення
}
