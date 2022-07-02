import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}

export function updateUserSuccess(user) {
  return { type: types.UPDATE_USER_SUCCESS, user };
}

export function deleteUserOptimistic(user) {
  return { type: types.DELETE_USER_OPTIMISTIC, user };
}

export function loadUsers() {
  return function (dispatch) {
    return userApi.getUsers().then((users) => {
      dispatch(loadUsersSuccess(users));
    });
  };
}

export function saveUser(user) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    return userApi.saveUser(user).then((savedUser) => {
      user.id
        ? dispatch(updateUserSuccess(savedUser))
        : dispatch(createUserSuccess(savedUser));
    });
  };
}

export function deleteUser(user) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteUserOptimistic(user));
    return userApi.deleteUser(user.id);
  };
}
