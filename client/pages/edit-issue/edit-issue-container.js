import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { EditIssue } from './edit-issue.jsx';
import { selectEditedIssue } from './select-edited-issue';
import {
  getTypes,
  getStates,
  getUsers,
  editIssue,
} from '../../actions';

const mapStateToProps = state => ({
  issue: selectEditedIssue(state),
  types: state.types,
  states: state.states,
  users: state.users.all,
});

const mapDispatchToProps = {
  getStates,
  getTypes,
  getUsers,
  editIssue,
};

export const EditIssueContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditIssue));
