import React, { useState } from 'react'
import styled from 'styled-components';

export const Welfare = ({banners = []}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % banners.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((currentIndex - 1 + banners.length) % banners.length);
    };

  return (
    <Wrapper>
        <ArrowButton left onClick={handlePrev}>{'<'}</ArrowButton>
        <Banner style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}>
        {banners.map((banner, index) => (
            <BannerImage key={index} src={banner} alt={`Banner ${index + 1}`} />
        ))}
        </Banner>
        <ArrowButton right onClick={handleNext}>{'>'}</ArrowButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Banner = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  width: 100%;
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

const BannerImage = styled.img`
  width: 33.33%;
  height: auto;
`;