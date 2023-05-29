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
import Button from "./Parts/Button";

function AuthorPage() {
  let { authorId } = useParams();
  let [author, setAuthor] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/author/" + authorId)
      .then((response) => {
        setAuthor(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto" md="5" lg="4" xl="4">
            <BackButton />
            <Navigation />
            <AuthorDesc description={author.description} photo={author.photo} name={author.name}/>
            <div className="center"><Button href={"/author/" + author.id + "/feed"} text="Читать лентой" /></div>
            <AuthorStihList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthorPage;
