import "./MainApp.css";
import { useState, useEffect } from "react";
import Stih from "./Stih/Stih";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { createRef, useRef } from "react";
import Navigation from "./Parts/Navigation";
import ErrorPage from "./error-page";

function MainApp() {
  let [bundle, setBundle] = useState([]);
  let lastItem = createRef();
  let observerLoader = useRef();
  let [isError, setIsError] = useState(false);

  const addStihsToBundle = () => {
    ky.get("/api/bundle/")
    .json()
    .then (response => {
      let newBundle = []
      newBundle = [...bundle, ...response];
      setBundle(newBundle);
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
    ky.get("/api/bundle/")
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
  }, [lastItem]);

  if (isError) return <ErrorPage />

  return (
    <div className="App">
      <Navigation />
      <Container fluid>
        {bundle.map((stih, index) => {
          if (index + 1 === bundle.lenght) {
            return (
              <Row
                key={stih.id}
                ref={lastItem}
                className="justify-content-center page"
              >
                <Col xs="auto">
                  <Stih stih={stih} />
                </Col>
              </Row>
            );
          }
          return (
            <Row
              key={stih.id}
              ref={lastItem}
              className="justify-content-center page"
            >
              <Col xs="auto">
                <Stih stih={stih} />
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
}

export default MainApp;
