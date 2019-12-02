import React, { Component } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Animal from "./Animal";
import WarningMessage from "./WarningMessage";

class SearchParams extends Component {
  // First item is the string, second item is the updater function
  constructor(props) {
    super(props);
    let animalName = "";
    this.state = {
      success: false,
      name: "",
      summary: "",
      image: "",
      lifespan: "",
      located: "",
      scientificName: "",
      taxonomy: "",
      weight: "",
      facts: "",
      warningMessage: "",
      favorites: [],
      didTrack: false
    };
  }

  componentDidMount() {
    axios
      .post("/api/user/listfavorites", { userID: this.props.userID })
      .then(res => {
        this.setState({
          favorites: res.data
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();

    // get the data
    axios.get("/api/animals/" + this.animalName).then(res => {
      if (res.data.success) {
        console.log(res.data.animal[0].taxonomy);
        this.setState({
          name: res.data.animal[0].name,
          summary: res.data.animal[0].summary,
          image: res.data.animal[0].image,
          lifespan: res.data.animal[0].lifespan,
          scientificName: res.data.animal[0].scientificName,
          weight: res.data.animal[0].weight,
          facts: res.data.animal[0].facts,
          located: res.data.animal[0].located,
          taxonomy: res.data.animal[0].taxonomy,
          success: true
        });
      } else {
        this.setState({
          warningMessage: "This animal is not supported yet.",
          success: false
        });
      }
    });

    axios
      .post("/api/animals/track", {
        animalName: this.animalName,
        userID: this.props.userID
      })
      .then(res =>
        this.setState({
          didTrack: res.data.success
        })
      );
  };

  handleChange = event => {
    this.animalName = event.target.value;
  };

  doGetRandom = () => {
    axios.get("/api/animals/getRandom").then(res => {
      this.setState({
        name: res.data.name,
        summary: res.data.summary,
        image: res.data.image,
        lifespan: res.data.lifespan,
        scientificName: res.data.scientificName,
        weight: res.data.weight,
        facts: res.data.facts,
        located: res.data.located,
        taxonomy: res.data.taxonomy,
        success: true
      });
    });
  };

  clickFavorite = animalName => {
    // alert(animalName);
    axios.get("/api/animals/" + animalName).then(res => {
      if (res.data.success) {
        console.log(res.data.animal[0].taxonomy);
        this.setState({
          name: res.data.animal[0].name,
          summary: res.data.animal[0].summary,
          image: res.data.animal[0].image,
          lifespan: res.data.animal[0].lifespan,
          scientificName: res.data.animal[0].scientificName,
          weight: res.data.animal[0].weight,
          facts: res.data.animal[0].facts,
          located: res.data.animal[0].located,
          taxonomy: res.data.animal[0].taxonomy,
          success: true
        });
      } else {
        this.setState({
          warningMessage: "This animal is not supported yet.",
          success: false
        });
      }
    });
  };

  doFavorite = animalName => {
    let favInfo = {
      userID: this.props.userID,
      animalName: animalName
    };

    axios.post("/api/user/favorite", favInfo).then(res => {
      this.setState({
        favorites: res.data.favorites
      });
    });
  };

  doUnfavorite = animalName => {
    let favInfo = {
      userID: this.props.userID,
      animalName: animalName
    };

    axios.post("/api/user/unfavorite", favInfo).then(res => {
      this.setState({
        favorites: res.data.favorites
      });
    });
  };

  render() {
    return (
      <div>
        <NavBar
          isLoggedIn={true}
          handleLogout={this.props.handleLogout}
          handleRandom={this.doGetRandom}
          favorites={this.state.favorites}
          clickFavorite={this.clickFavorite}
        />
        <div className="searchBox">
          <div className="search-params myButtonBox !important">
            <h6>What Animal do you want to learn about?</h6>
            <form className="input-group">
              <input
                onChange={this.handleChange}
                value={this.state.value}
                className="form-control width100"
                placeholder="Narwhal"
              />
              <span className="input-group-btn">
                <button
                  onClick={this.handleSubmit}
                  className="paper-btn btn-success"
                >
                  Submit
                </button>
              </span>
            </form>
          </div>
        </div>
        {this.state.success ? (
          <Animal
            name={this.state.name}
            summary={this.state.summary}
            image={this.state.image}
            lifespan={this.state.lifespan}
            scientificName={this.state.scientificName}
            located={this.state.located}
            weight={this.state.weight}
            taxonomy={this.state.taxonomy}
            facts={this.state.facts}
            userFavs={this.state.favorites}
            handleFavorite={this.doFavorite}
            handleUnfavorite={this.doUnfavorite}
          />
        ) : (
          <WarningMessage message={this.state.warningMessage} />
        )}
      </div>
    );
  }
}

export default SearchParams;
