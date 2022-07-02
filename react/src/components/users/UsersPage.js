import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as userActions from "../../redux/actions/userActions";
import UserList from "./UserList";

class UsersPage extends React.Component {
  state = {
    redirectToAdduserPage: false,
  };

  componentDidMount() {
    const { users, actions } = this.props;
    if (users.length === 0) {
      actions.loadUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    }
  }

  handleDeleteUser = async (user) => {
    toast.success("User deleted");
    try {
      await this.props.actions.deleteUser(user);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAdduserPage && <Redirect to="/user" />}
        <h2>Users</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-question"
          onClick={() => this.setState({ redirectToAdduserPage: true })}
        >
          Add User
        </button>

        <UserList
          onDeleteClick={this.handleDeleteUser}
          users={this.props.users}
        />
      </>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch),
      deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
