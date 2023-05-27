import "./MainApp.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import YearStihList from "./YearStihList/YearStihList";
import Year from "./YearStihList/Year";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";


function YearPage() {
  let { year } = useParams();

  return (
    <div className="App">
      <Navigation />
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
