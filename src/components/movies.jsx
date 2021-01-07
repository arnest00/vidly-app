import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './common/searchBox';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
  getPagedData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.props;

    let filteredMovies = movies;
    if (searchQuery)
      filteredMovies = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())  
      );
    else if (currentGenre && currentGenre._id)
      filteredMovies = movies.filter(m => m.genre._id === currentGenre._id);
    
    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const displayedMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount : filteredMovies.length, data: displayedMovies };
  };

  render() {
    const {
      genres,
      pageSize,
      currentPage,
      currentGenre,
      sortColumn,
      searchQuery,
      onLike,
      onDelete,
      onSort,
      onPageChange,
      onListSelect,
      onSearch
    } = this.props;

    const { totalCount, data: displayedMovies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            listItems={genres}
            currentList={currentGenre}
            onListSelect={onListSelect}
          />
        </div>
        <div className='col'>
          <Link to='/movies/new'>
            <button
              type="button" 
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </button>
          </Link>
          <p className='m-2'>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={searchQuery}
            onChange={onSearch}
          />
          <MoviesTable 
            movies={displayedMovies}
            sortColumn={sortColumn}
            onLike={onLike}
            onDelete={onDelete}
            onSort={onSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    );
  };
};
 
export default Movies;