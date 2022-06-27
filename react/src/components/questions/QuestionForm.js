import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import AnswerForm from "../questions/AnswerForm";

const QuestionForm = ({
  question,
  questionTypes,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{question.id ? "Edit" : "Add"} Question</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="text"
        label="text"
        type="text"
        value={question.text || ""}
        onChange={onChange}
        error={errors.text}
      />
      <TextInput
        name="instruction"
        label="instruction"
        type="text"
        value={question.instruction || ""}
        onChange={onChange}
        error={errors.instruction}
      />
      <TextInput
        name="points"
        label="points"
        type="number"
        value={question.points || ""}
        onChange={onChange}
        error={errors.points}
      />
      <SelectInput
        name="questionTypeId"
        label="Question Type"
        value={parseInt(question.questionTypeId) || ""}
        defaultOption="Select Question Type"
        options={questionTypes.map((questionType) => ({
          value: questionType.id,
          text: questionType.name,
        }))}
        onChange={onChange}
        error={errors.questionTypeId}
      />

      <AnswerForm question={question} onChange={onChange} />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

QuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  questionTypes: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuestionForm;
