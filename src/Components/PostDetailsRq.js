import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const fetchPostsDetails = (postId) =>{
    return axios.get(`http://localhost:4000/posts/${postId}`)
}
const PostDetailsRq = () => {
  const { postId } = useParams();
  console.log(postId);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["posts", postId],
    queryFn:()=>fetchPostsDetails(postId)
  });

  if (isLoading) {
    return <div>Page is Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const { title, body } = data.data;

  return (
    <div className="post-details-container">
      <div className="post-details-title">{title}</div>
      <div className="post-details-body">{body}</div>
    </div>
  );
};

export default PostDetailsRq;
