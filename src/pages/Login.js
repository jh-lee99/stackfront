import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/user_actions";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    ID: "",
    PW: "",
    error: "",
  };

  displayError = (error) => <p>{error}</p>;

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      ID: this.state.ID,
      PW: this.state.PW,
    };

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });

      this.props.onFormSubmit(dataToSubmit).then((response) => {
        if (response.payload.loginSuccess) {
          this.props.history.push("/");
        } else {
          this.setState({
            error: "Failed to login, check your ID and PW",
          });
        }
      });
    } else {
      console.error("Form is not valid");
    }
  };

  isFormValid = ({ ID, PW }) => {
    const form = document.getElementsByTagName("form")[0];

    if (!form.checkValidity()) {
      this.setState({ error: "ID is invalid" });
    } else if (!ID || !PW) {
      this.setState({ error: "Form is not valid" });
    } else {
      return true;
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{ maxWidth: "300px", maxHeight: "300px" }}
      >
        <h2> Login </h2>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="ID"
                  value={this.state.ID}
                  onChange={(e) => this.handleChange(e)}
                  id="ID"
                  type="text"
                  className="validate"
                />
                <label htmlFor="">ID</label>
                <span
                  className="helper-text"
                  data-error="Type a right type ID"
                  data-success="right"
                />
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label htmlFor="ID">Password</label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>

            {this.state.error.length > 0 && (
              <div>{this.displayError(this.state.error)}</div>
            )}

            <div className="row">
              <div className="col 12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={this.submitForm}
                >
                  Login
                </button>
              </div>

              <div className="col 6">
                <Link to="/register">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFormSubmit: (dataToSubmit) => dispatch(loginUser(dataToSubmit)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
