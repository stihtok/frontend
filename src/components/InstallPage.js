import "./MainApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Parts/Navigation";
import BackButton from "./Parts/BackButton";
import share from './img/share.png';
import qr from './img/install-qr.png';
import { useState } from "react";
import androidIcon from "./img/android.png";
import actionMenu from "./img/actionMenu.png";


let deferredPrompt; 

function InstallPage() {
  let [installable, setInstallable] = useState(false);
  let [installed, setInstalled] = useState(false);

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
      setInstalled(true);
    });


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

  function InstallConfirm() {
    return(
      <button className="installedButton">
        👍 Приложение установлено
      </button>
      )
  }

  function InstallButton() {
    return(
      <button className="installButton" onClick={handleInstallClick}>
        <img style={{width:"24px", marginTop:"-3px", paddingRight:"3px"}} src={androidIcon} /> Установить
      </button>
      )
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
                  <li>Выберите <b>На эркан «Домой»</b></li>
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
                <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "left"}}>Для установки нажмите на кнопку: <br /><br /></p>
                { installable &&
                  <InstallButton />
                }
                { installed ? <InstallConfirm /> : null }
                 <p style={{marginBottom:"5px", marginTop:"50px", textAlign: "left"}}>
                    или:
                 <ol>
                  <li>Зайдите в меню браузера <img style={{width:"20px", marginTop:"-10px"}} src={actionMenu} /></li>
                  <li>Выберите <b>Установить приложение</b></li>
                  <li>Нажмите <b>Установить</b></li>
                </ol>
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
