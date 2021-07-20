import React from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';

class DoneRecipes extends React.Component {
  constructor() {
    super();
    this.state = {
      allRecipes: [],
      doneRecipes: [],
      copyLink: false,
    };
    this.getDoneRecipes = this.getDoneRecipes.bind(this);
    this.onClickShare = this.onClickShare.bind(this);
  }

  componentDidMount() {
    this.getDoneRecipes();
  }

  onClickShare(link) {
    const startLink = window.location.href;
    const split = startLink.split('/r');
    console.log(split);
    copy(`${split[0]}${link}`);
    this.setState({
      copyLink: true,
    });
  }

  getDoneRecipes() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      return this.setState({
        allRecipes: doneRecipes,
        doneRecipes,
      });
    }
    return null;
  }

  renderDoneRecipes() {
    const { doneRecipes, copyLink } = this.state;
    return doneRecipes.map((recipe, index) => {
      const link = `/${recipe.type}s/${recipe.id}`;
      const recipeInfo = `${recipe.area} - ${recipe.category}`;
      return (
        <section key={ recipe.id }>
          <Link to={ link }>
            <div className="container-img-favorite">
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                className="img-favorite"
              />
            </div>
          </Link>
          <p className="text-recipe" data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'comida' ? recipeInfo : recipe.alcoholicOrNot }
          </p>
          <Link className="link-favorite" to={ link }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p
            className="date-done"
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </p>
          <p className="link-copy">{ copyLink ? 'Link copiado!' : null }</p>
          <div className="container-share-favorite">
            <button
              type="button"
              onClick={ () => this.onClickShare(link) }
              className="share-btn"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="Compartilhar"
              />
            </button>
          </div>
          {recipe.tags.map((tag, twoTag) => {
            if (twoTag > 2 || tag === null) {
              return null;
            }
            return (
              <div
                className="tag-done"
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </div>
            );
          })}
        </section>
      );
    });
  }

  renderFilterDoneRecipe(type) {
    const { allRecipes } = this.state;
    const filter = allRecipes.filter((recipe) => recipe.type === type);
    this.setState({
      doneRecipes: filter,
    });
  }

  render() {
    return (
      <section>
        <Header title="Receitas Feitas" />
        <div className="container-btn">
          <button
            data-testid="filter-by-all-btn"
            type="button"
            onClick={ this.getDoneRecipes }
            className="main-btn"
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            type="button"
            onClick={ () => this.renderFilterDoneRecipe('comida') }
            className="main-btn"
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => this.renderFilterDoneRecipe('bebida') }
            className="main-btn"
          >
            Drinks
          </button>
        </div>
        {this.renderDoneRecipes()}
      </section>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
