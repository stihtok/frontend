import "./MainApp.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { useParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import Stih from "./Stih/Stih";
import Loading from "./Loading";
import ErrorPage from "./error-page";

function AuthorFeedPage() {
  let { authorId } = useParams();
  let [authorStihs, setAuthorStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/author/" + authorId + "/all")
      .json()
      .then((response) => {
        setAuthorStihs(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  function Feed() {
    return (
      authorStihs.map((stih, id) => {
        return (
          <Row className="justify-content-center page">
            <Col xs="auto">
              <Stih stih={stih} />
            </Col>
          </Row>
        )
      })
    )
  }

  if (isError) return <ErrorPage />

  return (
    <div className="App">
      <BackButton />
      <Navigation />
      <Container fluid>
          <Col xs="auto">
            {isLoading ? <Loading /> : <Feed />}
          </Col>
      </Container>
    </div>
  );
}

export default AuthorFeedPage;
