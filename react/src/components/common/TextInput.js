import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  name,
  label,
  type,
  onChange,
  placeholder,
  value,
  error,
  className,
  dataAttr,
}) => {
  let wrapperClass = className || "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="field">
        <input
          data-key={dataAttr}
          type={type}
          name={name}
          className={className ? "" : "form-control"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  className: PropTypes.string,
  dataAttr: PropTypes.number,
};

export default TextInput;
