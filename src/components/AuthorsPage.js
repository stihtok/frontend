import "./MainApp.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import AuthorDesc from "./AuthorDesc/AuthorDesc"

function AuthorsPage() {
  let [authors, setAuthors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/authors/")
      .then((response) => {
        setAuthors(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Container fluid>
      <Navigation />
      <BackButton />
        <Row className="justify-content-center">
          <Col xs="auto">
            {authors.map((author, id) => {
              return <AuthorDesc name={author.name} photo={author.photo} id={author.id}/>
            })
          }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthorsPage;
