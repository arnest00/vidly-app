import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../services/authService';
import Table from './common/table';
import LikeBtn from './common/likeBtn';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'Like',
      content: movie => <LikeBtn onClick={() => this.props.onLike(movie)} liked={movie.liked} />
    }
  ];

  deleteColumn = {
    key: 'Delete',
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className='btn btn-danger btn-sm'
        id={movie._id}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin)
      this.columns.push(this.deleteColumn);
  };

  render() { 
    const { movies, sortColumn, onSort, user } = this.props;

    return (
      <Table 
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  };
};

export default MoviesTable;