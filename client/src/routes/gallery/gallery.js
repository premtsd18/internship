import React, { useEffect, useState } from "react";
import Style from "./gallery.module.css";
import axios from "axios";
//import {cssb} from "../../../node_modules/bootstrap/dist/css/bootstrap.css"

const Gallery = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const resp = await axios.get("http://localhost:4000/api/post");
      setPosts(resp.data.reverse());
    } catch (err) {
      console.log({ error: err });
    }
  };

  const renderPost = () => {
    if (posts.length === 0) {
      return <i className="gg-spinner-two"></i>
    } else {
     
      return   posts.map((post) => (
      <span >
        <img src={post.image} alt="logo" width="200px" height="200px" style={{paddingTop:"50px", paddingRight:"30px",paddingLeft:"30px"}}/>
        </span>
      ));
    }
  };

  return <div className={Style.home}><div className="row">{renderPost()}</div></div>;
};

export default Gallery;
