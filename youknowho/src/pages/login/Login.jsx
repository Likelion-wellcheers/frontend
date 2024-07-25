import React from 'react'
import { useForm } from '../../hooks/useForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [id, onChangeId] = useForm("");
  const [pw, onChangePw] = useForm("");

  //const router = useNavigate();
/*
  useEffect(() => {
    if(localStorage.getItem("access")) {
      router("/mypage");
    }
  }, [router]);
*/
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


return (
  <Wrapper>
    <Logo src="/images/mainlogo.png" alt="Logo" />
    <Title>간편하게 가입하고<br />유노유노후와 집을 찾아보세요!</Title>
    <Form>
      <InputWrapper>
        <Input 
          placeholder="아이디" 
          value={id} 
          onChange={onChangeId} 
        />
        <Input 
          type="password" 
          placeholder="비밀번호" 
          value={pw} 
          onChange={onChangePw} 
        />
      </InputWrapper>
      <TextWrap>
        <Link to="#">아이디/비밀번호 찾기 &gt;</Link>
      </TextWrap>
    </Form>
    <BtnWrapper>
      <LoginButton onClick={onClick}>로그인</LoginButton>
      <KakaoButton>카카오로 시작하기</KakaoButton>
    </BtnWrapper>
    <Divider></Divider>
    <SignupLink to="/signup">회원가입</SignupLink>
  </Wrapper>
);
};

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
width: 20%;
height: 30%;
margin-top: 30px;
margin-bottom: 10px;
`;

const Title = styled.h1`
font-size: 18px;
font-weight: bold;
text-align: center;
margin-bottom: 20px;
line-height: 1.5;
`;

const Form = styled.div`
width: 100%;
`;

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
margin-bottom: 10px;
`;

const Input = styled.input`
width: 92%;
padding: 15px;
border-radius: 5px;
border: 1px solid #ddd;
font-size: 14px;
`;

const TextWrap = styled.div`
display: flex;
justify-content: flex-end;
margin-bottom: 20px;

a {
  font-size: 12px;
  color: grey;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
`;

const BtnWrapper = styled.div`
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
margin-bottom: 20px;
`;

const LoginButton = styled.button`
background: linear-gradient(90deg, #6469ff 0%, #9190ff 100%);
color: white;
padding: 15px;
border: none;
border-radius: 5px;
font-size: 16px;
font-weight: bold;
cursor: pointer;
transition: 0.3s;

&:hover {
  background: linear-gradient(90deg, #9190ff 0%, #6469ff 100%);
}
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

const Divider = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ddd;
  line-height: 0.1em;
  margin: 20px 0;

  &::before {
    content: '  또는 ';
    background: white;
    padding: 0px 20px;
    position: relative;
    top: 0px;
  }
`;

const SignupLink = styled(Link)`
display: inline-block;
width: 92%;
text-align: center;
padding: 15px;
border: 1px solid #ddd;
border-radius: 5px;
font-size: 16px;
font-weight: bold;
text-decoration: none;
color: black;

&:hover {
  background: #f7f7f7;
}
`;