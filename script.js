const foodForm = document.getElementById('food-form');
const foodList = document.getElementById('food-list');
const totalCalories = document.getElementById('total-calories');
const resetBtn = document.getElementById('reset-btn');

let foods = JSON.parse(localStorage.getItem('foods')) || [];

function renderFoods() {
  foodList.innerHTML = '';
  let total = 500;

  foods.forEach((food, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between bg-gray-50 p-2 rounded shadow';

    li.innerHTML = `
      <span>${food.name} - ${food.calories} cal</span>
      <button data-index="${index}" class="text-red-600 remove-btn">Remove</button>
    `;

    total += food.calories;
    foodList.appendChild(li);
  });

  totalCalories.textContent = total;
  localStorage.setItem('foods', JSON.stringify(foods));
}

foodForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('food-name').value.trim();
  const calories = parseInt(document.getElementById('calories').value);

  if (name && calories) {
    foods.push({ name, calories });
    renderFoods();
    foodForm.reset();
  }
});

foodList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    foods.splice(index, 1);
    renderFoods();
  }
});

resetBtn.addEventListener('click', () => {
  if (confirm('Reset all data?')) {
    foods = [];
    renderFoods();
  }
});

document.addEventListener('DOMContentLoaded', renderFoods);
