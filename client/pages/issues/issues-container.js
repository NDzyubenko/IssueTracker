import { connect } from 'react-redux';

import { Issues } from './issues.jsx';
import {
  getIssues,
  getUsers,
} from '../../actions';
import { formatIssues } from './format-issues';

const mapStateToProps = state => ({
  issues: formatIssues(state),
  users: state.users.all,
});

const mapDispatchToProps = {
  getIssues,
  getUsers,
};

export const IssuesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Issues);
