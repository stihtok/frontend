import "./AuthorStihList.css";
import "../VibesPage.css";
import AuthorStihTitle from "./AuthorStihTitle";
import Stih from "../Stih/Stih";
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
  let [expandedIds, setExpandedIds] = useState(new Set());

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
    // Collapse all expanded poems when vibe selection changes
    setExpandedIds(new Set());
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

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  function VibesList() {
      return(
        vibes.map((vibe) => {
        return (
          <button
            type="button"
            key={vibe.id}
            onClick={() => onChangeVibesFunc(vibe.id)}
            className={`tag ${selectedVibes.includes(vibe.id) ? 'selected' : ''}`}
            aria-pressed={selectedVibes.includes(vibe.id)}
          >
            {vibe.title}
          </button>
        )
      })
      )
  }

  return (
    <div>
        <div className="filterDiv"><Filter onChangeFunc={onChangeFunc} /></div>
        <div className="authorVibes">
            <VibesList />
        </div>
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
            const isExpanded = expandedIds.has(stih.id);
            return (
            <div id={stih.id} key={stih.id} className={`authorStihItem ${isExpanded ? 'expanded' : ''}`}>
              <AuthorStihTitle id={stih.id} title={stih.title} onClick={() => toggleExpand(stih.id)} isExpanded={isExpanded} />
              <div className={`stihCollapsible ${isExpanded ? 'open' : ''}`} aria-hidden={!isExpanded}>
                <Stih stih={stih} />
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
    
  );
}

export default AuthorStihList;
