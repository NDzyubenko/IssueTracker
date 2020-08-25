import React, { Component } from 'react';
import { withProps } from 'recompose';
import { Route } from 'react-router-dom';

import * as pages from './pages';
import * as routes from './constants';

const MyIssuesContainer = withProps({ myIssues: true })(pages.IssuesContainer);
import './styles.scss';
import './app.styles.sass';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={routes.LOGIN_ROUTE} component={pages.LoginContainer} />
        <Route path={routes.ISSUES_ROUTE} component={pages.IssuesContainer} />
        <Route path={routes.MY_ISSUES_ROUTE} component={MyIssuesContainer} />
        <Route path={routes.EDIT_ISSUE_ROUTE} component={pages.EditIssueContainer} />
        <Route path={routes.REGISTER_ROUTE} component={pages.RegisterContainer} />
        <Route path={routes.CREATE_ISSUE_ROUTE} component={pages.CreateIssueContainer} />
      </div>
    );
  }
};
