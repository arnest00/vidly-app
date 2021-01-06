import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as moviesAPI from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {}
  };

  componentDidMount() {
    const movie = moviesAPI.getMovie(this.props.match.params.id);
    const { title, genre, numberInStock, dailyRentalRate } = movie;
    
    this.setState({
      data: {
        title: title,
        genre: genre,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
      }
    })
  };

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.any().invalid('').required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
  };

  doSubmit = () => {
    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    
    const movie = {
      title,
      genre,
      numberInStock,
      dailyRentalRate
    };

    if (moviesAPI.getMovie(this.props.match.params.id))
      movie._id = moviesAPI.getMovie(this.props.match.params.id)._id;

    moviesAPI.saveMovie(movie);

    this.props.history.push('/movies');
  };

  render() { 
    const options = genresAPI.getGenres().map(genre => (
      {
        label: genre.name,
        value: genre.name
      }
    ));

    return (
      <div>
        <h1>Edit {this.state.data.title}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', options, this.state.data.genre.name)}
          {this.renderInput('numberInStock', 'Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  };
};
 
export default MovieForm;