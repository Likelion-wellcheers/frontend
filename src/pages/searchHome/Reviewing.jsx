import React, { useEffect } from 'react'
import { PostReview } from './PostReview'
import { useLocation } from 'react-router-dom';


export const Reviewing = () => {
  const location = useLocation();
  const { title } = location.state;

  useEffect(()=>{
    console.log('reviewng', title);
},[]);

  return (
    <PostReview title={title} isRequired={1} ></PostReview>
  )
}
