import React from "react";


function MyFood() {
  return (
    <main>
      <section className="food-intro">
        <h1>Log your meals.</h1>
        <label htmlFor="restaurant">Restaurant</label>
        <input type="text" id="restaurant" />
        <label htmlFor="food-name">Meal</label>
        <input type="text" id="food-name" />
      </section>
      <section className="column">
        <h2>Add Foods</h2>
        <div className="food-list">
          <div className="each-food">
            <p>Food goes here</p>
            <button>Add</button>
          </div>
        </div>
      </section>
      <section>
        <h2>Added Foods</h2>
        <div className="added-list">
          <p>Added food</p>
        </div>
      </section>
    </main>
  );
}

export default MyFood;