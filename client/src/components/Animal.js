import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

class Animal extends Component {
  render() {

    const factsList = []
    const locatedList = []

    let name = this.props.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    for (const [index, value] of this.props.facts.entries()) {
      factsList.push(<li key={index}>{value}</li>)
    }
    for (const [index, value] of this.props.located.entries()) {
      locatedList.push(<li key={index}>{value}</li>)
    }

    return (
      <Container className="container">
        <Button className="favorite-button">Favorite</Button>

        <Row class="general-info">
            <Col md={8}>
              <h1>{name}</h1>
              <div class="details-info">
                {this.props.summary}
              </div>
            </Col>
            <Col md={4}>
              <Image className="animal-pic" src={this.props.image} rounded />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <h4>Lifespan: <span className="stat-detail">{this.props.lifespan}</span></h4>
                </Col>
                <Col md={8}>
                  <h4>Scientific Name: <span className="stat-detail">{this.props.scientificName}</span></h4>
                </Col>
                <Col md={8}>
                  <h4>Weight: <span className="stat-detail">{this.props.weight}</span></h4>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
                <h4>Located: <span className="stat-detail">{locatedList}</span></h4>
                <h4>Taxonomy: <span className="stat-detail">
                  <li>
                    Genus: {this.props.taxonomy.genus}
                  </li>
                  <li>
                    <span>Species: {this.props.taxonomy.species}</span>
                  </li>
                </span></h4>
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <h4>Facts:</h4>
            </Col>
          </Row>
          <Row>
              <Col>
                <div className="details-info">
                    {factsList}
                </div>
              </Col>
          </Row>
      </Container>
    )
  }
}

export default Animal;
