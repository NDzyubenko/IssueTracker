import React, { Component } from 'react';
import './styles.scss';
import { PropTypes } from 'prop-types';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

export class Login extends Component {
  static get propTypes() {
    return {
      loginUser: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  saveEmail(e) {
    this.setState({ email: e.target.value });
  }

  savePassword(e) {
    this.setState({ password: e.target.value });
  }

  onLoginClick() {
    const {
      email,
      password,
    } = this.state;

    this.props.loginUser(email, password);
  }

  render() {
    const {
      email,
      password,
    } = this.state;

    return (
<div class="login">
	<h1>Login</h1>
    <form method="post">
      <input type="text" name="u" placeholder="Email" required="required" type="email" value={email}
      onChange={this.saveEmail}/>
        <input type="password" name="p" placeholder="Password" required="required" type="password"
        value={password}
        onChange={this.savePassword}/>
        <Button onClick={this.onLoginClick}>Login</Button>
        <a href="/register">Register</a>
    </form>
</div>
    );
  }
}