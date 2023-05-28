import "./MainApp.css";
import { useState, useEffect } from "react";
import AuthorDesc from "./AuthorDesc/AuthorDesc";
import AuthorStihList from "./AuthorStihList/AuthorStihList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import Stih from "./Stih/Stih";

function AuthorFeedPage() {
  let { authorId } = useParams();
  let [authorStihs, setAuthorStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/author/" + authorId + "/all")
      .then((response) => {
        setAuthorStihs(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto">
            <BackButton />
            <Navigation />
            {authorStihs.map((stih, id) => {
              return (
                <Row className="justify-content-center">
                  <Col xs="auto">
                    <Stih stih={stih} />
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>


        {/* {bundle.map((stih) => {
          return (
            <Row className="justify-content-center">
              <Col xs="auto">
                <Stih stih={stih} />
              </Col>
            </Row>
          );
        })} */}
      </Container>
    </div>
  );
}

export default AuthorFeedPage;
