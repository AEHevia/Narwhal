import React, { Component } from "react";
import NavBar from "./components/NavBar";
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
          <NavBar
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.doLogOut}
          />
          <SearchParams />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.doLogOut}
          />
          <LoginManager handleLogin={this.doLogIn} />
        </div>
      );
    }
  }
}

export default App;
