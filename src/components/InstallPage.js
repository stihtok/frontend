import "./MainApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navigation from "./Parts/Navigation";
import BackButton from "./Parts/BackButton";
import share from './img/share.png';

function InstallPage() {
  var beforeInstallPrompt = null;
  window.addEventListener("beforeinstallprompt", eventHandler, errorHandler);
  
  function eventHandler(event){
      beforeInstallPrompt = event;   
      document.getElementById('installBtn').removeAttribute('disabled');

  }
  function errorHandler(e){
      console.log('error: ' + e);
  }

  function install() {
    if (window.beforeInstallEvent) beforeInstallPrompt.prompt();
}

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
                   <button id="installBtn" onclick="install()" disabled > 
                      Install PWA 
                  </button> 
                </p>
            </Col>
          </Row>
        </Container>
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
