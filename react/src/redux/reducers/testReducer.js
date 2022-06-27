import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function testReducer(state = initialState.tests, action) {
  switch (action.type) {
    case types.CREATE_TEST_SUCCESS:
      return [...state, { ...action.test }];
    case types.UPDATE_TEST_SUCCESS:
      return state.map((test) =>
        parseInt(test.id) === parseInt(action.test.id) ? action.test : test
      );
    case types.DELETE_TEST_OPTIMISTIC:
      return state.filter((test) => test.id !== action.test.id);
    case types.LOAD_TESTS_SUCCESS:
      return action.tests;
    default:
      return state;
  }
}
