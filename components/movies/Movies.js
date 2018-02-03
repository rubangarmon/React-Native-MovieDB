import React, {Component} from 'react';
import Shows from '../base/Shows';
import { connect } from 'react-redux';
import { fetchingMovies, movieFetched } from '../../Actions';

import style from '../../styles/styles';

class Movies extends Shows {
  constructor(props) {
    super(props);
    this.carouselCategory = "nowShowing";
  }

  /**
   * @overrides
   */
  componentDidMount() {
    // calls base class functions
    this.fetch('nowShowing', '/movie/now_playing');
    this.fetch('comingSoon', '/movie/upcoming');
    this.fetch('popular', '/movie/popular');
  }

  /**
   * @overrides
   */
  showDetails(movie) {
    // dispatch()
    this.props.navigation.navigate('MovieDetails', {item: movie});
  }

  /**
   * @overrides
   */
  showAll(category) {
    this.props.navigation.navigate('AllMovies', {category: category});
  }
}

const mapStateToProps = state => ({
  ...state.movies,
  config: state.configuration,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  onFetching: () => {
    dispatch(fetchingMovies());
  },
  onFetchCompleted: (category, movies) => {
    dispatch(movieFetched(category, movies));
  } 
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);