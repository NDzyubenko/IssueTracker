import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import {
  Header,
  IssuesTableContainer,
} from '../../components';

export class Issues extends Component {
  static get propTypes() {
    return {
      issues: PropTypes.array,
      users: PropTypes.array,
      getIssues: PropTypes.func.isRequired,
      getUsers: PropTypes.func.isRequired,
      myIssues: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      issues: [],
      users: [],
      myIssues: false,
    };
  }

  constructor(props) {
    super(props);

    this.getIssuesWithSorting = this.getIssuesWithSorting.bind(this);
  }

  getIssuesWithSorting(orderParams) {
    const {
      getIssues,
      myIssues,
    } = this.props;

    const {
      orderByCol,
      sortType,
    } = orderParams;

    const sortQuery = `${orderByCol}=${sortType}`;
    getIssues(sortQuery, myIssues);
  }
  
  componentDidMount() {
    const {
      getIssues,
      getUsers,
      myIssues,
    } = this.props;

    getIssues('', myIssues);
    getUsers();
  }

  render() {
    const { issues } = this.props;

    return (
      <div className="issues-page">
        <Header />
        <IssuesTableContainer
          issues={issues}
          onHeaderColumnClick={this.getIssuesWithSorting}
        />
      </div>
    );
  }
}
