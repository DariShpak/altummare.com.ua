document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ admin_actions.js завантажено!")

  const urlParams = new URLSearchParams(window.location.search)
  const isAdmin = urlParams.get("admin") === "secretcode123"

  console.log("🔍 Отриманий admin-код:", urlParams.get("admin"))

  if (!isAdmin) {
    console.log("❌ Адмін-доступ відсутній")
    return
  }

  console.log("✅ Адмін-доступ підтверджено! Додаємо кнопки...")

  function addAdminButtons() {
    document.querySelectorAll(".article").forEach((postElement, index) => {
      let postId = postElement.getAttribute("data-id") || `temp-${index + 1}`

      console.log(`📝 Додаємо кнопки до поста ID: ${postId}`)

      // Якщо кнопки вже є, не додаємо повторно
      if (
        postElement.querySelector(".edit-btn") ||
        postElement.querySelector(".delete-btn")
      ) {
        console.log(`⚠️ Кнопки вже є у поста ID: ${postId}`)
        return
      }

      const editButton = document.createElement("button")
      editButton.textContent = "✏️ Редагувати"
      editButton.classList.add("edit-btn")

      const deleteButton = document.createElement("button")
      deleteButton.textContent = "❌ Видалити"
      deleteButton.classList.add("delete-btn")

      // Стилі кнопок (щоб точно були видимі)
      editButton.style.cssText =
        "margin: 10px; padding: 5px 10px; border: 1px solid #4CAF50; background-color: #4CAF50; color: white; cursor: pointer;"
      deleteButton.style.cssText =
        "margin: 10px; padding: 5px 10px; border: 1px solid #ff0000; background-color: #ff0000; color: white; cursor: pointer;"

      // Створюємо контейнер для кнопок
      const controlsContainer = document.createElement("div")
      controlsContainer.classList.add("admin-controls")
      controlsContainer.appendChild(editButton)
      controlsContainer.appendChild(deleteButton)

      // Додаємо кнопки перед або після контенту статті
      postElement.appendChild(controlsContainer)

      console.log("✅ Кнопки додано у пост ID:", postId)

      // Додаємо події
      editButton.addEventListener("click", () => editPost(postElement, postId))
      deleteButton.addEventListener("click", () =>
        deletePost(postElement, postId)
      )
    })

    console.log("✅ Усі кнопки додано!")
  }

  // Запускаємо вставку кнопок із затримкою (якщо `.article` ще не з'явилося)
  setTimeout(addAdminButtons, 500)
})

// Функція редагування поста
async function editPost(postElement, postId) {
  const descriptionElement = postElement.querySelector(".section-text")

  const textarea = document.createElement("textarea")
  textarea.value = descriptionElement.innerText
  textarea.classList.add("form-input")

  const saveBtn = document.createElement("button")
  saveBtn.textContent = "💾 Зберегти"
  saveBtn.classList.add("save-btn")

  descriptionElement.replaceWith(textarea)
  const editBtn = postElement.querySelector(".edit-btn")
  editBtn.replaceWith(saveBtn)

  saveBtn.addEventListener("click", async () => {
    const updatedText = textarea.value

    const response = await fetch("update_post.php", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id: postId, description: updatedText})
    })

    if (response.ok) {
      descriptionElement.innerHTML = updatedText.replace(/\n/g, "<br>")
      textarea.replaceWith(descriptionElement)
      saveBtn.replaceWith(editBtn)
    } else {
      alert("❌ Помилка оновлення поста.")
    }
  })
}

// Функція видалення поста
async function deletePost(postElement, postId) {
  if (!confirm("⚠️ Ви впевнені, що хочете видалити цей пост?")) {
    return
  }

  const response = await fetch("delete_post.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({id: postId})
  })

  if (response.ok) {
    postElement.remove()
  } else {
    alert("❌ Помилка видалення поста.")
  }
}
