import { RSAA } from 'redux-api-middleware';

import * as types from './types';
import * as endpoints from '../../constants';

export const registerUser = user => (dispatch) => {
    dispatch({
        [RSAA]: {
            endpoint: endpoints.REGISTER_URL,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            types: [
                types.REGISTER_USER_REQUEST,
                types.REGISTER_USER_SUCCESS,
                types.REGISTER_USER_FAIL,
            ],
        },
    });
};
