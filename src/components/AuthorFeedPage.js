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
import { useLocation } from "react-router-dom";
import Animation from "./Animation";

function AuthorFeedPage() {
  let { authorId } = useParams();
  let [authorStihs, setAuthorStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/author/" + authorId + "/all/random" , { timeout: 20000 })
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
        <Animation>
        <Col xs="auto">
          {isLoading ? <Loading /> : <Feed />}
        </Col>
        </Animation>
      </Container>
    </div>
    
  );
}

export default AuthorFeedPage;
