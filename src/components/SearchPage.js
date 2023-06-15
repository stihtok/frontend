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



function AuthorFeedPage() {
  let [searchQuery] = useSearchParams();
  let [searchStihs, setSearchStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/search/" + searchQuery.get('q'))
      .json()
      .then(response => {
        setSearchStihs(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error)
      });
  }, []);

  function SearchOutput() {
    return (searchStihs.map((stih, id) => {
      return (
        <Row className="justify-content-center page">
          <Col xs="auto">
            <Stih stih={stih} />
          </Col>
        </Row>
      )
    }))
  }
  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto">
            <BackButton />
            <Navigation />
            <div className="searchQuery center"><h2>Поиск:  <i>'{searchQuery.get('q')}'</i></h2></div>
            {isLoading ? <Loading /> : <SearchOutput />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthorFeedPage;
