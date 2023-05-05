import './Epigraph.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Epigraph(props) {
  return (
    <Container>
    <Row>
      <Col xs="auto">
      <div className="epigraph">
      <p>{props.epigraph}</p>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Epigraph;
