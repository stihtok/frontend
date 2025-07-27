import "./MainApp.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { useSearchParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import Stih from "./Stih/Stih";
import "./SearchPage.css";
import Loading from "./Loading";
import AuthorDesc from "./AuthorDesc/AuthorDesc";
import { useLocation } from "react-router-dom";

function AuthorFeedPage() {
  let [searchQuery] = useSearchParams();
  let [searchObjects, setSearchObjects] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/search/" + searchQuery.get('q'), { timeout: 20000 })
      .json()
      .then(response => {
        setSearchObjects(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error)
      });
  }, []);

  function SearchOutput() {
    return (searchObjects.map((object, id) => {
      if ('title' in object) {
      return (
        <Row className="justify-content-center page">
          <Col xs="auto">
            <Stih stih={object} />
          </Col>
        </Row>
      )} else {
        return(
        <Row className="justify-content-center page">
          <Col xs="auto">
            <AuthorDesc name={object.name} photo={object.photo} id={object.id}/>
          </Col>
        </Row>)
      }
    }))
  }
  return (
    <div className="App">
      <Container fluid>
          <Col xs="auto">
            <BackButton />
            <Navigation />
            <div className="searchQuery center"><h2>Поиск:  <i>'{searchQuery.get('q')}'</i></h2></div>
            {isLoading ? <Loading /> : <SearchOutput />}
          </Col>
      </Container>
    </div>
  );
}

export default AuthorFeedPage;
