import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsRQ = () => {
  //   /posts    ["posts"]
  //   /posts/1   ["posts",post.id]

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // It means after 30 seconds a query the data will be sent to cache
    staleTime: 30000,

    // refetches the data after every 1 second this is called polling and this works till you are on the same tab if u change the tab then the polling stops
    refetchInterval: 1000,

    // this will fetch the api again even if you are on any other tab
    refetchIntervalInBackground: true,

    // Not to fetch data on component mount
    enabled: false,
  });

  console.log({ isLoading, isFetching });
  if (isLoading) {
    return <div>Page is Loading</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  console.log(data);
  return (
    <div className="post.list">
      <button
        onClick={async () => {
          try {
            await refetch();
            console.log("Refetch successful!");
          } catch (err) {
            console.error("Error during refetch:", err);
          }
        }}
      >
        Fetch Posts
      </button>
      {data?.data.map((post) => (
         <Link to={`/rq-posts/${post.id}`}>
        <div className="post-item" key={post.id}>
          <h3 className="post-title">{post.title}</h3>
          <p className="post.body">{post.body}</p>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;



// To create RQ Detail page
// Create a RQ Detail page
// Configuring the route for the newly created pages - (rq-posts/{postId})
// wrapping each Item with <a> tag