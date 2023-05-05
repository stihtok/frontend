import "./AuthorStihList.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function AuthorStihTitle(props) {
  return (
    <div className="authorStihTitle">
      <NavLink to={"/stih/"+props.id}><p>{props.title}</p></NavLink>
    </div>
  );
}

export default AuthorStihTitle;
