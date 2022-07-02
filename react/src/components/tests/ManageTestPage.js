import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadTests, saveTest } from "../../redux/actions/testActions";
import PropTypes from "prop-types";
import TestForm from "./TestForm";
import { toast } from "react-toastify";
import { loadQuestions } from "../../redux/actions/questionActions";

function ManageTestPage({
  tests,
  questions,
  loadTests,
  saveTest,
  loadQuestions,
  history,
  ...props
}) {
  const [test, setTest] = useState({ ...props.test });
  /* const [errors, setErrors] = useState({});
   const [saving, setSaving] = useState(false); */

  useEffect(() => {
    if (tests.length === 0) {
      loadTests().catch((error) => {
        alert("Loading tests failed" + error);
      });
    } else {
      setTest({ ...props.test });
    }

    if (questions.length === 0) {
      loadQuestions().catch((error) => {
        alert("Loading questions failed" + error);
      });
    }
  }, [props.test]);

  function handleChange(event) {
    let { name, value } = event.target;
    setTest((prevTest) => {
      return {
        ...prevTest,
        [name]: value,
      };
    });
  }

  function handleAddQuestionClick(questionId) {
    setTest((prevTest) => {
      let result = prevTest["questionIds"];

      if (result === undefined) {
        result = [];
      }

      if (!result.includes(questionId)) {
        result.push(questionId);
      } else {
        let index = result.indexOf(questionId);
        if (index !== -1) {
          result.splice(index, 1);
        }
      }

      return {
        ...prevTest,
        questionIds: result,
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
    saveTest(test).then(() => {
      toast.success("Test saved.");
      history.push("/tests");
    });
  }

  return (
    <TestForm
      test={test}
      questions={questions}
      errors={{}}
      onChange={handleChange}
      onAddQuestion={handleAddQuestionClick}
      onSave={handleSave}
      saving={false}
    />
  );
}

ManageTestPage.propTypes = {
  test: PropTypes.object.isRequired,
  tests: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
  loadTests: PropTypes.func.isRequired,
  saveTest: PropTypes.func.isRequired,
  loadQuestions: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getTestById(tests, id) {
  return tests.find((test) => test.id === parseInt(id)) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const test = id && state.tests.length > 0 ? getTestById(state.tests, id) : {};

  return {
    test,
    tests: state.tests,
    questions: state.questions,
  };
}

const mapDispatchToProps = {
  loadTests,
  saveTest,
  loadQuestions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTestPage);
