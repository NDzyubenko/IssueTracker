import { connect } from 'react-redux';

import { CreateIssue } from './create-issue.jsx';
import {
    getUsers,
    getTypes,
    createIssue,
} from '../../actions';

const mapStateToProps = state => ({
    users: state.users.all,
    types: state.types,
});

const mapDispatchToProps = {
    getUsers,
    getTypes,
    createIssue,
};

export const CreateIssueContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateIssue);
