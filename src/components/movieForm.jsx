import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as moviesAPI from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate')
  };

  componentDidMount() {
    const genres = genresAPI.getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = moviesAPI.getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found'); // replace instead of push so user is not stuck when pressing back

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  doSubmit = () => {
    moviesAPI.saveMovie(this.state.data);

    this.props.history.push('/movies');
  };

  render() { 
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  };
};
 
export default MovieForm;