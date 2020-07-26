import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Style from "./Article.module.css";
import Blogheader from "../../components/blogheader/index";
import ReactMarkdown from "react-markdown";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Comment from "../comments/index";
import {
 FacebookShareButton,FacebookIcon,EmailShareButton,EmailIcon
} from 'react-share';

const Article = () => {
  let history = useHistory();
  const [article, setArticle] = useState({});
  const [comment, setComment] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    getDataBySlug(slug);
  }, [slug]);

  const getDataBySlug = async (slug) => {
    try {
      const res = await axios.get(`http://localhost:4000/api/post/${slug}`);
      setArticle(res.data);
      setComment(res.data.comment);
    } catch (err) {
      console.log({ error: err });
    }
  };

  const deleteArticle = async (id) => {
    if (window.confirm("Do you wanna delete this article?")) {
      try {
        axios.defaults.headers.common["Authorization"] = sessionStorage.token;
        await axios.delete(`http://localhost:4000/api/delete/${id}`);
        history.push("/");
      } catch (err) {
        console.log({ error: err });
      }
    }
  };

  const editDeleteArticle = (id) => {
    if (sessionStorage.token) {
      return (
        <div className={Style.buttons}>
          <button
            onClick={() => deleteArticle(id)}
            className={Style.linkButton}
          >
            Delete
          </button>
          <button
            onClick={() => history.push(`/edit/${slug}`)}
            className={Style.linkButton}
          >
            Edit
          </button>
        </div>
      );
    }
  };

  const renderMarkdown = () => {
    if (article.markdown === undefined) {
      return (
        <SkeletonTheme color="#161f27" highlightColor="#324759">
          <Skeleton count={15} />
        </SkeletonTheme>
      );
    } else {
      return (
        <ReactMarkdown className={Style.markdown} source={article.markdown} />
      );
    }
  };

  const rendercomments = () => {
    if (comment.length===0 || comment==null) ;
     else {   
      var arrays=[]
      for(var val in comment){
        arrays.push(comment[val])
      }
      arrays.reverse();
      return arrays.map((array)=>{
        return <div >
          
          <button
         
          className={Style.button}
        >{array}</button>
        </div>
      })
     
    }
  };

  return (
    <div className={Style.article}>
      <div className={Style.controlHeader}>
        <Blogheader
          image={article.image}
          title={article.title}
          description={article.description}
          createdAt={article.createdAt}
        />
        {editDeleteArticle(article._id)}
      </div>
      <hr />
  {renderMarkdown()}
  <br></br>
  <div style={{textAlign:"right"}}>
    Blog Share
    <br></br>
  
  <FacebookShareButton url="http://localhost:3001/article/" children="{slug}"><FacebookIcon style={{height:"25px",width:"25px"}}/></FacebookShareButton>
  <EmailShareButton url="www.facebook.com"><EmailIcon style={{height:"25px",width:"25px"}}/></EmailShareButton>
  </div>
      <Comment slug1={article._id}/><br></br><br></br>
      {rendercomments()}
      <br></br><br></br>
    </div>
  );
};

export default Article;
