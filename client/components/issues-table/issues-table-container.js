import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { IssuesTable } from './issues-table.jsx';
import { saveEditedId } from '../../actions';

const mapDispatchToProps = {
  saveEditedId,
  push,
};

export const IssuesTableContainer = connect(
  null,
  mapDispatchToProps,
)(IssuesTable);
