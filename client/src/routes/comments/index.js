import React, { useState } from "react";
import {  useParams } from "react-router-dom";
//import Style from "./Comments.module.css";
import axios from "axios";
//import "../../../node_modules/bootstrap/dist/css/bootstrap.css";

const Comment = () => {
 // let history = useHistory();
  const [commentForm, setCommentForm] = useState({
    comment1: "",
    slug1:useParams()
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const onSubmit = async (event) => {
  event.preventDefault();

	try {
		await axios.post(
		  "http://localhost:4000/api/comments",
		  commentForm
    );
    window.location.reload(false);

	} catch(err) {
		console.log({error: err});
	}
  };




  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Comments:</h2>
        <textarea
          placeholder="Enter your comment"
          type="textarea"
          required
          name="comment1"
          value={commentForm.comment1}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comment;
