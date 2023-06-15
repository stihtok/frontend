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

function FavoritesPage() {
  let [likes, setLikes] = useState([]);
  let [likeStihs, setLikeStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  function getStihsFromApi() {
    likes.map(({stihId, id}) => {
      ky
      .get("/api/stih/" + stihId)
      .json()
      .then((response) => {
        setLikeStihs(oldLikeStihs => [...oldLikeStihs, response]);
      })
      .catch((error) => {
        console.log(error)
      });
    })
    setIsLoading(false)
  }

  async function getLikesFromIndexedDb() {
    const allItems = await db.likes.orderBy("id").reverse().toArray();
    setLikes(allItems);
  }

  function LikeStihsFeed() {
    debugger;
    if (likes.length === 0) {
      return (<Row className="justify-content-center">
                  <Col xs="auto">
                  <div className="message"><h2 className="center">Здесь пока пусто</h2>
                  Добавляйте стихи в избранное, загибая уголки</div>
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
