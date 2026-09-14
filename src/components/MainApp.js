import "./MainApp.css";
import { useState, useEffect } from "react";
import Stih from "./Stih/Stih";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { useRef } from "react";
import Navigation from "./Parts/Navigation";
import ErrorPage from "./error-page";
import { useLocation } from "react-router-dom";
import Animation from "./Animation";

function MainApp() {
  let [bundle, setBundle] = useState([]);
  let lastItem = useRef(null);
  let observerLoader = useRef();
  let [isError, setIsError] = useState(false);
  let location = useLocation();


  const addStihsToBundle = () => {
    ky.get("/api/bundle/", { timeout: 20000 })
    .json()
    .then (response => {
      setBundle(prev => [...prev, ...response]);
    })
    .catch((error) => {
      console.log(error);
      setIsError(true);
    });
  }

  const actionInSight = (items) => {
    if (items[0].isIntersecting) {
      addStihsToBundle();
    }
  };

  useEffect(() => {
    ky.get("/api/bundle/", { timeout: 20000 })
    .json()
    .then(response => {
      setBundle(response);
    })
    .catch((error) => {
      console.log(error);
      setIsError(true);
    });
  }, []);

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    
    observerLoader.current = new IntersectionObserver(actionInSight);
    if (lastItem.current) {
      observerLoader.current.observe(lastItem.current);
    }
  }, [bundle]);

  if (isError) return <ErrorPage />

  return (
      <div className="App">
        <Navigation />
        <Container fluid>
        <Animation>
          {bundle.map((stih, index) => {
            return (
              <Row
                key={stih.id}
                ref={index + 1 === bundle.length ? lastItem : null}
                className="justify-content-center page"
              >
                <Col xs="auto">
                  <Stih stih={stih} />
                </Col>
              </Row>
            );
          })}
        </Animation>
        </Container>
      </div>
  );
}

export default MainApp;
