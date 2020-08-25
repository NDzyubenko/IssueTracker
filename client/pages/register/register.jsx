import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';

export class Register extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
 
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveName = this.saveName.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.savePassword = this.savePassword.bind(this); 
  }

  saveName(e) {
    this.setState({ name: e.target.value });
  }

  saveEmail(e) {
    this.setState({ email: e.target.value });
  }

  savePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    const {
      name,
      email,
      password,
    } = this.state;
    const { registerUser } = this.props;

    const user = {
      name,
      email,
      password,
    };

    registerUser(user);
  }

  render() {
    const {
      name,
      email,
      password,
    } = this.state;

    return (
      <form>
        <FormGroup
          controlId="name"
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={name}
            placeholder="Enter your name"
            onChange={this.saveName}
          />
        </FormGroup>
        <FormGroup
          controlId="email"
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={this.saveEmail}
          />
        </FormGroup>
        <FormGroup
          controlId="password"
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={this.savePassword}
          />
        </FormGroup>
        <Button
          onClick={this.handleSubmit} href="/">Register</Button>
      </form>
    );
  }
}