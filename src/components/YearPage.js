import "./MainApp.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import YearStihList from "./YearStihList/YearStihList";
import Year from "./YearStihList/Year";
import BackButton from "./BackButton";
import Filter from "./Parts/Filter";

function YearPage() {
  let { year } = useParams();

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto">
            <BackButton />
            <Year year={year} />
            <YearStihList year={year} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default YearPage;
