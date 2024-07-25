import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';

export const Login = () => {
  const Rest_API_key = 'b36f8d550e5424c31723c5c5fa3373e8';
  const Redirect_uri = '<http://localhost:3000/kakaologin>';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_API_key}&redirect_uri=${Redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

return (
  <Wrapper>
    <GlobalStyle />
    <Logo src="/images/mainlogo.png" alt="Logo" />
    <Title>간편하게 가입하고<br />유노유노후와 집을 찾아보세요!</Title>
    <BtnWrapper>
      <KakaoButton onClick={handleLogin}>
        <img src="/images/kakaologo.png" alt="Kakao" />
        <div>카카오로 시작하기</div>
      </KakaoButton>
    </BtnWrapper>
  </Wrapper>
);
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F4F3FF; 
  }
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 20px;
max-width: 400px;
margin: 0 auto;
`;

const Logo = styled.img`
width: 25%;
height: 25%;
margin-top: 40%;
margin-bottom: 1%;
`;


const Title = styled.h1`
font-size: 20px;
font-weight: 900;
text-align: center;
margin-bottom: 30px;
line-height: 1.5;
`;


const BtnWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 110%;
margin-bottom: 20px;
`;

const KakaoButton = styled.button`
display: flex;
align-items: center;
background: #ffe812;
color: #3c1e1e;
padding: 12px;
border: none;
border-radius: 5px;
font-size: 16px;
font-weight: bold;
cursor: pointer;

img {
  width: 4%;
  height: auto;
  margin-right: 3%;
  margin-left: 29%
}

`;