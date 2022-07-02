import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const UserForm = ({ user, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{user.id ? "Edit" : "Add"} User</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="firstName"
        label="First Name"
        type="text"
        value={user.firstName || ""}
        onChange={onChange}
        error={errors.firstName}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        type="text"
        value={user.lastName || ""}
        onChange={onChange}
        error={errors.lastName}
      />
      <TextInput
        name="username"
        label="Username"
        type="text"
        value={user.username || ""}
        onChange={onChange}
        error={errors.username}
      />
      <TextInput
        name="email"
        label="Email"
        type="text"
        value={user.email || ""}
        onChange={onChange}
        error={errors.email}
      />
      <TextInput
        name="password"
        label="Password"
        type="password"
        value={user.password || ""}
        onChange={onChange}
        error={errors.password}
      />
      <TextInput
        name="isAdmin"
        label="Is Admin"
        type="checkbox"
        value={user.isAdmin === 1 ? true : false}
        onChange={onChange}
        className="col-md-1 "
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UserForm;
