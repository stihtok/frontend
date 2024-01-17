import "./MainApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Parts/Navigation";
import BackButton from "./Parts/BackButton";
import share from './img/share.png';
import qr from './img/install-qr.png';
import { useEffect } from "react";
import { useState } from "react";

let deferredPrompt; 

function InstallPage() {
  const [installable, setInstallable] = useState(false);


  useEffect(() => {
    // PWA install prompt
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
      console.log(installable);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
};

  function isIos () {
    if (navigator.standalone) {
      //user has already installed the app
      return false;
    }
    const ua = window.navigator.userAgent;
    const isIPad = !!ua.match(/iPad/i);
    const isIPhone = !!ua.match(/iPhone/i);
    return isIPad || isIPhone;
  }

  function isAndroid () {
    if (navigator.standalone) {
      //user has already installed the app
      return false;
    }
    const ua = window.navigator.userAgent;
    const isAndroid = !!ua.match(/Android/i);
    return isAndroid;
  }


  function IosPrompt() {
    if (isIos()) {
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="auto">
                <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "left"}}>Установка СтихТок на iOS: <br /><br />
                <ol>
                  <li>Нажмите <b>Поделиться</b> в браузере <img src={share} style={{width:"30px", marginTop:"-10px"}} /></li>
                  <li>Выберите пункт <b>На эркан «Домой»</b></li>
                  <li>Нажмите <b>Добавить</b></li>
                </ol>
                </p>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  function AndroidPrompt() {
    if (isAndroid()) {
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs="auto">
                <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "left"}}>Установка СтихТок на Android: <br /><br />
                {installable &&
                  <button className="install-button" onClick={handleInstallClick}>
                    INSTALL ME
                  </button>
                }
                </p>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  function QR() {
    if (!(isIos() || isAndroid())) {
      return (
        <p style={{marginTop:"50px"}}>Откройте эту страницу в браузере на смартфоне <br /><br />
        <img src={qr} style={{width:"200px"}} /></p>
      );
    }
  }

  return (
    <div className="App">
      <Navigation />
      <BackButton />
      <div className="install-page center">
      <Container fluid>
            <Row className="justify-content-center">
              <Col xs="auto">
                  <h1 style={{textAlign: "center"}}>Приложение</h1>
                  <QR />
                  <IosPrompt />
                  <AndroidPrompt />
              </Col>
            </Row>
      </Container>
    </div>
    </div>
  );
}

export default InstallPage;
