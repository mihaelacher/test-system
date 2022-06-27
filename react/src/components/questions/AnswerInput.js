import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AnswerInput = ({
  question,
  counter,
  value,
  isChecked,
  onChange,
  onDelete,
  error,
}) => {
  let wrapperClass = "form-group col-md-12";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }
  // TODO: create style object

  return (
    <>
      <div className={wrapperClass} key={counter} id={counter}>
        <input
          data-key={counter}
          type={question.questionTypeId == 2 ? "radio" : "checkbox"} // TODO: currently not working, state not passed to child component, no solution for now
          name="isCorrect"
          className="col-md-1 mt-3"
          onChange={onChange}
          checked={isChecked}
        />

        <div className="col-md-7 mt-3" style={{ display: "inline-block" }}>
          <TextInput
            dataAttr={counter}
            name="answer"
            type="text"
            value={value || ""}
            onChange={onChange}
          />
        </div>
        <button
          className="mt-5 btn-danger"
          disabled={counter < 2}
          type="button"
          onClick={onDelete}
          data-key={counter}
        >
          -
        </button>
      </div>
    </>
  );
};

AnswerInput.propTypes = {
  question: PropTypes.object.isRequired,
  counter: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  isChecked: PropTypes.bool.isRequired,
};

export default AnswerInput;
