import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';

  function MyDay() {
    const [calorieGoal, setCalorieGoal] = useState('');
    const [bmiResult, setBmiResult] = useState('');

    useEffect(() => {
      const db = getDatabase();
      const calorieRef = ref(db, 'userData/calorieGoal');
      const bmiRef = ref(db, 'userData/bmiResult');

      const fetchCalorieGoal = () => {
        onValue(calorieRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setCalorieGoal(data);
          }
        });
      };

      const fetchBMIResult = () => {
        onValue(bmiRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setBmiResult(data);
          }
        });
      };

      fetchCalorieGoal();
      fetchBMIResult();

    }, []);

  const calculateCalorie = (calorieIntake, exercise) => {
    return calorieIntake - exercise;
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const handleCalorieSubmit = async (e) => {
    e.preventDefault();
    const calorieIntake = parseInt(document.getElementById('calories').value, 10);
    const exercise = parseInt(document.getElementById('exercise').value, 10);
    const result = calculateCalorie(calorieIntake, exercise);
    setCalorieGoal(result);

    const db = getDatabase();
    await set(ref(db, 'userData/calorieGoal'), result);
  };

  const handleBMISubmit = async (e) => {
    e.preventDefault();
    const heightValue = parseInt(document.getElementById('height').value, 10);
    const weightValue = parseInt(document.getElementById('weight').value, 10);
    const result = calculateBMI(heightValue, weightValue);
    setBmiResult(result);

    const db = getDatabase();
    await set(ref(db, 'userData/bmiResult'), result);
  };

  return (
    <>
      <main>
        <section className='intro-user'>
          <h1> Welcome User</h1>
          <p> Please log in your daily calorie goal and the details to calculate your BMI. Thank you.</p>
        </section>
        <div className="container">
          <section>
            <h2>Calorie Goal</h2>
            <form id="calorieForm" onSubmit={handleCalorieSubmit}>
              <label htmlFor="calories">Enter your calorie intake:</label>
              <input type="number" id="calories" name="calories" required />
              <label htmlFor="exercise">Enter your exercise:</label>
              <input type="number" id="exercise" name="exercise" required />
              <button type="submit">Submit</button>
            </form>
          </section>
          <section className='my-chart'>
            <h2>Calorie Display and BMI</h2>
            <div id="calorieDisplay">
              Calorie Updated: {calorieGoal}
            </div>
            <div id="bmiDisplay">
              BMI Result: {bmiResult}
            </div>
          </section>
          <section>
            <h2>BMI Calculator</h2>
            <form id="bmiForm" onSubmit={handleBMISubmit}>
              <label htmlFor="height">Height (cm):</label>
              <input type="number" id="height" name="height" required />
              <label htmlFor="weight">Weight (kg):</label>
              <input type="number" id="weight" name="weight" required />
              <button type="submit">Calculate BMI</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

export default MyDay;