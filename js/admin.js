document.addEventListener("DOMContentLoaded", () => {


  const urlParams = new URLSearchParams(window.location.search)
  const isAdmin = urlParams.get("admin") === "secretcode123"

  if (!isAdmin) {
    return
  }

  function addAdminButtons() {
    document.querySelectorAll(".article").forEach((postElement, index) => {
      let postId = postElement.getAttribute("data-id") || `temp-${index + 1}`;

      if (
          postElement.querySelector(".edit-btn") ||
          postElement.querySelector(".delete-btn")
      ) {
        return;
      }

      const editLink = document.createElement("a");
      editLink.textContent = "✍🏻"
      editLink.classList.add("edit-btn");
      editLink.href = `https://altummare.com.ua/blog-post-editor.html?key=mySecretKey123123123&id=${postId}`;
      editLink.style.cssText =
          "display: inline-block; margin: 10px; padding: 5px 10px; border: 1px solid #4CAF50; background-color: #ffff; color: white; text-decoration: none; cursor: pointer;";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "🚮"
      deleteButton.classList.add("delete-btn");
      deleteButton.style.cssText =
          "margin: 10px; padding: 5px 10px; border: 1px solid #ff0000; background-color: #fff; color: black; cursor: pointer;";

   
      const controlsContainer = document.createElement("div");
      controlsContainer.classList.add("admin-controls");
      controlsContainer.appendChild(editLink);
      controlsContainer.appendChild(deleteButton);

      postElement.appendChild(controlsContainer);

      deleteButton.addEventListener("click", () => deletePost(postElement, postId));
    });
  }

  setTimeout(addAdminButtons, 500);
});

// async function editPost(postElement, postId) {

//   let titleElement = postElement.querySelector(".blog-title")
//   let descriptionElement = postElement.querySelector(".section-text")
//   let categoryElement = postElement.querySelector(".blog-category")
//   let linksElement = postElement.querySelector(".blog-links")

//   if (!titleElement) {
//     titleElement = document.createElement("h2")
//     titleElement.classList.add("blog-title")
//     titleElement.innerText = "Без назви"
//     postElement.prepend(titleElement)
//   }

//   if (!descriptionElement) {
//     descriptionElement = document.createElement("p")
//     descriptionElement.classList.add("section-text")
//     descriptionElement.innerText = "Опис відсутній"
//     postElement.appendChild(descriptionElement)
//   }

//   if (!categoryElement) {
//     categoryElement = document.createElement("span")
//     categoryElement.classList.add("blog-category")
//     categoryElement.innerText = "Невідома категорія"
//     postElement.appendChild(categoryElement)
//   }

//   if (!linksElement) {
//     linksElement = document.createElement("p")
//     linksElement.classList.add("blog-links")
//     linksElement.innerText = ""
//     postElement.appendChild(linksElement)
//   }
 
//   const form = document.createElement("form")
//   form.classList.add("form-generator")

//   form.innerHTML = `
//     <label for="category-${postId}" class="title">Обрати розділ:</label>
//     <select id="category-${postId}" name="category">
//       <option value="dreams-blog" ${
//         categoryElement.innerText === "Сновидіння" ? "selected" : ""
//       }>Сновидіння</option>
//       <option value="art-blog" ${
//         categoryElement.innerText === "Образи в мистецтві" ? "selected" : ""
//       }>Образи в мистецтві</option>
//       <option value="body-blog" ${
//         categoryElement.innerText === "Тіло як провідник" ? "selected" : ""
//       }>Тіло як провідник</option>
//       <option value="astro-blog" ${
//         categoryElement.innerText === "Астро-Навігація" ? "selected" : ""
//       }>Астро-Навігація</option>
//       <option value="reading-blog" ${
//         categoryElement.innerText === "Читальня" ? "selected" : ""
//       }>Читальня</option>
//     </select>

//     <label for="title-${postId}" class="title">Назва:</label>
//     <input type="text" id="title-${postId}" name="title" required class="form-input" value="${
//     titleElement.innerText
//   }" />

//     <label for="description-${postId}" class="title">Текст посту:</label>
//     <textarea id="description-${postId}" name="description" required class="form-input">${
//     descriptionElement.innerText
//   }</textarea>

//     <label for="links-${postId}" class="title">Посилання (через кому):</label>
//     <input type="text" id="links-${postId}" name="links" class="form-input" value="${
//     linksElement ? linksElement.innerText : ""
//   }" />

//     <button type="submit" class="submit-btn">💾 Зберегти</button>
//   `

//   // Замінюємо старий контент на форму
//   postElement.innerHTML = ""
//   postElement.appendChild(form)

//   // Обробка сабміту форми
//   form.addEventListener("submit", async (event) => {
//     event.preventDefault()

//     const updatedCategory = form.querySelector(`#category-${postId}`).value
//     const updatedTitle = form.querySelector(`#title-${postId}`).value
//     const updatedDescription = form.querySelector(
//       `#description-${postId}`
//     ).value
//     const updatedLinks = form.querySelector(`#links-${postId}`).value

//     try {
//       const response = await fetch(
//         `http://altummare.com.ua/api.php?id=${postId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           },
//           body: new URLSearchParams({
//             CategoryId: updatedCategory,
//             Title: updatedTitle,
//             Description: updatedDescription,
//             Links: updatedLinks
//           })
//         }
//       )

//       const result = await response.json()
//       console.log("✅ Update Response:", result)

//       if (response.ok) {
//         // Повертаємо оновлений контент назад у пост
//         postElement.innerHTML = `
//           <h2 class="blog-title">${updatedTitle}</h2>
//           <p class="section-text">${updatedDescription.replace(
//             /\n/g,
//             "<br>"
//           )}</p>
//           <span class="blog-category">${updatedCategory}</span>
//           ${updatedLinks ? `<p class="blog-links">${updatedLinks}</p>` : ""}
//           <button class="edit-btn">✏️ Редагувати</button>
//           <button class="delete-btn">❌ Видалити</button>
//         `

//         // Додаємо події на нові кнопки
//         postElement
//           .querySelector(".edit-btn")
//           .addEventListener("click", () => editPost(postElement, postId))
//         postElement
//           .querySelector(".delete-btn")
//           .addEventListener("click", () => deletePost(postElement, postId))
//       } else {
//         alert("❌ Помилка оновлення поста.")
//       }
//     } catch (error) {
//       console.error("❌ Error updating post:", error)
//       alert("❌ Помилка оновлення поста.")
//     }
//   })
// }



// Функція видалення поста через API
async function deletePost(postElement, postId) {
  if (!confirm("⚠️ Ви впевнені, що хочете видалити цей пост?")) {
    return;
  }

  try {
    const response = await fetch(`https://altummare.com.ua/api.php?id=${postId}`, {
      method: "DELETE" // API очікує DELETE дію через GET-запит
    });

    const result = await response.json();
    console.log("✅ Delete Response:", result);

    if (response.ok) {
      postElement.remove();
    } else {
      alert("❌ Помилка видалення поста.");
    }
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    alert("❌ Помилка видалення поста.");
  }
}
