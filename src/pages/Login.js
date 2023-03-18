import React, { Component } from "react";

class Login extends Component {
  state = {
    ID: "",
    PW: "",
    errors: [],
  };

  render() {
    return (
      <div className="container">
        <h2> Login </h2>
        <div className="row">
          <form
            className="col s12"
            onSubmit={(event) => this.submitForm(EventSource)}
          >
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
