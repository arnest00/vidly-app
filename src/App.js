import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getMovies, deleteMovie } from './services/movieService';
import { getGenres } from './services/genreService';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Navbar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
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

  render() { 
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar />
        <main className='container'>
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' render={(props) => (
            <Movies
              movies={this.state.movies}
              genres={this.state.genres}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              currentGenre={this.state.currentGenre}
              sortColumn={this.state.sortColumn}
              searchQuery={this.state.searchQuery}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              onPageChange={this.handlePageChange}
              onListSelect={this.handleListSelect}
              onSearch={this.handleSearch}
            />
          )} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/not-found' component={NotFound} />
          <Redirect exact from='/' to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
        </main>
      </React.Fragment>
    );
  };
};
 
export default App;