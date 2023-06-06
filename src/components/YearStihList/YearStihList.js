import "./YearStihList.css";
import StihListByAuthor from "./StihListByAuthor";
import { useState, useEffect } from "react";
import ky from "ky";

function YearStihList(props) {
  let [authors, setAuthors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    ky.get("/api/year/" +  props.year + "/all")
    .json()
    .then((response) => {
      setAuthors(response);
    })
    .finally(() => setIsLoading(false))
    .catch((error) => {
      console.log(error)
    });
  }, []);


  return (
    <div className="yearStihList">
      {authors.map((author) => {
        return (
          <StihListByAuthor authorId={author.id} authorName={author.name} authorImg={author.photo} stihs={author.stihs}/>
        )
      })
    }
    </div>
  );
}

export default YearStihList;
