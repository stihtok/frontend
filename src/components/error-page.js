import { useRouteError } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Parts/Navigation";
import "./MainApp.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="App">
      <Navigation />
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