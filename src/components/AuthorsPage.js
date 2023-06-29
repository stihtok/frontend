import "./MainApp.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import AuthorDesc from "./AuthorDesc/AuthorDesc"
import Loading from "./Loading";
import ErrorPage from "./error-page";

function AuthorsPage() {
  let [authors, setAuthors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/authors/")
      .json()
      .then((response) => {
        setAuthors(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  if (isError) return <ErrorPage />

  return (
    <div className="List">
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
