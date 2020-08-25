import { RSAA } from 'redux-api-middleware';

import { saveUsers } from './save-users';
import * as types from './types';
import * as endpoints from '../../constants';

export const getUsers = () => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: endpoints.GET_USERS_URL,
      method: 'GET',
      types: [
        types.GET_USERS_REQUEST,
        {
          type: types.GET_USERS_SUCCESS,
          payload: (_, __, res) => {
            res.json()
              .then(data => {
                dispatch(saveUsers(data));
              });
          }
        },
        types.GET_USERS_FAIL,
      ],
    },
  });
};
