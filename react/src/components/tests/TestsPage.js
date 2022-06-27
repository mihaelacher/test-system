import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import * as testActions from "../../redux/actions/testActions";
import TestList from "./TestList";

class TestsPage extends React.Component {
  state = {
    redirectToAddTestPage: false,
  };

  componentDidMount() {
    const { tests, actions } = this.props;
    debugger;
    if (tests.length === 0) {
      actions.loadTests().catch((error) => {
        alert("Loading tests failed" + error);
      });
    }
  }

  handleDeleteTest = async (test) => {
    toast.success("Test deleted");
    try {
      await this.props.actions.deleteTest(test);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddTestPage && <Redirect to="/question" />}
        <h2>Tests</h2>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-question"
          onClick={() => this.setState({ redirectToAddTestPage: true })}
        >
          Add Question
        </button>

        <TestList
          onDeleteClick={this.handleDeleteTest}
          tests={this.props.tests}
        />
      </>
    );
  }
}

TestsPage.propTypes = {
  tests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tests: state.tests,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadTests: bindActionCreators(testActions.loadTests, dispatch),
      deleteTest: bindActionCreators(testActions.deleteTest, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsPage);
