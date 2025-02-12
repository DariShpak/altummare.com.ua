document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const isAdmin = urlParams.get("admin") === "A7f3K9dX2pQ5Z1mB"

  if (!isAdmin) {
    return
  }

  function addAdminButtons() {
    document.querySelectorAll(".article").forEach((postElement, index) => {
      let postId = postElement.getAttribute("data-id") || `temp-${index + 1}`

      if (
        postElement.querySelector(".edit-btn") ||
        postElement.querySelector(".delete-btn")
      ) {
        return
      }

      const editLink = document.createElement("a")
      editLink.href = `https://altummare.com.ua/blog-post-editor.html?key=A7f3K9dX2pQ5Z1mB&id=${postId}`
      editLink.classList.add("edit-btn")
      editLink.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24" style="color:rgb(54, 55, 54);">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
`
      editLink.style.cssText = `
  display: inline-block; margin: 10px; cursor: pointer; text-decoration: none;
`

      const deleteButton = document.createElement("button")
      deleteButton.classList.add("delete-btn")
      deleteButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24" style="color: rgb(54, 55, 54);">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
`
      deleteButton.style.cssText = `
  background: none; border: none; cursor: pointer; margin: 10px;
`

      const controlsContainer = document.createElement("div")
      controlsContainer.classList.add("admin-controls")
      controlsContainer.appendChild(editLink)
      controlsContainer.appendChild(deleteButton)

      postElement.appendChild(controlsContainer)

      deleteButton.addEventListener("click", () =>
        deletePost(postElement, postId)
      )
    })
  }

  setTimeout(addAdminButtons, 500)
})

async function deletePost(postElement, postId) {
  if (!confirm("⚠️ Ви впевнені, що хочете видалити цей пост?")) {
    return
  }

  try {
    const response = await fetch(
      `https://altummare.com.ua/api.php?id=${postId}`,
      {
        method: "DELETE"
      }
    )

    const result = await response.json()

    if (response.ok) {
      postElement.remove()
    } else {
      alert("❌ Помилка видалення поста.")
    }
  } catch (error) {
    alert("❌ Помилка видалення поста.")
  }
}
