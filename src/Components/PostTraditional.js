import React, { useState } from 'react'
import {useEffect } from 'react';
import axios from 'axios';
const PostTraditional = () => {
    const [posts,setPosts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [iserror,setisError]=useState(false);

    const fetchPosts=async()=>{
        try{
            const response = await axios.get("http://localhost:4000/posts");
            console.log(response.data);
            setPosts(response.data);
            setIsLoading(false);
        }
        catch(error){
            setisError(true);
        }
    }

    useEffect(()=>{
        fetchPosts();
    },[])

    if(isLoading){
        return <div>Page is Loading</div>
    }

    if(iserror){
        return <div>Error has occured</div>
    }
  return (
    <div className='post.list'>
        {posts.map(post=>(
            <div className="post-item" key={post.id}>
                <h3 className='post-title'>{post.title}</h3>
                <p className='post.body'>{post.body}</p>
            </div>
        ))}
    </div>
  )
}

export default PostTraditional
