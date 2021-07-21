import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/header';
import { getSearchBarResponse } from '../action/index';
import DoneRecipes from '../components/DoneRecipes';

class ReceitasFeitas extends Component {
  componentDidMount() {
    const { hasSearchBar } = this.props;

    hasSearchBar(false);
  }

  render() {
    const { location, history } = this.props;

    return (
      <div>
        <Header location={ location } />
        <DoneRecipes history={ history } />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  hasSearchBar: (e) => dispatch(getSearchBarResponse(e)),
});

ReceitasFeitas.propTypes = {
  hasSearchBar: PropTypes.func.isRequired,
  location: PropTypes.shape,
}.isRequired;

export default connect(null, mapDispatchToProps)(ReceitasFeitas);
