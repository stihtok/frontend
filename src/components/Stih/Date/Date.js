import './Date.css'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from 'react-router-dom';

function Date(props) {
  let yearNum = props.date.replace(/\D/g,'');

  return (
      <Container>
        <Row>
          <Col xs="auto">
          <div className="date">
          <NavLink to={"/year/" + yearNum}>{props.date}</NavLink>
            </div>
          </Col>
        </Row>
      </Container>
  );
}

export default Date;
