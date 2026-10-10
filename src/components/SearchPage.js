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

function AuthorFeedPage() {
  let [searchQuery] = useSearchParams();
  let [searchObjects, setSearchObjects] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const query = searchQuery.get("q") || "";

  useEffect(() => {
    const controller = new AbortController();
    if (!query.trim()) {
      setSearchObjects([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setSearchObjects([]);
    ky
      .get("/api/search/" + encodeURIComponent(query.trim()), {
        timeout: 20000,
        signal: controller.signal,
      })
      .json()
      .then(response => {
        if (!controller.signal.aborted) setSearchObjects(response);
      })
      .catch(error => {
        if (!controller.signal.aborted) console.log(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [query]);

  function SearchOutput() {
    return (searchObjects.map((object, id) => {
      if ('title' in object) {
      return (
        <Row className="justify-content-center page">
          <Col xs="auto">
            <Stih stih={object} highlight={searchQuery.get('q')} />
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
            {isLoading ? <Loading /> : (searchObjects.length === 0 ? <div className="center error-page"><p>Ничего не нашлось...</p></div> : <SearchOutput />)}
          </Col>
      </Container>
    </div>
  );
}

export default AuthorFeedPage;
