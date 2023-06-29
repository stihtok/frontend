import "./YearStihList.css";
import StihListByAuthor from "./StihListByAuthor";
import { useState, useEffect } from "react";
import ky from "ky";
import Loading from "../Loading";
import ErrorPage from "../error-page";

function YearStihList(props) {
  let [authors, setAuthors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ky.get("/api/year/" +  props.year + "/all")
    .json()
    .then((response) => {
      setAuthors(response);
    })
    .finally(() => setIsLoading(false))
    .catch((error) => {
      console.log(error);
      setIsError(true);
    });
  }, []);

  if (isError) return <ErrorPage />;

  function PageContent() {
    if (isLoading) {
      return <Loading />
    } else {
     return(
        authors.map((author) => {
        return (
          <StihListByAuthor authorId={author.id} authorName={author.name} authorImg={author.photo} stihs={author.stihs}/>
        )
      })
      )
    }
  }

  return (
    <div className="yearStihList">
        <PageContent />
    </div>
  );
}

export default YearStihList;
