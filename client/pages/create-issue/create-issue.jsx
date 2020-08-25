import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
} from 'react-bootstrap';

export class CreateIssue extends Component {
    static get propTypes() {
        return {
            getUsers: PropTypes.func.isRequired,
            getTypes: PropTypes.func.isRequired,
            createIssue: PropTypes.func.isRequired,
            users: PropTypes.array,
            types: PropTypes.array,
        };
    }

    static get defaultProps() {
        return {
            users: [],
            types: [],
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            issue: {
                title: '',
                description: '',
                assignedTo: {},
                type: {},
            },
        };

        this.submitIssueHandler = this.submitIssueHandler.bind(this);
    }

    componentDidMount() {
        const {
            getUsers,
            getTypes,
        } = this.props;

        getUsers();
        getTypes();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.types !== nextProps.types) {
            this.setState({
                issue: {
                    ...this.state.issue,
                    type: nextProps.types[0].typeName,
                },
            });
        }
        if (this.props.users !== nextProps.users) {
            this.setState({
                issue: {
                    ...this.state.issue,
                    assignedTo: nextProps.users[0].id,
                },
            });
        }
    }

    submitIssueHandler() {
        const {
            issue,
        } = this.state;

        this.props.createIssue(issue);
    }

    render() {
        const {
            issue,
        } = this.state;
        const {
            createIssue,
            types,
            users,
        } = this.props;


        return (
            <form>
                <FormGroup
                    controlId="title"
                >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type="text"
                        value={issue.title}
                        placeholder="Task title"
                        onChange={(e) => {
                            const { value } = e.target;
                            const changedIssue = {
                                ...issue,
                                title: value,
                            };
                            this.setState({ issue: changedIssue });
                        }}
                    />
                </FormGroup>
                <FormGroup
                    controlId="description"
                >
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        type="text"
                        value={issue.description}
                        placeholder="Task description"
                        onChange={(e) => {
                            const { value } = e.target;
                            const changedIssue = {
                                ...issue,
                                description: value,
                            };
                            this.setState({ issue: changedIssue });
                        }}
                    />
                </FormGroup>
                <FormGroup
                    controlId="type"
                >
                    <ControlLabel>Type</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => {
                            const value = e.target.value;
                            const changedIssue = {
                                ...issue,
                                type: value,
                            };
                            this.setState({ issue: changedIssue });
                        }}
                    >
                    {
                        types.map((type) => {
                            return (
                                <option value={type.typeName}>{type.typeName}</option>
                            );
                        })
                    }
                    </FormControl>
                </FormGroup>
                <FormGroup
                    controlId="assignedTo"
                >
                    <ControlLabel>Assigned to</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => {
                            const value = e.target.value;
                            const changedIssue = {
                                ...issue,
                                assignedTo: value,
                            };
                            this.setState({ issue: changedIssue });
                        }}
                    >
                    {
                        users.map((user) => {
                            return (
                                <option value={user.id}>{user.name}</option>
                            );
                        })
                    }
                    </FormControl>
                </FormGroup>
                <Button
                    onClick={this.submitIssueHandler} href="/issues">Create</Button>
            </form>
        );
    }
}
