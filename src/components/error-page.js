import { useRouteError } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Parts/Navigation";
import "./MainApp.css";
import BackButton from "./Parts/BackButton";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  
  let location = useLocation();

  useEffect(() => {
    window.ym(96058973, 'hit', location.pathname + location.search);
  }, [location]);


  return (
    <div className="App">
      <Navigation />
      <BackButton />
      <div className="error-page center">
      <Container fluid>
            <Row className="justify-content-center">
              <Col xs="auto">
                  <h1 style={{textAlign: "center"}}>Ой!</h1>
                  <p>Что-то пошло не так</p>
              </Col>
            </Row>
      </Container>
    </div>
    </div>
  );
}