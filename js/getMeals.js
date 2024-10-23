async function getFoodsByCategories() {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = response.data.categories;

    const categoriesContainer = document.getElementById("categories");

    data.forEach((category) => {
      const categoryElement = document.createElement("div");
      categoryElement.innerHTML = `
        <div class="relative inline-block w-52 h-28">
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-48 h-28 m-auto rounded-lg hover:w-52 duration-200">
            <p class="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50 rounded-lg hover:text-2xl hover:cursor-pointer duration-200">
              ${category.strCategory}
            </p>
        </div>
      `;

      // redirect ke halaman baru
      categoryElement.addEventListener("click", () => {
        window.location.href = `categoryDetail.html?category=${category.strCategory}`;
      });

      categoriesContainer.appendChild(categoryElement);
    });
  } catch (error) {
    console.error(error);
  }
}

getFoodsByCategories();
