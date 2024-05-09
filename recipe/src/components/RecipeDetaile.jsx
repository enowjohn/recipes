import React from 'react';
import PropTypes from 'prop-types';
const MealDailog = ({ meal, onClose }) => {

  const [showIngredients, setShowIngredients] = React.useState(false);
const toggleIngredients = () => {
  setShowIngredients(prevShow => !prevShow);
};

const addIngredient = (ingredient) => {
  setMealIngredients(prevIngredients => [...prevIngredients, ingredient]);
};

  return (
    <div className='dialog'>
      <div className='dialog-content'>
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} className='dialog-img'  />
        <h3>Ingredients:</h3>
        <ul>
        {Array.from(Array(20).keys()).map(num => {
  const ingredientKey = `strIngredient${num + 1}`;
  const measureKey = `strMeasure${num + 1}`;
  if (meal[ingredientKey]) {
    return (
      <li key={ingredientKey}>
        {meal[ingredientKey]} - {meal[measureKey]}
      </li>
    );
  }
  return null;
})}

{showIngredients && (
  <div>
    <h3>Ingredients:</h3>
    <ul>
      {Array.from(Array(20).keys()).map(num => {
        const ingredientKey = `strIngredient${num + 1}`;
        const measureKey = `strMeasure${num + 1}`;
        if (meal[ingredientKey]) {
          return (
            <li key={ingredientKey}>
              {meal[ingredientKey]} - {meal[measureKey]}
            </li>
          );
        }
        return null;
      })}
    </ul>
  </div>
)}
        </ul>
        <p>{meal.strInstructions}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

MealDailog.propTypes = {
  meal: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default MealDailog;



