// mendapatkan parameter dari URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// breadcrumb
const category = getQueryParam("category");
if (category) {
  document.getElementById("breadcrumb-category").textContent = category;
  document.getElementById("category-title").textContent = `Meals in ${category}`;
}

// mengambil dan menampilkan data berdasarkan kategori
async function getMealsByCategory() {
  if (!category) {
    document.getElementById("category-detaiks").innerHTML = "Category not found!";
    return;
  }

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const meals = response.data.meals;
    // console.log(meals);

    const mealsContainer = document.getElementById("category-details");

    meals.forEach((meal) => {
      const mealElement = document.createElement("div");
      mealElement.innerHTML = `
              <div class="relative inline-block w-52 h-28">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-48 h-28 m-auto rounded-lg">
                  <p class="absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-50 rounded-lg text-sm hover:text-xl hover:cursor-pointer duration-200">${meal.strMeal}</p>
              </div>
            `;
      mealsContainer.appendChild(mealElement);
    });

    // redirect ke halaman baru
    categoryElement.addEventListener("click", () => {
      window.location.href = `mealsDetail.html?category=${category.strMeal}`;
    });
  } catch (error) {
    console.error(error);
  }
}

getMealsByCategory();
