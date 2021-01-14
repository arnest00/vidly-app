import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
            <Route path='/movies' component={Movies} />
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