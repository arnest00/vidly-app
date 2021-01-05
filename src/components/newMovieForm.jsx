import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { movies, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

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
    // To be added to list of movies
    console.log(this.state.data);
  };

  render() {
    const options = getGenres().map(genre => (
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