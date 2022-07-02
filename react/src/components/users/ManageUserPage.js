import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
import UserForm from "./UserForm";
import { toast } from "react-toastify";

function ManageUserPage({ users, loadUsers, saveUser, history, ...props }) {
  const [user, setUser] = useState({ ...props.user });
  /* const [errors, setErrors] = useState({});
   const [saving, setSaving] = useState(false); */

  useEffect(() => {
    if (users.length === 0) {
      loadUsers().catch((error) => {
        alert("Loading users failed" + error);
      });
    } else {
      setUser({ ...props.user });
    }
  }, [props.user]);

  function handleChange(event) {
    let { name, value } = event.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: value,
      };
    });
  }

  /* function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  } */

  function handleSave(event) {
    event.preventDefault();
    /* if (!formIsValid()) return; 
    setSaving(true); */
    saveUser(user).then(() => {
      toast.success("user saved.");
      history.push("/users");
    });
  }

  return (
    <UserForm
      user={user}
      errors={{}}
      onChange={handleChange}
      onSave={handleSave}
      saving={false}
    />
  );
}

ManageUserPage.propTypes = {
  user: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getUserById(users, id) {
  return users.find((user) => user.id === parseInt(id)) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const user = id && state.users.length > 0 ? getUserById(state.users, id) : {};

  return {
    user,
    users: state.users,
  };
}

const mapDispatchToProps = {
  loadUsers,
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);
