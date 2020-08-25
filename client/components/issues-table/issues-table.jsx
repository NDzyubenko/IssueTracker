import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Table } from 'react-bootstrap';

import { IssueRow } from '../../components';
import { EDIT_ISSUE_ROUTE } from '../../constants';

export class IssuesTable extends Component {
  static get propTypes() {
    return {
      issues: PropTypes.array,
      onHeaderColumnClick: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      issues: [],
      onHeaderColumnClick: () => {},
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      orderByCol: '',
      sortType: 'asc',
    };

    this.setOrderByParam = this.setOrderByParam.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  setOrderByParam(col) {
    return () => {
      const {
        orderByCol,
        sortType,
      } = this.state;

      const orderParams = {
        orderByCol,
        sortType,
      };

      if (orderByCol === col) {
        orderParams.sortType = sortType === 'asc' ? 'desc' : 'asc';
        this.setState(orderParams);
      } else {
        orderParams.orderByCol = col;
        orderParams.sortType = 'asc';
        this.setState(orderParams);
      }

      this.props.onHeaderColumnClick(orderParams);
    }
  }

  onRowClick(id) {
    const {
      saveEditedId,
      push,
    } = this.props;

    saveEditedId(id);
    push(EDIT_ISSUE_ROUTE);
  }

  render() {
    const {
      issues,
      push,
      onHeaderColumnClick,
    } = this.props;

    return (
      <Table responsive bordered>
        <thead>
          <tr>
            <th onClick={this.setOrderByParam('type')}>Type</th>
            <th onClick={this.setOrderByParam('title')}>Title</th>
            <th onClick={this.setOrderByParam('description')}>Description</th>
            <th onClick={this.setOrderByParam('assignedTo')}>Assigned to</th>
            <th onClick={this.setOrderByParam('createdBy')}>Created by</th>
            <th onClick={this.setOrderByParam('state')}>State</th>
            <th onClick={this.setOrderByParam('createdOn')}>Created on</th>
          </tr>
        </thead>
        <tbody>
          {
            issues.map((issue) => {
              return (
                <IssueRow
                  {...issue}
                  onRowClick={this.onRowClick}
                />
              );
            })
          }
        </tbody>
      </Table>
    );
  }
}
