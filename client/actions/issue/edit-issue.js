import { RSAA } from 'redux-api-middleware';

import { updateIssue } from './update-issue';
import * as types from './types';
import * as endpoints from '../../constants';

export const editIssue = (field, id, value) => (dispatch, getState) => {
  dispatch({
    [RSAA]: {
      endpoint: endpoints.PATCH_ISSUE_URL(field),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        value,
      }),
      types: [
        types.EDIT_ISSUE_REQUEST,
        types.EDIT_ISSUE_SUCCESS,
        types.EDIT_ISSUE_FAIL,
      ],
    },
  });
};
