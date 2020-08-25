import { SAVE_TYPES } from './types';

export const saveTypes = types => ({
  type: SAVE_TYPES,
  payload: types,
});
