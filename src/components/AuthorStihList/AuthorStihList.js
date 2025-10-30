import "./AuthorStihList.css";
import AuthorStihTitle from "./AuthorStihTitle";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ky from "ky";
import Filter from "./../Parts/Filter";

function AuthorStihList(props) {
  let { authorId } = useParams()
  let [stihs, setStihs] = useState([]);
  let [searchString, setSearchString] = useState("");
  let [isLoading, setIsLoading] = useState(true);
  let [selectedVibes, setSelectedVibes] = useState([])
  let [vibes, setVibes] = useState([]);

  const onChangeFunc = (e) => {
    const { value } = e.target;
    setSearchString(value);
  }

  const onChangeVibesFunc = (vibeId) => {
    setSelectedVibes(prev => {
      if (prev.includes(vibeId)) {
        return prev.filter(id => id !== vibeId);
      } else {
        return [...prev, vibeId];
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    ky.get("/api/author/" + authorId + "/tags", { timeout: 20000 })
    .json()
    .then((response) => {
      setVibes(response);
    })
    .finally(() => setIsLoading(false))
    .catch((error) => {
      console.log(error)
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    ky.get("/api/author/" + authorId + "/all", { timeout: 20000 })
    .json()
    .then((response) => {
      setStihs(response);
    })
    .finally(() => setIsLoading(false))
    .catch((error) => {
      console.log(error)
    });
  }, []);

  function VibesList() {
      return(
        vibes.map((vibe) => {
        return (
          <span>
            <label key={vibe.id}>
                  <input
                    type="checkbox"
                    checked={selectedVibes.includes(vibe.id)}
                    onChange={() => onChangeVibesFunc(vibe.id)}
                  />
            <span className="vibeTitle">{vibe.title}</span>
            </label>
          </span>
        )
      })
      )
  }

  return (
    <div>
        <VibesList />
        <div className="filterDiv"><Filter onChangeFunc={onChangeFunc} /></div>
        <div className="authorStihList">
        {stihs
          .filter(stih => stih.title.toString().toLowerCase().includes(searchString.toLowerCase()))
          .filter(stih => {
            if (!selectedVibes.length) return true;
            const stihTags = Array.isArray(stih.tags) ? stih.tags : [];
            const stihTagIds = stihTags.map(t => (typeof t === "number" ? t : t && typeof t === "object" ? t.id : undefined)).filter(Boolean);
            return selectedVibes.every(id => stihTagIds.includes(id));
          })
          .map((stih) => {
          return (
            <div id={stih.id} key={stih.id}>
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
