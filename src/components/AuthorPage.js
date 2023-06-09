import "./MainApp.css";
import { useState, useEffect } from "react";
import AuthorDesc from "./AuthorDesc/AuthorDesc";
import AuthorStihList from "./AuthorStihList/AuthorStihList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { useParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import Button from "./Parts/Button";
import {Helmet} from "react-helmet";

function AuthorPage() {
  let { authorId } = useParams();
  let [author, setAuthor] = useState({});
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/author/" + authorId)
      .json()
      .then((response) => {
        setAuthor(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error)
      });
  }, []);

  function MetaTags() {
    debugger;
    if (!isLoading) {
      return(
        <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={author.name} />
        <meta property="og:description" content="Стихотворения" />
        <meta name="og:image" content="/logo512.png" />
  
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={author.name} />
        <meta name="twitter:description" content="Стихотворения" />
        <meta name="twitter:image" content="/logo512.png" />

      </Helmet>
      )
    } else {
      return
    }
  }

  return (
    <div className="List">
      <BackButton />
      <Navigation />
      <MetaTags />
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto" md="5" lg="4" xl="4">
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
