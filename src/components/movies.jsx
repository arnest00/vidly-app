import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SearchBox from './common/searchBox';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    searchQuery: '',
    currentGenre: null,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: 'All Genres', _id: '' }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');

      this.setState({ movies: originalMovies });
    };
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({movies});
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleListSelect = list => {
    this.setState({ searchQuery: '', currentGenre: list, currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentGenre: null, currentPage: 1});
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      currentGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())  
      );
    else if (currentGenre && currentGenre._id)
      filteredMovies = allMovies.filter(m => m.genre._id === currentGenre._id);
    
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
      searchQuery
    } = this.state;
    const { user } = this.props;

    const { totalCount, data: displayedMovies } = this.getPagedData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            listItems={genres}
            currentList={currentGenre}
            onListSelect={this.handleListSelect}
          />
        </div>
        <div className='col'>
          { user && <Link to='/movies/new'>
            <button
              type="button" 
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </button>
          </Link> }
          <p className='m-2'>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable 
            movies={displayedMovies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  };
};
 
export default Movies;