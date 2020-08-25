import { UPDATE_ISSUE } from './types';

export const updateIssue = issue => ({
  type: UPDATE_ISSUE,
  payload: issue,
});
