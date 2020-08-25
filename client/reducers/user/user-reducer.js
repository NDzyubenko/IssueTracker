import * as types from '../../actions/user';

const initialState = {
  all: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USERS:
      return {
        ...state,
        all: action.payload,
      };
    default:
      return state;
  }
}
