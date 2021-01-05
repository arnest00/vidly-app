import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as moviesAPI from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class NewMovieForm extends Form {
  state = {
    data: {
      title: '',
      genre: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {}
  };

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
  };

  doSubmit = () => {
    const { title, genre, numberInStock, dailyRentalRate } = this.state.data;
    const newMovie = {
      title,
      genre,
      numberInStock,
      dailyRentalRate
    };
    moviesAPI.saveMovie(newMovie);

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
      <div className='container'>
        <h1>Add a New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genre', 'Genre', options)}
          {this.renderInput('numberInStock', 'Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  };
};
 
export default NewMovieForm;