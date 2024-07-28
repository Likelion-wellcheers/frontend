import React, { useState } from 'react'
import styled from 'styled-components';

export const Reviewpart = ({ reviews }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % reviews.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length);
    };
  return (
    <ReviewWrapper>
      <ArrowButton left onClick={handlePrev}>{'<'}</ArrowButton>
      <ReviewList style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <img src={review.profile} alt={review.username} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <div>{review.username}</div>
            <div>{review.location}</div>
            <div>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            <div>{review.content}</div>
          </ReviewCard>
        ))}
      </ReviewList>
      <ArrowButton right onClick={handleNext}>{'>'}</ArrowButton>
    </ReviewWrapper>
  )
}


const ReviewWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const ReviewList = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const ReviewCard = styled.div`
  flex: 0 0 25%;
  box-sizing: border-box;
  padding: 10px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: #666;
  }

  ${({ left }) => left && 'left: 0;'}
  ${({ right }) => right && 'right: 0;'}
`;