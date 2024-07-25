import React from 'react'
//import { useForm } from '../../hooks/useForm';
import styled, { createGlobalStyle } from 'styled-components';
//import { Link } from 'react-router-dom';

export const Login = () => {
  //const [id, onChangeId] = useForm("");
  //const [pw, onChangePw] = useForm("");

  //const router = useNavigate();
/*
  useEffect(() => {
    if(localStorage.getItem("access")) {
      router("/mypage");
    }
  }, [router]);

  const onClick = async () => {
    try{
        //const result = await login(id, pw);
        //localStorage.setItem("access", result.accessToken);
        //localStorage.setItem("refresh", result.refreshToken);
        //router("/mypage");
    } catch (error) {
        alert("id나 pw를 입력하세요")
    }
};

*/
return (
  <Wrapper>
    <GlobalStyle />
    <Logo src="/images/mainlogo.png" alt="Logo" />
    <Title>간편하게 가입하고<br />유노유노후와 집을 찾아보세요!</Title>
    <BtnWrapper>
      <KakaoButton>카카오로 시작하기</KakaoButton>
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
width: 100%;
margin-bottom: 20px;
`;

const KakaoButton = styled.button`
background: #ffe812;
color: #3c1e1e;
padding: 15px;
border: none;
border-radius: 5px;
font-size: 16px;
font-weight: bold;
cursor: pointer;
`;
