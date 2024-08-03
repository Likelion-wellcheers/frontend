import React, { useContext, useState } from 'react'
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ThemeColorContext } from '../../context/context';
import { useRecoilState } from 'recoil';
import { curPageRecoil } from '../../recoil/atom';

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
  const navigate = useNavigate();
  const themeColor = useContext(ThemeColorContext);
  const [curPage, setCurPage] = useRecoilState(curPageRecoil);

  const [isLogin, setIsLogin] = useState(true); //임시로 true로 해놓음

  //메뉴 클릭 시 해당 버튼에 대한 페이지로 이동하도록
  const handleClick = (buttonName) => {
    setCurPage(buttonName);
    navigate(buttonName);
  } 

  return (
    <>
      <NavStyle />
      <OuterContainer>
        <Container>
          <MainButton
          onClick={()=>{handleClick("")}}>
            <LogoContainer>
              <Logo src="/images/mainlogo.png" alt="logo"></Logo>
            </LogoContainer>
            유노유노후</MainButton>
            
          <Button  themeColor={themeColor}
          $active={curPage === "/searchhome" || curPage === "/searchhome/searchmap"  || curPage.startsWith("/searchhome/searchmap/centerdetail") || curPage === "/searchhome/searchmap/centerdetail/:centerId/postreview" || curPage === "/searchhome/searchmap/CalCost"}
          onClick={()=>handleClick("/searchhome")}>나의 노후 지역 찾기</Button>

            <Button  themeColor={themeColor}
          $active={curPage === "/mainwonder" || curPage === "/woderwrite" || curPage === "/answer" || curPage === "/question"}
          onClick={()=>handleClick("/mainwonder")}>지역 Q&A</Button>

          <Button  themeColor={themeColor}
          $active={curPage === "/localnews" || curPage === "/Localinfo"  || curPage === "/eachmagazine" || curPage === "/moremagazine"}
          onClick={()=>handleClick("/localnews")}>지역생활</Button>

          {isLogin ? (
            <UserButton  themeColor={themeColor}
            $active={curPage === "/mypage"}
            onClick={()=>handleClick("/mypage")}>
              마이페이지</UserButton>
          ) : (
          <UserButton
            onClick={()=>{handleClick("/login")}}
            >로그인</UserButton>)}
          
        </Container>
      </OuterContainer>
      
    </>
  )
}

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  background-color: #FFFFFF;
  gap: 12%;
  width: 80%;
  z-index: 999;
`

const LogoContainer = styled.div`
  display: flex;
  margin-right: 1px;
`

const Logo = styled.img`
  width: 26px;
  height: 26px;
  padding-bottom: 5px;
`
const MainButton = styled.button`
  white-space: nowrap;
  display: flex;
  gap: 5px;
  font-size: 28px;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`

const Button = styled.button`
  position: relative;
  font-size: 20px;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;

  &:after{
    content: '';
    display: ${props => (props.$active ? 'block' : 'none')};
    position: absolute;
    left: -18%;
    bottom: -18px;
    width: 139%;
    height: 2.4px;
    background-color: ${({themeColor})=> themeColor.main}; 
  }
`

const UserButton = styled.button`
  font-size: 20px;
  color: #615D67;
  font-family: 'GmarketSansMedium',  sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
`
