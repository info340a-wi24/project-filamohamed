import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';
import foodData from '../data/foods.json';

const MyFood = () => {
  const [searchRestaurant, setSearchRestaurant] = useState('');
  const [searchMeal, setSearchMeal] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [addedFoods, setAddedFoods] = useState([]);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [addedCalories, setAddedCalorie] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const calorieGoalRef = ref(db, 'userData/calorieGoal');

    const fetchCalorieGoal = async () => {
      const snapshot = await get(calorieGoalRef);
      if (snapshot.exists()) {
        setCalorieGoal(snapshot.val());
      } else {
        console.log('No data available');
      }
    };

    fetchCalorieGoal();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const addedFoodsRef = ref(db, 'userData/addedFoods');

    const fetchAddedFoods = async () => {
      const snapshot = await get(addedFoodsRef);
      if (snapshot.exists()) {
        setAddedFoods(snapshot.val());
      } else {
        console.log('No added foods available');
      }
    };

    fetchAddedFoods();
  }, []);

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

  const handleAddFood = async () => {
    if (selectedMeal) {
      const db = getDatabase();
      const addedFoodsRef = ref(db, 'userData/addedFoods');
      const calorieGoalRef = ref(db, 'userData/calorieGoal');

      const updatedAddedFoods = [...addedFoods, selectedMeal];
      const updatedCalorieGoal = calorieGoal - selectedMeal.calories;

      await set(addedFoodsRef, updatedAddedFoods);
      await set(calorieGoalRef, updatedCalorieGoal);

      setAddedFoods(updatedAddedFoods);
      setCalorieGoal(updatedCalorieGoal);
      setAddedCalorie(addedCalories + selectedMeal.calories);
      setSelectedMeal(null);
    }
  };

  const handleReset = async () => {
    const db = getDatabase();
    const addedFoodsRef = ref(db, 'userData/addedFoods');
    const addedCalorieRef = ref(db, 'userData/addedCalorie');
    const calorieGoalRef = ref(db, 'userData/calorieGoal');

    await set(addedFoodsRef, []);
    await set(addedCalorieRef, 0);
    await set(calorieGoalRef, 0);

    setAddedFoods([]);
    setCalorieGoal(0);
    setAddedCalorie(0);
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

      <div className="reset-button-container">
      <button onClick={handleReset}>Reset</button>
       </div>

    </main>
  );
};

export default MyFood;