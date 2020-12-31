import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class NewMovieForm extends Form {
  state = {
    data: {
      title: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    errors: {}
  };

  schema = {
    title: Joi.string().required().label('Title'),
    numberInStock: Joi.number().integer().min(0).max(100).required().label('Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
  };

  doSubmit = () => {
    // To be added to list of movies
    console.log("Movie added!");
  };

  render() { 
    return (
      <div class='container'>
        <h1>Add a New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          
          {/* select menu for genre here */}

          {this.renderInput('numberInStock', 'Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  };
};
 
export default NewMovieForm;