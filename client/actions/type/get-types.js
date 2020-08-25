import { RSAA } from 'redux-api-middleware';

import { saveTypes } from './save-types';
import * as types from './types';
import * as endpoints from '../../constants';

export const getTypes = () => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: endpoints.GET_TYPES_URL,
      method: 'GET',
      types: [
        types.GET_TYPES_REQUEST,
        {
          type: types.GET_TYPES_SUCCESS,
          payload: (_, __, res) => {
            res.json()
              .then(data => {
                dispatch(saveTypes(data));
              });
          },
        },
        types.GET_TYPES_FAIL,
      ],
    },
  });
}
