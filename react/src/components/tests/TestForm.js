import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import QuestionList from "../questions/QuestionList";

const TestForm = ({
  test,
  questions,
  onSave,
  onChange,
  onAddQuestion,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{test.id ? "Edit" : "Add"} Test</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        type="text"
        value={test.name || ""}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="introText"
        label="Intro text"
        type="text"
        value={test.introText || ""}
        onChange={onChange}
        error={errors.introText}
      />
      <TextInput
        name="maxDuration"
        label="Max Duration"
        type="number"
        value={test.maxDuration || ""}
        onChange={onChange}
        error={errors.maxDuration}
      />

      <QuestionList
        questions={questions}
        test={test}
        onClick={onAddQuestion}
        operationType="ADD"
        testQuestions={
          test["questionIds"] !== undefined ? test["questionIds"] : []
        }
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

TestForm.propTypes = {
  test: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired,
};

export default TestForm;
