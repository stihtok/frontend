import "./MainApp.css";
import { useState, useEffect } from "react";
import Stih from "./Stih/Stih";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { createRef, useRef } from "react";
import Navigation from "./Parts/Navigation";

function MainApp() {
  let [bundle, setBundle] = useState([]);
  let lastItem = createRef();
  let observerLoader = useRef();

  const addStihsToBundle = () => {
    axios.get("/api/bundle/").then((response) => {
      let newBundle = []
      newBundle = [...bundle, ...response.data,];
      setBundle(newBundle);
    });
  }

  const actionInSight = (items) => {
    if (items[0].isIntersecting) {
      addStihsToBundle();
    }
  };

  useEffect(() => {
    axios.get("/api/bundle/").then((response) => {
      setBundle(response.data);
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
                className="justify-content-center"
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
              className="justify-content-center"
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
