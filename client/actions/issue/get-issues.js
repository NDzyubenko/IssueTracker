import { RSAA } from 'redux-api-middleware';

import { saveIssues } from './save-issues';
import * as types from './types';
import * as constants from '../../constants';

export const getIssues = (orderByParameter, assignedToMe = false) => (dispatch) => {
  dispatch({
    [RSAA]: {
      endpoint: assignedToMe ?
        constants.GET_MY_ISSUES_URL(orderByParameter)
        :
        constants.GET_ALL_ISSUES_URL(orderByParameter),
      method: 'GET',
      types: [
        types.GET_ISSUES_REQUEST,
        {
          type: types.GET_ISSUES_SUCCESS,
          payload: (_, __, res) => {
            res.json()
              .then((data) => {
                dispatch(saveIssues(data));
              });
          }
        },
        types.GET_ISSUES_FAIL,
      ],
    },
  });
};
