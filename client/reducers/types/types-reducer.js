import * as types from '../../actions/type';

const initialState = [];

export const typesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_TYPES:
      return action.payload;
    default:
      return state;
  }
}