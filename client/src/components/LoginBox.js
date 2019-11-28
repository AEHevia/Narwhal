import React, { Component } from "react";
import axios from "axios";
import logo from "../images/logo.jpg";

class LoginBox extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  showValidationErr = (elm, msg) => {
    this.setState(prevState => ({
      errors: [...prevState.errors, { elm, msg }]
    }));
  };

  clearValidationErr = elm => {
    this.setState(prevState => {
      let newArr = [];

      for (let err of prevState.errors) {
        if (elm != err.elm) {
          newArr.push(err);
        }
      }

      return { errors: newArr };
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.clearValidationErr(e.target.name);
  };

  submitLogin = e => {
    let loginSuccess = true;

    if (this.state.email == "") {
      this.showValidationErr("email", "Please enter your email.");
      loginSuccess = false;
    }
    if (this.state.password == "") {
      this.showValidationErr("password", "Please enter your password.");
      loginSuccess = false;
    }

    if (loginSuccess) {
      const userInfo = {
        email: this.state.email,
        password: this.state.password
      };

      axios.post("api/user/login", userInfo).then(res => {
        if (res.data.success) {
          this.props.handleLogin(res.data.userID);
        } else {
          alert("Login failed.");
        }
      });
    }
  };

  render() {
    let emailErr = null,
      passwordErr = null;

    for (let err of this.state.errors) {
      if (err.elm == "email") {
        emailErr = err.msg;
      }
      if (err.elm == "password") {
        passwordErr = err.msg;
      }
    }

    return (
      <div className="inner-container">
        <img src={logo} className="logo-img" alt="logo"></img>

        <div className="header">Login</div>

        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={this.onChange}
            />
            <small className="danger-error">{emailErr ? emailErr : ""}</small>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onChange}
            />
            <small className="danger-error">
              {passwordErr ? passwordErr : ""}
            </small>
          </div>

          <button
            type="submit"
            className="login-btn"
            onClick={this.submitLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default LoginBox;
