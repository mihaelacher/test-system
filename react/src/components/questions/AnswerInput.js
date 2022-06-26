import React from "react";
import PropTypes from "prop-types";

const AnswerInput = ({ questionType, onChange, error }) => {
  let wrapperClass = "form-group col-md-12";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <input type={questionType} name="answer" className="col-md-1 mt-3" />
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="col-md-7 mt-3">
        <input className="form-control" type="text" onChange={onChange} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

AnswerInput.propTypes = {
  questionType: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AnswerInput;
