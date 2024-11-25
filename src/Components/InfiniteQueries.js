import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import axios from "axios";
import {useInView} from "react-intersection-observer"

const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=10&_page=${pageParam}`);
};
const InfiniteQueries = () => {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      // 20 items
      // 5 pages

      if (allPages.length < 5) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });
  const {ref,inView} = useInView();

  useEffect(()=>{
    if(inView){
        fetchNextPage();
    }
  },[fetchNextPage,inView])

  if (isLoading) {
    return <h2>Page is Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div className="container">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page?.data.map((fruit) => (
            <div className="fruit-item" key={fruit.id}>
              {fruit.name}
            </div>
          ))}
        </React.Fragment>
      ))}
      {/* <button disabled={!hasNextPage} onClick={fetchNextPage}>Load More...</button>
       */}
       <div ref={ref}></div>
    </div>
  );
};

export default InfiniteQueries;
