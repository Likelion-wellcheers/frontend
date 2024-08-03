import React from 'react'
import { PostReview } from './PostReview'
import { useLocation } from 'react-router-dom'

export const ReviewCenter = () => {
    const location = useLocation();
    const {center_name} = location.state || "";

  return (
    <>
        <PostReview title={center_name} isRequired={0}></PostReview>
    </>
  )
}
