import { RSAA } from 'redux-api-middleware';

import { saveStates } from './save-states';
import * as types from './types';
import * as endpoints from '../../constants';

export const getStates = () => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: endpoints.GET_STATES_URL,
      method: 'GET',
      types: [
        types.GET_STATES_REQUEST,
        {
          type: types.GET_STATES_SUCCESS,
          payload: (_, __, res) => {
            res.json()
              .then(data => {
                dispatch(saveStates(data));
              });
          },
        },
        types.GET_STATES_FAIL,
      ],
    },
  });
}
