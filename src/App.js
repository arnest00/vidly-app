import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getMovies } from './services/fakeMovieService';
import { getGenres } from './services/fakeGenreService';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import Navbar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';

class App extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
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
    this.setState({ currentGenre: list, currentPage: 1 });
  };

  render() { 
    return (
      <React.Fragment>
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
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              onPageChange={this.handlePageChange}
              onListSelect={this.handleListSelect}
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