import * as types from "./actionTypes";
import * as testApi from "../../api/testApi";

export function loadTestsSuccess(tests) {
  return { type: types.LOAD_TESTS_SUCCESS, tests };
}

export function createTestSuccess(test) {
  return { type: types.CREATE_TEST_SUCCESS, test };
}

export function updateTestSuccess(test) {
  return { type: types.UPDATE_TEST_SUCCESS, test };
}

export function deleteTestOptimistic(test) {
  return { type: types.DELETE_TEST_OPTIMISTIC, test };
}

export function loadTests() {
  return function (dispatch) {
    return testApi.getTests().then((questions) => {
      dispatch(loadTestsSuccess(questions));
    });
  };
}

export function saveTest(test) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return testApi.saveTest(test).then((savedTest) => {
      test.id
        ? dispatch(updateTestSuccess(savedTest))
        : dispatch(createTestSuccess(savedTest));
    });
  };
}

export function deleteTest(test) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteTestOptimistic(test));
    return testApi.deleteTest(test.id);
  };
}
