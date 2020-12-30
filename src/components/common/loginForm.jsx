import React from 'react';
import Joi from 'joi-browser';
import Form from './form';

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = () => {
    // Would normally call server here
    console.log("Logged in!");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Log In')}
        </form>
      </div>
    );
  }
}
 
export default LoginForm;