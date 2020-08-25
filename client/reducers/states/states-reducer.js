import * as types from '../../actions/state';

const initialState = [];

export const statesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_STATES:
      return action.payload;
    default:
      return state;
  }
}