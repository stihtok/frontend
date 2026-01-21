import "./FortunePage.css";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import ky from "ky";
import { useParams } from "react-router-dom";
import BackButton from "./Parts/BackButton";
import Navigation from "./Parts/Navigation";
import ErrorPage from "./error-page";
import Loading from "./Loading";
import Animation from "./Animation";

function FortunePage() {
  let { authorId } = useParams();
  let [author, setAuthor] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);
  let [stihs, setStihs] = useState([]);
  let [currentGuess, setCurrentGuess] = useState(null);
  let [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      ky.get("/api/author/" + authorId, { timeout: 20000 }).json(),
      ky.get("/api/author/" + authorId + "/all", { timeout: 20000 }).json()
    ])
      .then(([authorResponse, stihsResponse]) => {
        setAuthor(authorResponse);
        setStihs(stihsResponse);
        setIsLoading(false);
        // После загрузки выбираем случайную строку
        setTimeout(() => {
          const guess = getRandomLine(stihsResponse);
          setCurrentGuess(guess);
          setTimeout(() => {
            setIsFadingIn(true);
          }, 100);
        }, 100);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [authorId]);

  function getRandomLine(stihsArray) {
    if (!stihsArray || stihsArray.length === 0) return null;
    
    // Выбираем случайный стих
    const randomStih = stihsArray[Math.floor(Math.random() * stihsArray.length)];
    if (!randomStih.body) return null;
    
    // Разбиваем на строки
    const lines = randomStih.body.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return null;
    
    // Выбираем случайную строку
    const randomIndex = Math.floor(Math.random() * lines.length);
    const mainLine = lines[randomIndex].trim();
    
    // Получаем соседние строки
    const prevLine = randomIndex > 0 ? lines[randomIndex - 1].trim() : null;
    const nextLine = randomIndex < lines.length - 1 ? lines[randomIndex + 1].trim() : null;
    
    return {
      main: mainLine,
      prev: prevLine,
      next: nextLine
    };
  }

  function handleGuessAgain() {
    setIsFadingIn(false);
    setTimeout(() => {
      const guess = getRandomLine(stihs);
      setCurrentGuess(guess);
      setTimeout(() => {
        setIsFadingIn(true);
      }, 100);
    }, 300);
  }

  if (isError) return <ErrorPage />;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="FortunePage">
      <BackButton />
      <Navigation />
      <Container fluid>
        <Animation>
          <Row className="justify-content-center animated">
            <Col xs="auto" md="6" lg="5" xl="4">
              <div className="fortuneContent">
                {/* Автор с ссылкой */}
                <div className="fortuneAuthor">
                  <a href={"/author/" + author.id}>
                    <img
                      className="fortuneAuthorImg"
                      src={author.photo}
                      alt={author.name}
                    />
                  </a>
                  <h1>
                    <a href={"/author/" + author.id}>{author.name}</a>
                  </h1>
                </div>

                {/* Случайная строка с соседними */}
                <div className={`fortuneContainer ${isFadingIn ? 'fadeIn' : ''}`}>
                  {currentGuess && (
                    <>
                      {currentGuess.prev && (
                        <div className="fortuneLineNeighbor">{currentGuess.prev}</div>
                      )}
                      <div className="fortuneLineMain">{currentGuess.main}</div>
                      {currentGuess.next && (
                        <div className="fortuneLineNeighbor">{currentGuess.next}</div>
                      )}
                    </>
                  )}
                </div>
                <div className="fortuneAgainButtonContainer">
                    <button className="fortuneAgainButton" onClick={handleGuessAgain}>
                            Еще раз
                    </button>
                </div>
              </div>
            </Col>
          </Row>
        </Animation>
      </Container>
    </div>
  );
}

export default FortunePage;

