import React from 'react'
import { PostReview } from '../../component/PostReview'
import { useLocation } from 'react-router-dom';

// 지역 리뷰
export const PostReviewLocal = () => {
  const location = useLocation();
  const { title } = location.state;

  return (
    <>
      <PostReview title={title} type={'local'} ></PostReview>
    </>
  )
}
