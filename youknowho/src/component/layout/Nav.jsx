import React, { useContext, useState } from 'react'
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ThemeColorContext } from '../../context/context';

const NavStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

export const Nav = () => {
  //nav에서 현제 어떤 페이지인지 저장하는 상태
  //home의 경로는 '/' 이므로 디폴트 값으로
  const [curPage, setCurPage] = useState("/");
  const navigate = useNavigate();
  const themeColor = useContext(ThemeColorContext);

  //메뉴 클릭 시 해당 버튼에 대한 페이지로 이동하도록
  const handleClick = (buttonName) => {
    setCurPage(buttonName);
    navigate('/'+buttonName);
  } 

  return (
    <>
      <NavStyle />
      <Container>
        <MainButton
        onClick={()=>{handleClick("")}}>
          <LogoContainer>
            <Logo src="/images/mainlogo.png" alt="logo"></Logo>
          </LogoContainer>
          유노유노후</MainButton>
        <Button  themeColor={themeColor}
         $active={curPage === "searchhome"}
        onClick={()=>handleClick("searchhome")}>
          집찾기</Button>
        <Button  themeColor={themeColor}
        $active={curPage === "localnews"}
        onClick={()=>handleClick("localnews")}>
          동네소식</Button>
        <Button  themeColor={themeColor}
        $active={curPage === "mypage"}
        onClick={()=>handleClick("mypage")}>
          마이페이지</Button>
        <UserButtons>
          <UserButton
          onClick={()=>{handleClick("login")}}
          >로그인</UserButton>
          <UserButtonDivide>|</UserButtonDivide>
          <UserButton
          onClick={()=>{handleClick("signup")}}
          >회원가입</UserButton>
        </UserButtons>
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: #FFFFFF;
  gap: 124px;
  white-space: nowrap; //화면 줄여도 내부 텍스트 한줄로 유지
`

const LogoContainer = styled.div`
  margin-right: 1px;
`

const Logo = styled.img`
  width: 22px;
  height: 23.67px;
`
const MainButton = styled.button`
  display: flex;
  gap: 5px;
  font-size: 19px;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;
`

const Button = styled.button`
  position: relative;
  font-size: 16px;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;

  &:after{
    content: '';
    display: ${props => (props.$active ? 'block' : 'none')};
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: ${({themeColor})=> themeColor.main}; 
  }
`

const UserButtons = styled.div`
  display: flex;
  gap: 1px;
`

const UserButtonDivide = styled.div`
  color: #615D67;
  cursor: default;
`

const UserButton = styled.button`
  font-size: 13px;
  color: #615D67;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;
`


