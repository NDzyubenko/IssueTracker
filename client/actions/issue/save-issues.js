import { SAVE_ISSUES } from './types';

export const saveIssues = issues => ({
  type: SAVE_ISSUES,
  payload: issues,
});
