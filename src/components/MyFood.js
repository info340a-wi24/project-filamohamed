import React, { useState } from 'react';
import foodData from '../data/foods.json' // Import food data JSON

const MyFood = () => {
  const [searchRestaurant, setSearchRestaurant] = useState('');
  const [searchMeal, setSearchMeal] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [addedFoods, setAddedFoods] = useState([]);
  const handleSearch = () => {
    const restaurant = searchRestaurant.trim();
    const meal = searchMeal.trim();

    if (restaurant && meal) {
      const foundFood = foodData.find(item =>
        item.restaurant.toLowerCase() === restaurant.toLowerCase() &&
        item.foodItems.some(food => food.foodName.toLowerCase() === meal.toLowerCase())
      );

      if (foundFood) {
        const mealItem = foundFood.foodItems.find(food =>
          food.foodName.toLowerCase() === meal.toLowerCase()
        );

        if (mealItem) {
          setSelectedMeal(mealItem);
          setSearchRestaurant('');
          setSearchMeal('');
        }
      } else {
        alert('Food not found.');
      }
    } else {
      alert('Please enter both restaurant and meal.');
    }
  };

  const handleAddFood = () => {
    if (selectedMeal) {
      setAddedFoods([...addedFoods, selectedMeal]);
      setSelectedMeal(null);
    }
  };

  return (
    <main>
      <section className="food-intro">
        <h1>Log your meals.</h1>
        <label htmlFor="restaurant">Restaurant</label>
        <input
          type="text"
          id="restaurant"
          value={searchRestaurant}
          onChange={e => setSearchRestaurant(e.target.value)}
        />
        <label htmlFor="food-name">Meal</label>
        <input
          type="text"
          id="food-name"
          value={searchMeal}
          onChange={e => setSearchMeal(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>
      <section className="column">
        <h2>Add Foods</h2>
        <div className="food-list">
          {selectedMeal && (
            <div className="each-food">
              <p>{selectedMeal.foodName} - Calories: {selectedMeal.calories}</p>
              <button onClick={handleAddFood}>Add</button>
            </div>
          )}
        </div>
      </section>
      <section>
        <h2>Added Foods</h2>
        <div className="added-list">
          {addedFoods.map((food, index) => (
            <p key={index}>{food.foodName} - Calories: {food.calories}</p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MyFood;