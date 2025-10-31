import "./MainApp.css";
import { useState, useEffect } from "react";
import { db } from "./db";
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
import Animation from "./Animation";
import "./VibesPage.css";
import Stih from "./Stih/Stih";

function VibesPage() {
  let [vibes, setVibes] = useState([]);
  let [selectedVibes, setSelectedVibes] = useState([]);
  let [vibeStihs, setVibeStihs] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let location = useLocation();

  useEffect(() => {
    async function loadSelectedVibes() {
      try {
        const rows = await db.selectedVibes.orderBy("id").toArray();
        const ids = rows.map(r => r.vibeId);
        setSelectedVibes(ids);
      } catch (e) {
        // ignore db errors
      }
    }
    loadSelectedVibes();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    ky
      .get("/api/tags/", { timeout: 20000 })
      .json()
      .then((response) => {
        setVibes(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (selectedVibes.length === 0) {
        setVibeStihs([]);
        return;
    }
    setIsLoading(true);
    const queryParams = selectedVibes.map(vibeId => `q=${vibeId}`).join('&');
    const url = `/api/tags/query?${queryParams}`;
    console.log(url);
    ky
      .get(url, { timeout: 20000 })
      .json()
      .then((response) => {
        setVibeStihs(response);
      })
      .finally(() => setIsLoading(false))
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [selectedVibes]);


  if (isError) return <ErrorPage />

  async function handleTagClick(vibeId) {
    setSelectedVibes(prev => {
      if (prev.includes(vibeId)) {
        return prev.filter(id => id !== vibeId);
      } else {
        return [...prev, vibeId];
      }
    });
    try {
      const exists = await db.selectedVibes.get({ vibeId });
      if (exists) {
        await db.selectedVibes.where("vibeId").equals(vibeId).delete();
      } else {
        await db.selectedVibes.add({ vibeId });
      }
    } catch (e) {
      // ignore db errors
    }
  }

  function Feed() {
    return (
      vibeStihs.map((stih, id) => {
        return (
              <Animation>
          <Row className="justify-content-center page">
            <Col xs="auto">
              <Stih stih={stih} />
            </Col>
          </Row>
          </Animation>
        )
      })
    )
  }

  return (
    <div className="App">
      <BackButton />
      <Navigation />
      <Container fluid>
      <Animation>
        <Row id="start" className="justify-content-center animated vibes center">
          <Col xs="auto" md="5" lg="4" xl="5">
              {vibes.map((tag) => {
                return (
                  <button
                    type="button"
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    className={`tag ${selectedVibes.includes(tag.id) ? 'selected' : ''}`}
                    aria-pressed={selectedVibes.includes(tag.id)}
                  >
                    {tag.title}
                  </button>
                )
              })
            }
          </Col>
        </Row>
        {isLoading ? <Loading /> : <Feed />}
        </Animation>
      </Container>
    </div>
  );
}

export default VibesPage;