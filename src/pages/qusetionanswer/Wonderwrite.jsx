import React from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Wonderwrite = () => {
  const location = useLocation();
  const { city, district } = location.state;

  return (
    <Container>
      <MaintitleWrapper>
        <SubTitle> 지역 Q&A <SubTitle_2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 5.29289C8.68342 4.90237 9.31658 4.90237 9.70711 5.29289L15.7071 11.2929C16.0976 11.6834 16.0976 12.3166 15.7071 12.7071L9.70711 18.7071C9.31658 19.0976 8.68342 19.0976 8.29289 18.7071C7.90237 18.3166 7.90237 17.6834 8.29289 17.2929L13.5858 12L8.29289 6.70711C7.90237 6.31658 7.90237 5.68342 8.29289 5.29289Z" fill="black"/>
            </svg></SubTitle_2></SubTitle>
        <Title>동네 주민들과 궁금한 점을 묻고 답해보세요</Title>
      </MaintitleWrapper>
  <Icongroup>
    <Button1 /><Button2 />
    <Icon1 src='/images/wonder_icon.png' alt='궁금 아이콘' />
    <Icon2 src='/images/search_icon.png' alt='돋보기 아이콘' />
  </Icongroup>
  </Container>
  )
}

const Container = styled.div`
    width: 80%;
`

const MaintitleWrapper = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    height: 20%;
    padding: 103px 0px;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid var(--Gray-03, #EEEBE8);
    background-color: #C1BEFF;
    align-items: center;
`

const SubTitle = styled.div`
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    color: var(--Main, #5D5FEF);
    margin-bottom: 2px;
    margin-left: 10%;
  `  
const Title = styled.div`
    align-self: flex-start;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-left: 10%;
`
    
const SubTitle_2 = styled.div`
    align-self: flex-start;
    display: inline-flex;
    margin-top: 1%;
`

const Icongroup = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    gap: 20px;
    position: relative;
    margin: 0;
    height: 100px;
`
const FloatingButton = styled.button`
    width: 236px;
    height: 80px;
    top: 199.88px;
    left: 1338px;
    border-radius: 40px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
    border: 0;
    position: absolute;
    z-index: 1000;
    transform: translate(-50%, -50%); 
;`

const Button1 = styled(FloatingButton)`
    top: -150%;  
    left: 80%; 
;`

const Button2 = styled(FloatingButton)`
    top: -100%; 
    left: 104%;  
;`

const FloatingIcon = styled.img`
  width: 120px;
  height: auto;
  position: absolute;
  z-index: 1000;
  transform: translate(-50%, -50%); 
;`

const Icon1 = styled(FloatingIcon)`
  top: -130%; 
  left: 104%; 
;
`
const Icon2 = styled(FloatingIcon)`
  top: -180%;  
  left: 80%;  
;`