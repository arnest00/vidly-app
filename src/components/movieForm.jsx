import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MovieForm extends Component {

  render() { 
    return (
      <div>
        <h1>Movie Form {this.props.match.params.id}</h1>
        <Link to='/movies'>
          <button
            type="button" 
            className="btn btn-primary"
          >
            Save
          </button>
        </Link>
      </div>
    );
  };
};
 
export default MovieForm;