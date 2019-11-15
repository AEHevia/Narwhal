import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

class WarningMessage extends Component {
  render() {
    return (
      <div className="warning-message">
        <h4>{this.props.message}</h4>
      </div>
    )
  }
}

export default WarningMessage;
