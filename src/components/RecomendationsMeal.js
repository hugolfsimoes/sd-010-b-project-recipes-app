import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { requestMeal } from '../services/api';
import '../styles/global.css';

function RecomendationsMeal() {
  const [recomendationsMeal, setRecomendationsMeal] = useState([]);
  const numOfRecomendationsMeal = 6;
  const four = 4;
  const six = 6;

  useEffect(() => {
    const fetchRecomendationMeal = async () => {
      const response = await requestMeal();
      return setRecomendationsMeal(response.slice(0, numOfRecomendationsMeal));
    };
    fetchRecomendationMeal();
  }, []);

  return (
    <div>
      <Carousel fade interval={ null } controls className="carousel">
        <Carousel.Item>
          <div className="card-recomendations">
            {recomendationsMeal.slice(0, 2).map((meal, index) => (
              <Link to={ `/comidas/${meal.idMeal}` } key={ meal.strMeal }>
                <div
                  data-testid={ `${index}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card-container">
            {recomendationsMeal.slice(2, four).map((meal, index) => (
              <Link to={ `/comidas/${meal.idMeal}` } key={ meal.strMeal }>
                <div
                  data-testid={ `${index + 2}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index + 2}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <p
                    data-testid={ `${index + 2}-recomendation-title` }
                  >
                    {meal.strMeal}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="card-container">
            {recomendationsMeal.slice(four, six).map((meal, index) => (
              <Link to={ `/comidas/${meal.idMeal}` } key={ meal.strMeal }>
                <div
                  data-testid={ `${index + four}-recomendation-card` }
                  className="card"
                >
                  <img
                    data-testid={ `${index + four}-card-img` }
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                  />
                  <p data-testid={ `${index + four}-recomendation-title` }>
                    {meal.strMeal}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default RecomendationsMeal;
