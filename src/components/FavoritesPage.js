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

function FavoritesPage() {
  let [likes, setLikes] = useState([]);
  let [likeStihs, setLikeStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  function getStihsFromApi() {
    console.log(likes);
    likes.map(({stihId, id}) => {
      ky
      .get("/api/stih/" + stihId)
      .json()
      .then((response) => {
        setLikeStihs(oldLikeStihs => [...oldLikeStihs, response]);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error)
      });
    })
  }

  async function getLikesFromIndexedDb() {
    const allItems = await db.likes.orderBy("id").reverse().toArray();
    setLikes(allItems);
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
        <Row className="justify-content-center">
          <Col xs="auto">
            {likeStihs.map((stih, id) => {
              return (
                <Row className="justify-content-center page">
                  <Col xs="auto">
                    <Stih stih={stih} />
                  </Col>
                </Row>
              )
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FavoritesPage;
