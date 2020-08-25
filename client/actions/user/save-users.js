import { SAVE_USERS } from './types';

export const saveUsers = users => ({
  type: SAVE_USERS,
  payload: users,
});
