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
import ErrorPage from "./error-page";
import {Helmet} from "react-helmet";
import Loading from "./Loading";
import { useLocation } from "react-router-dom";

function AuthorPage() {
  let { authorId } = useParams();
  let [author, setAuthor] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    window.ym(96058973, 'hit', location.pathname);
  }, [location]);

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/author/" + authorId, { timeout: 20000 })
      .json()
      .then((response) => {
        setAuthor(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  function MetaTags() {
    if (!isLoading) {
      return(
        <Helmet>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={author.name} />
        <meta property="og:description" content="Все стихотворения автора" />
        <meta property="og:image" content={author.photo} />
  
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={author.name} />
        <meta name="twitter:description" content="Все стихотворения автора" />
        <meta name="twitter:image" content={author.photo} />

      </Helmet>
      )
    } else {
      return
    }
  }

  function PageContent() {
    if (isLoading) {
        return (<Loading />)
    } else {
      return (
        <>
          <AuthorDesc description={author.description} photo={author.photo} name={author.name}/>
          <div className="center"><Button href={"/author/" + author.id + "/feed"} text="Читать лентой" /></div>
          <AuthorStihList />
        </>
      )
    }
  }

  if (isError) return <ErrorPage />

  return (
    <div className="List">
      <BackButton />
      <Navigation />
      <MetaTags />
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs="auto" md="5" lg="4" xl="4">
            <PageContent />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthorPage;
