import "./MainApp.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import { db } from "./db";
import { useState, useEffect } from "react";
import ky from "ky";
import Stih from "./Stih/Stih";
import Loading from "./Loading";
import "./Stih/Like/Like.css";
import arrow from './img/arrow.svg';
import ErrorPage from "./error-page";
import { useLocation } from "react-router-dom";

function FavoritesPage() {
  let [likes, setLikes] = useState([]);
  let [likeStihs, setLikeStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    window.ym(96058973, 'hit', location.pathname + location.search);
  }, [location]);
  function getStihsFromApi() {
    likes.map(({stihId, id}) => {
      ky
      .get("/api/stih/" + stihId, { timeout: 20000 })
      .json()
      .then((response) => {
        setLikeStihs(oldLikeStihs => [...oldLikeStihs, response]);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
    })
    setIsLoading(false)
  }

  async function getLikesFromIndexedDb() {
    const allItems = await db.likes.orderBy("id").reverse().toArray();
    setLikes(allItems);
  }

  function LikeStihsFeed() {
    if (likes.length === 0) {
      return (<Row className="justify-content-center">
                  <Col xs="auto">
                  <div style={{marginTop:"50px", textAlign: "center"}} className="message"><h2 className="center">Здесь пока пусто</h2>
                  <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "center"}}>Добавляйте стихи в избранное,<br />загибая уголки</p></div>
                  <div style={{textAlign:"right", marginRight:"20px"}}><img style={{rotate: "-3deg"}} src={arrow} alt="arrow" /></div>
                  <div style={{marginTop:"5px"}} className="like-root">
                      <input type="checkbox" autoComplete='off' />
                      <div className="like-triangle"><div className="like-triangle-inner"></div></div>
                  </div>
          </Col>
        </Row>)
    } else {
    return (
      likeStihs.map((stih, id) => {
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
  }

  useEffect(() => {
    getLikesFromIndexedDb();
  }, []);

  useEffect(() => {
    getStihsFromApi();
  }, [likes]);

  if (isError) return <ErrorPage />

  return (
    <div className="App">
      <Navigation />
      <BackButton />
      <Container fluid>
          <Col xs="auto">
          {isLoading ? <Loading /> : <LikeStihsFeed />}
          </Col>
      </Container>
    </div>
  );
}

export default FavoritesPage;
