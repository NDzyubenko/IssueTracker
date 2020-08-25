import { RSAA } from 'redux-api-middleware';
import { push } from 'react-router-redux';

import * as types from './types';
import * as constants from '../../constants';

export const loginUser = (email, password) => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: constants.LOGIN_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      types: [
        types.LOGIN_REQUEST,
        {
          type: types.LOGIN_SUCCESS,
          payload: (_, __, res) => {
            res.json()
              .then((data) => {
                sessionStorage.setItem('token', JSON.stringify(data));
                dispatch(push(constants.ISSUES_ROUTE));
              });
          },
        },
        types.LOGIN_FAIL,
      ],
    },
  });
}
