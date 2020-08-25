import { RSAA } from 'redux-api-middleware';

import * as types from './types';
import * as endpoints from '../../constants';

export const createIssue = issue => (dispatch) => {
    dispatch({
        [RSAA]: {
            endpoint: endpoints.CREATE_ISSUE,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(issue),
            types: [
                types.CREATE_ISSUE_REQUEST,
                types.CREATE_ISSUE_SUCCESS,
                types.CREATE_ISSUE_FAIL,
            ],
        },
    });
};
