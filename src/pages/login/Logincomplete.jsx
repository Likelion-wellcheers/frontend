import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const Logincomplete = () => {
    const navigate = useNavigate(); // Correctly called inside the functional component

    return (
        <LoginWrapper>
            <Logo src="/images/mainlogo.png" alt="Logo" />
            <Title>로그인이 완료되었어요<br />유노유노후와 나만의 노후 지역을 찾아보세요!</Title>
            <BtnWrapper>
                <KakaoButton onClick={() => navigate('/')}>
                    <div>시작하기</div>
                </KakaoButton>
            </BtnWrapper>
        </LoginWrapper>
    );
};
  
  const LoginWrapper = styled.div`
    background-color: rgba(244, 243, 255, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    height: 110%;
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
    padding-bottom: 18%;
  `;
  
  const KakaoButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 650%;
    background: linear-gradient(269.15deg, #BCBDFF 12.07%, #5D5FEF 57.16%);
    color: white;
    padding: 20%;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  `;
  
