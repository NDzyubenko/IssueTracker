import { SAVE_STATES } from './types';

export const saveStates = states => ({
  type: SAVE_STATES,
  payload: states,
});
