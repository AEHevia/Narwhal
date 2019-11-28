import React, { Component } from "react";
import SearchParams from "./components/SearchParams";
import NavBar from "./components/NavBar";
import LoginManager from "./components/LoginManager";
// import "./sass/index.scss";

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

  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <NavBar isLoggedIn={this.state.isLoggedIn} />
          <SearchParams />
        </div>
      );
    } else {
      return (
        <div>
          <NavBar isLoggedIn={this.state.isLoggedIn} />
          <LoginManager handleLogin={this.doLogIn} />
        </div>
      );
    }
  }
}

export default App;
