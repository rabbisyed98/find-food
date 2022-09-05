const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    fetch(url) // fetching the data from the API
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = "";
  meals.forEach((meals) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div onclick = "loadMealDetail(${meals.idMeal})" class="card">
              <img src="${meals.strMealThumb}" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title">${meals.strMeal}</h5>
                <p class="card-text">${meals.strInstructions.slice(0, 200)}</p>
              </div>
        </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
  hideSpinner();
};

const searchFood = (keyword) => {
  showSpinner();
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadMeals(searchText);
  searchField.value = "";
};

const loadMealDetail = (idMeal) => {
  showSpinner()
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
    document.getElementById("meal-details").classList.remove("d-none");
};

const displayMealDetails = (meal) => {
  const detailContainer = document.getElementById("meal-detail-container");
  detailContainer.innerHTML = "";
  const mealDiv = document.createElement("div");
  mealDiv.classList.add("card");
  mealDiv.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="">
  <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions} </p>

  </div>
  `;
  detailContainer.appendChild(mealDiv);
hideSpinner();
};

function showSpinner() {
  document.getElementById('spinner').classList.remove('d-none');
}

function hideSpinner() {
  document.getElementById('spinner').classList.add('d-none');
}

