import React, { Component } from "react";
import SearchParams from "./components/SearchParams";
import LoginManager from "./components/LoginManager";

class App extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    sessionID: ""
  };

  doLogIn = (userID, sessionID) => {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
      userID: userID,
      sessionID: sessionID
    }));
  };

  doLogOut = () => {
    this.setState({
      isLoggedIn: false,
      userID: "",
      sessionID: ""
    });
  };

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <SearchParams
            handleLogout={this.doLogOut}
            userID={this.state.userID}
          />
        </div>
      );
    } else {
      return (
        <div>
          <LoginManager
            handleLogin={this.doLogIn}
            handleLogout={this.doLogOut}
          />
        </div>
      );
    }
  }
}

export default App;
