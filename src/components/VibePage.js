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
import Tag from './Parts/Tag'

function VibePage() {
  let { vibeId } = useParams();
  let [vibeStihs, setVibeStihs] = useState([]);
  let [vibeTitle, setVibeTitle] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/tags/" + vibeId , { timeout: 20000 })
      .json()
      .then((response) => {
        setVibeStihs(response);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });

    ky
      .get("/api/tags", { timeout: 20000 })
      .json()
      .then((response) => {
        setVibeTitle(response.find( tag => tag.id === Number(vibeId)));
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);


  function Feed() {
    return (
      vibeStihs.map((stih, id) => {
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
          <div className="searchQuery center"><Tag selected="tag-selected" title={ vibeTitle.title } id={vibeTitle.id}/ ></div>
          {isLoading ? <Loading /> : <Feed />}
        </Col>
        </Animation>
      </Container>
    </div>
    
  );
}

export default VibePage;
