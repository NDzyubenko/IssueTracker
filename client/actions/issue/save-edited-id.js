import { SAVE_EDITED_ID } from './types';

export const saveEditedId = id => ({
  type: SAVE_EDITED_ID,
  payload: id,
});
