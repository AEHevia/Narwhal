import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

class Animal extends Component {
  render() {
    const factsList = [];
    const locatedList = [];

    let name = this.props.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    for (const [index, value] of this.props.facts.entries()) {
      factsList.push(<li key={index}>{value}</li>);
    }
    for (const [index, value] of this.props.located.entries()) {
      locatedList.push(<li key={index}>{value}</li>);
    }

    let favorited = this.props.userFavs.includes(this.props.name);

    return (
      <Container className="container card-body border-secondary">
        {favorited && (
          <Button
            className="paper-btn btn-warning"
            onClick={() => {
              favorited = !favorited;
              this.props.handleUnfavorite(this.props.name);
            }}
            style={textStyle}
          >
            Unfavorite
          </Button>
        )}
        {!favorited && (
          <Button
            className="paper-btn btn-warning"
            onClick={() => {
              favorited = !favorited;
              this.props.handleFavorite(this.props.name);
            }}
            style={textStyle}
          >
            Favorite
          </Button>
        )}

        <Row class="general-info">
          <Col md={8}>
            <h1 className="animal-heading">{name}</h1>
            <div class="details-info shadow shadow-large">
              {this.props.summary}
            </div>
          </Col>
          <Col md={4}>
            <Image
              className="animal-pic shadow shadow-large"
              src={this.props.image}
              rounded
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={8}>
                <h4 className="header-stat-detail">
                  Lifespan:{" "}
                  <span className="stat-detail">{this.props.lifespan}</span>
                </h4>
              </Col>
              <Col md={8}>
                <h4 className="header-stat-detail">
                  Scientific Name:{" "}
                  <span className="stat-detail">
                    {this.props.scientificName}
                  </span>
                </h4>
              </Col>
              <Col md={8}>
                <h4 className="header-stat-detail">
                  Weight:{" "}
                  <span className="stat-detail">{this.props.weight}</span>
                </h4>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <h4 className="header-stat-detail">
              Located: <span className="stat-detail">{locatedList}</span>
            </h4>
            <h4 className="header-stat-detail">
              Taxonomy:{" "}
              <span className="stat-detail">
                <li>Genus: {this.props.taxonomy.genus}</li>
                <li>
                  <span>Species: {this.props.taxonomy.species}</span>
                </li>
              </span>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <h4 className="header-stat-detail">Facts:</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="details-info shadow shadow-large">{factsList}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const textStyle = {
  fontSize: "14px"
};

export default Animal;
