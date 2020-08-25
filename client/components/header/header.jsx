import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import * as routes from '../../constants';

export class Header extends Component {

  render() {
    return (
      <Nav bsStyle="pills">
        <NavItem href={routes.ISSUES_ROUTE}>
          Issues
        </NavItem>
        <NavItem href={routes.MY_ISSUES_ROUTE}>
          My Issues
        </NavItem>
        <NavItem href={routes.CREATE_ISSUE_ROUTE}>
          Create issue
        </NavItem>
        <NavItem href={routes.LOGIN_ROUTE}>
          Login
        </NavItem>
      </Nav>
    );
  }
}
