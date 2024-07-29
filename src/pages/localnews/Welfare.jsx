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
        <ArrowButton left onClick={handlePrev}>
          <ArrowImage src='/images/leftarrow.png' alt='Previous' />
        </ArrowButton>
        <Banner style={{ transform: `translateX(-${currentIndex * 100 / 3}%)` }}>
        {banners.map((banner, index) => (
            <BannerImage key={index} src={banner} alt={`Banner ${index + 1}`} />
        ))}
        </Banner>
        <ArrowButton right onClick={handleNext}>
                <ArrowImage src='/images/arrowbtn.png' alt='Next' />
        </ArrowButton>
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
  justify-content: center;
`;

const ArrowButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1;

    ${({ left }) => left && 'left: 10px;'}
    ${({ right }) => right && 'right: 10px;'}
`;

const ArrowImage = styled.img`
    width: 50px; 
    height: 50px;
    //margin-top: 30px;
`;


const BannerImage = styled.img`
  width: 33.33%;
  height: auto;
`;