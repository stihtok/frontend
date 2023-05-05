import "./AuthorStihList.css";
import AuthorStihTitle from "./AuthorStihTitle";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from 'fuse.js';
import Filter from "./../Parts/Filter";

function AuthorStihList(props) {
  let { authorId } = useParams()
  let [stihs, setStihs] = useState([]);
  let [searchString, setSearchString] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  const onChangeFunc = (e) => {
    const { value } = e.target;
    setSearchString(value);
  }

  useEffect(() => {
    setIsLoading(true);
    axios.get("http://192.168.1.201:8000/api/author/" + authorId + "/all")
    .then((response) => {
      setStihs(response.data);
    })
    .finally(() => setIsLoading(false)); ;
  }, []);

  return (
    <div>
        <div className="filterDiv"><Filter onChangeFunc={onChangeFunc} /></div>
        <div className="authorStihList">
        {stihs.filter(stih => stih.title.toString().toLowerCase().includes(searchString.toLowerCase())).map((stih) => {
          return (
            <div key={stih.id}>
              <AuthorStihTitle id={stih.id} title={stih.title} />
            </div>
          )
        })
      }
      </div>
    </div>
    
  );
}

export default AuthorStihList;
