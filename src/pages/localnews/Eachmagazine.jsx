import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

export const Eachmagazine = () => {

    const [currentIndex, setCurrentIndex] = useState(1);
  
    const handlePrevClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    const handleNextClick = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const navigate=useNavigate();

  return (
    <Container>
      <NavContainer>매거진</NavContainer>



      <PostTitle>
        <PostTitleContent>흑석 주민의 생생한 이야기
        <PostTitleRating src='/images/magazine_icon.png'>
      </PostTitleRating></PostTitleContent>
    </PostTitle>

    <CarouselContainer>
      <Arrow src='/images/arrowbtn.png' left onClick={handlePrevClick}>
        &#9664;
      </Arrow>
      <Image
        src={images[(currentIndex - 1 + images.length) % images.length]}
        dim
      />
      <Image src={images[currentIndex]} highlight />
      <Image
        src={images[(currentIndex + 1) % images.length]}
        dim
      />
      <Arrow onClick={handleNextClick}>
        &#9654;
      </Arrow>
    </CarouselContainer>
    <Line />
    <Button onClick={() => navigate('/moremagazine')}>목록</Button>
    </Container>
  )
}

const Button = styled.button`
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 4px;
  padding: 4px, 12px, 4px, 12px;
  width: 84px;
  height: 32px;
  margin-top: -2%;
  margin-bottom: -4%;
`

const Line = styled.div`
  border-bottom: 1px solid var(--Gray-02, #BBB8B8);
  position: relative;
  width: 90%;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 75px;
    margin-bottom: 12vh;
`
const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 12vh;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    color: var(--Main, #5D5FEF);
    border-bottom: 1px solid var(--Gray-02, #BBB8B8);
    margin-bottom: 1vh;
`

const PostTitle = styled.div`
    width: 95%;
`
const PostTitleContent = styled.div`
    position: relative;
    display: flex;
    height: 60px;
    padding: 22px 40px;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 65px;
    background: var(--Main, #5D5FEF);
    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.12);
    color: #FFF;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    padding-left: 6%;
`
const PostTitleRating = styled.img`
    position: absolute;
    left: 78%;
    top: -7vh;
`
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 60%;
  margin: 0 auto;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  ${(props) => (props.left ? 'left: 0' : 'right: 0')};
`;

const Image = styled.img`
  max-width: 50%;
  transition: transform 0.5s, opacity 0.5s;
  ${(props) => (props.dim ? 'opacity: 0.5;' : '')}
  ${(props) => (props.highlight ? 'transform: scale(1.2); opacity: 1;' : '')}
`;

const images = [
  '/images/interview.png',
  '/images/interview2.png',
  '/images/interview.png',
  // Add more image paths as needed
];