import * as types from '../../actions/issue/types';

const initialState = {
  all: [],
};

export const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ISSUES:
      return {
        ...state,
        all: action.payload,
      };
    case types.SAVE_EDITED_ID:
      return {
        ...state,
        editedId: action.payload,
      };
    default:
      return state;
  }
};
