export const LOGIN_URL = 'http://localhost:5000/v1/auth';
export const REGISTER_URL = 'http://localhost:5000/v1/user/register';
export const GET_ALL_ISSUES_URL = (orderBy) => `http://localhost:5000/v1/issue${orderBy ? `/?${orderBy}` : ''}`;
export const GET_MY_ISSUES_URL = (orderBy) => `http://localhost:5000/v1/issue/assignedToMe${orderBy ? `/?${orderBy}` : ''}`;
export const GET_ISSUE_URL = id => `http://localhost:5000/v1/issue/${id}`;
export const GET_USERS_URL = 'http://localhost:5000/v1/user';
export const GET_STATES_URL = 'http://localhost:5000/v1/state';
export const GET_TYPES_URL = 'http://localhost:5000/v1/type';
const urlByField = {
  'type': 'changeType',
  'title': 'changeTitle',
  'description': 'changeDescription',
  'state': 'changeState',
  'assignedTo': 'changeAssignee',
};
export const PATCH_ISSUE_URL = (field) => {
  const urlPart = urlByField[field];
  return `http://localhost:5000/v1/issue/${urlPart}`;
}
export const CREATE_ISSUE = 'http://localhost:5000/v1/issue';
