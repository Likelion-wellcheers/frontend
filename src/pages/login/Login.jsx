import React from 'react';
import styled from 'styled-components';

const Rest_API_key = 'b36f8d550e5424c31723c5c5fa3373e8';
const Redirect_uri = 'http://localhost:3000/kakaologin'; // 실제 Redirect URI로!
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_API_key}&redirect_uri=${Redirect_uri}&response_type=code`;

export const Login = () => {
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Wrapper>
      <LoginWrapper>
        <Logo src="/images/mainlogo.png" alt="Logo" />
        <Title>간편하게 가입하고<br />유노유노후와 집을 찾아보세요!</Title>
        <BtnWrapper>
          <KakaoButton onClick={handleLogin}>
            <img src="/images/kakaologo.png" alt="Kakao" />
            <div>카카오로 시작하기</div>
          </KakaoButton>
        </BtnWrapper>
      </LoginWrapper>
    </Wrapper>
  );
};

// 스타일 컴포넌트
const Wrapper = styled.div`
  justify-content: center;
`;

const LoginWrapper = styled.div`
  background-color: rgba(244, 243, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 8%;
  height: 8%;
  margin-top: 13%;
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
  align-items: center;
  gap: 10px;
  margin-bottom: 18%;
`;

const KakaoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  background: #ffe812;
  color: #3c1e1e;
  padding: 2%;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  img {
    width: 4%;
    height: auto;
    padding-right: 3%;
  }
`;

export default Login;
