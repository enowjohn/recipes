import React, { useState, useEffect } from 'react';

const RecipeList = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMeals();
  }, [searchTerm]);

  const handleMealClick = (meal) => {
    setSelectedMeal({ ...meal, showIngredients: true });
  };

  const handleCloseDialog = () => {
    setSelectedMeal(null);
  };

  const toggleFavorite = (meal) => {
    const updatedFavorites = favorites.includes(meal)
      ? favorites.filter((fav) => fav.idMeal !== meal.idMeal)
      : [...favorites, meal];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addIngredient = (ingredient) => {
    setSelectedMeal({ ...selectedMeal, ingredients: [...selectedMeal.ingredients, ingredient] });
  };

  return (
    <>
      <div className='container'>
        <input
          type='search'
          placeholder='Enter your meal'
          className='Search-bar'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className='meals'>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className='img-sec'
                onClick={() => handleMealClick(meal)}
              />
              <h3 className='headings'>{meal.strMeal}</h3>
              <button className='addbtn' onClick={() => toggleFavorite(meal)}>
                {favorites.find((fav) => fav.idMeal === meal.idMeal)
                  ? 'Unfavorite'
                  : 'Favorite'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedMeal && (
        <div className='dialog'>
          <div className='dialog-content'>
            <h2>{selectedMeal.strMeal}</h2>
            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className='dialog-img' />
            {selectedMeal.showIngredients ? (
              <>
                <h3>Ingredients:</h3>
                <ul>
                  {Array.from(Array(20).keys()).map((num) => {
                    const ingredientKey = `strIngredient${num + 1}`;
                    const measureKey = `strMeasure${num + 1}`;
                    if (selectedMeal[ingredientKey]) {
                      return (
                        <li key={ingredientKey}>
                          {selectedMeal[ingredientKey]} - {selectedMeal[measureKey]}
                          <button onClick={() => addIngredient(selectedMeal[ingredientKey])}>
                            Add
                          </button>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              </>
            ) : (
              <p>{selectedMeal.strInstructions}</p>
            )}
            <button onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeList;