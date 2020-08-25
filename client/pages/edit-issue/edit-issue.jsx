import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';

export class EditIssue extends Component {
  static get propTypes() {
    return {
      issue: PropTypes.object,
      types: PropTypes.array,
      states: PropTypes.array,
      users: PropTypes.array,
      getTypes: PropTypes.func.isRequired,
      getStates: PropTypes.func.isRequired,
      getUsers: PropTypes.func.isRequired,
      editIssue: PropTypes.func.isRequired,          
    };
  }

  static get defaultProps() {
    return {
      issue: {},
      types: [],
      states: [],
      users: [],
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      issue: props.issue,
    };
  }

  componentDidMount() {
    const {
      types,
      states,
      users,
      getTypes,
      getStates,
      getUsers,
    } = this.props;

    if (!types.length) {
      getTypes();
    }
    if (!states.length) {
      getStates();
    }
    if (!users.length) {
      getUsers();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.issue !== nextProps.issue) {
      this.setState({ issue: nextProps.issue });
    }
  }

  render() {
    const {
      issue,
    } = this.state;

    const {
      types,
      states,
      users,
    } = this.props;

    return (
      <div className="edit-issue">
        <form>
          <FormGroup
            controlId="title"
          >
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={issue.title}
              placeholder="Enter title"
              onChange={(e) => {
                const value = e.target.value;
                const changedIssue = {
                  ...issue,
                  title: value,
                };
                this.setState({ issue: changedIssue });
              }}
            />
            <Button
              onClick={() => {
                const value = this.state.issue.title;
                this.props.editIssue('title', issue.id, value);
              }}
            >
              Save
            </Button>
          </FormGroup>
          <FormGroup
            controlId="description"
          >
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              value={issue.description}
              placeholder="Enter description"
              onChange={(e) => {
                const value = e.target.value;
                const changedIssue = {
                  ...issue,
                  description: value,
                };
                this.setState({ issue: changedIssue });
              }}
            />
            <Button
              onClick={() => {
                const value = this.state.issue.description;
                this.props.editIssue('description', issue.id, value);
              }}
            >
              Save
            </Button>
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
            <Button
              onClick={() => {
                const value = this.state.issue.type;
                this.props.editIssue('type', issue.id, value);
              }}
            >
              Save
            </Button>
          </FormGroup>
          <FormGroup
            controlId="state"
          >
            <ControlLabel>State</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={(e) => {
                const value = e.target.value;
                const changedIssue = {
                  ...issue,
                  state: value,
                };
                this.setState({ issue: changedIssue });
              }}
            >
              {
                states.map((state) => {
                  return (
                    <option value={state.stateName}>{state.stateName}</option>
                  );
                })
              }
            </FormControl>
            <Button
              onClick={() => {
                const value = this.state.issue.state;
                this.props.editIssue('state', issue.id, value);
              }}
            >
              Save
            </Button>
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
            <Button
              onClick={() => {
                const value = this.state.issue.assignedTo;
                this.props.editIssue('assignedTo', issue.id, value);
              }}
            >
              Save
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
