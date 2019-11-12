import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

class Animal extends Component {
  render() {
    return (
      <Container className="container">
        <div>
          <Row class="general-info">
            <Col md={8}>
              <h1>{this.props.name}</h1>
              <div class="details-info">
                {this.props.summary}
              </div>
            </Col>
            <Col md={4}>
              <Image className="animal-pic" src={this.props.image} rounded />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="stat-detail">Lifespan: {this.props.lifespan}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="stat-detail">Scientific Name: {this.props.scientificName}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4 className="stat-detail">Weight: {this.props.weight}</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Fact:</h4>
            </Col>
          </Row>
          <Row>
              <Col>
                <div className="details-info">
                  {/*{this.props.facts.map((item) => <li>{{item}}</li>)}*/}
                </div>
              </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

export default Animal;
