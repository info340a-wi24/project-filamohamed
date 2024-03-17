import { useState, useEffect } from 'react';
function MyDay() {
  const [calorieGoal, setCalorieGoal] = useState('');
  const [bmiResult, setBmiResult] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const savedCalorieGoal = localStorage.getItem('calorieGoal');
    const savedBmiResult = localStorage.getItem('bmiResult');
    if (savedCalorieGoal) setCalorieGoal(savedCalorieGoal);
    if (savedBmiResult) setBmiResult(savedBmiResult);
  }, []);

  useEffect(() => {
    localStorage.setItem('calorieGoal', calorieGoal);
    localStorage.setItem('bmiResult', bmiResult);
  }, [calorieGoal, bmiResult]);

  const calculateCalorie = (calorieIntake, exercise) => {
    // Example calculation: Calorie Goal = Calorie Intake - Exercise
    return calorieIntake - exercise;
  };

  const calculateBMI = (height, weight) => {
    // Example calculation: BMI = Weight (kg) / (Height (m) * Height (m))
    const heightInMeters = height / 100; // Convert height from cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const handleCalorieSubmit = (e) => {
    e.preventDefault();
    // Example: Get values from form input fields
    const calorieIntake = parseInt(document.getElementById('calories').value, 10);
    const exercise = parseInt(document.getElementById('exercise').value, 10);
    const result = calculateCalorie(calorieIntake, exercise);
    setCalorieGoal(result);
  };

  const handleBMISubmit = (e) => {
    e.preventDefault();
    // Example: Get values from form input fields
    const heightValue = parseInt(document.getElementById('height').value, 10);
    const weightValue = parseInt(document.getElementById('weight').value, 10);
    const result = calculateBMI(heightValue, weightValue);
    setBmiResult(result);
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
              Calorie Goal: {calorieGoal}
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
      <footer>
        {/* Footer content goes here */}
      </footer>
    </>
  );
}

export default MyDay;