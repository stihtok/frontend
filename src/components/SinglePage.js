import "./MainApp.css";
import { useState, useEffect } from "react";
import Stih from "./Stih/Stih";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./Loading";
import ky from "ky";
import { useParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";

function SinglePage() {

  let { stihId } = useParams()
  let [stih, setStih] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ky.get("/api/stih/" + stihId)
    .json()
    .then(response => {
      setStih(response);
    })
    .finally(() => setIsLoading(false))
    .catch((error) => {
      console.log(error)
    });
  }, []);


  return (
    <div className="Single">
      <Navigation />
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto">
            <BackButton />
            {isLoading ? <Loading /> : <Stih stih={stih} />}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default SinglePage;
