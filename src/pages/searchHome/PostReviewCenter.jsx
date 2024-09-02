import React from 'react'
import { PostReview } from '../../component/PostReview'
import { useLocation } from 'react-router-dom'

// 센터 리뷰
export const PostReviewCenter = () => {
    const location = useLocation();
    const {center_name} = location.state || "";

  return (
    <>
        <PostReview title={center_name} type={'center'}></PostReview>
    </>
  )
}
