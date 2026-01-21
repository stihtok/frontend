import "./MainApp.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import { db } from "./db";
import { useState, useEffect } from "react";
import Stih from "./Stih/Stih";
import Loading from "./Loading";
import "./Stih/Like/Like.css";
import arrow from './img/arrow.svg';
import ErrorPage from "./error-page";
import { useLocation } from "react-router-dom";
import Animation from "./Animation";
import { color } from "framer-motion";

function FavoritesPage() {
  let [likeStihs, setLikeStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  async function getStihsFromDb() {
    try {
      const rows = await db.likes.toArray();
      const items = rows
        .filter((x) => x && x.stih)
        .sort((a, b) => (b.likedAt || 0) - (a.likedAt || 0))
        .map((x) => x.stih);
      setLikeStihs(items);
    } catch (e) {
      console.log(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function LikeStihsFeed() {
    if (likeStihs.length === 0) {
      return (<Row className="justify-content-center">
                  <Col xs="auto">
                  <div style={{marginTop:"50px", textAlign: "center"}} className="message"><h2 className="center">Здесь пока пусто</h2>
                  <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "center"}}>Добавляйте стихи в избранное,<br />загибая уголки.</p></div>
                  <div style={{textAlign:"right", marginRight:"20px"}}><img style={{rotate: "-3deg"}} src={arrow} alt="arrow" /></div>
                  <div style={{marginTop:"5px"}} className="like-root">
                      <input type="checkbox" autoComplete='off' />
                      <div className="like-triangle"><div className="like-triangle-inner"></div></div>
                      <div className="message" style={{marginBottom:"5px", marginTop:"50px", textAlign: "center"}}><p><span style={{color:"red"}}>*</span> их можно будет читать,<br />даже когда нет интернета</p></div>
                  </div>
          </Col>
        </Row>)
    } else {
    return (
      likeStihs.map((stih, id) => {
      return (
        <Row key={stih?.id ?? id} className="justify-content-center page">
          <Col xs="auto">
            <Stih stih={stih} />
          </Col>
        </Row>
      )
    })
    )
    }
  }

  useEffect(() => {
    getStihsFromDb();
  }, []);

  if (isError) return <ErrorPage />

  return (
    
    <div className="App">
      <Navigation />
      <BackButton />
      <Animation>
      <Container fluid>
          <Col xs="auto">
          {isLoading ? <Loading /> : <LikeStihsFeed />}
          </Col>
      </Container>
      </Animation>
    </div>
  );
}

export default FavoritesPage;
