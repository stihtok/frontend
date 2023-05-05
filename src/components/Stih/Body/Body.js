import "./Body.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Body(props) {
  return (
    <div className="stihBody">
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto">
            <p>{props.body}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Body;
