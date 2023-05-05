import "./YearStihList.css";
import StihListByAuthor from "./StihListByAuthor";
import { useState, useEffect } from "react";
import axios from "axios";

function YearStihList(props) {
  let [authors, setAuthors] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/year/" +  props.year + "/all")
    .then((response) => {
      setAuthors(response.data);
    })
    .finally(() => setIsLoading(false)); ;
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
