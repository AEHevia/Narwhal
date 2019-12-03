import React, { Component } from "react";
import NavBar from "./NavBar";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import "../sass/_loginSty.scss";

class LoginManager extends Component {
  state = {
    isLoginOpen: true,
    isRegisterOpen: false
  };

  showLoginBox = () => {
    this.setState({
      isLoginOpen: true,
      isRegisterOpen: false
    });
  };

  showRegisterBox = () => {
    this.setState({
      isLoginOpen: false,
      isRegisterOpen: true
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={false}
          handleLogout={this.props.handleLogout}
          favorites={[]}
        />
        <div className="root-container">
          <div className="login-container">
            <div className="box-controller">
              <div
                className={
                  "controller selected-controller-" +
                  (this.state.isLoginOpen ? "login" : "")
                }
                onClick={this.showLoginBox}
                style={textStyle}
              >
                Login
              </div>

              <div
                className={
                  "controller selected-controller-" +
                  (this.state.isRegisterOpen ? "register" : "")
                }
                onClick={this.showRegisterBox}
                style={textStyle}
              >
                Register
              </div>
            </div>

            <div className="box-container">
              {this.state.isLoginOpen && (
                <LoginBox handleLogin={this.props.handleLogin} />
              )}
              {this.state.isRegisterOpen && <RegisterBox />}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const textStyle = {
  fontSize: "17px"
};

export default LoginManager;
