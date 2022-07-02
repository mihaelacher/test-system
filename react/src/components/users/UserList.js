import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users, onDeleteClick }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Admin</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={"/user/" + user.id}>
                  {user.firstName + " " + user.lastName}
                </Link>
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin === 1 ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default UserList;
