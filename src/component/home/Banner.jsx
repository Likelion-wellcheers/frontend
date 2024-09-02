import React, { useContext } from 'react'
import { ThemeColorContext } from '../../context/context'
import styled from 'styled-components'
import { usePath } from '../../hooks/usePath';

export const Banner = () => {
    const themeColor = useContext(ThemeColorContext);
    const movePath = usePath();

  return (
    <>
        <BannerContainer themeColor={themeColor}> 
          <BannerDesc>
            <BannerSubTitle themeColor={themeColor}>맞춤형 노후 지역 추천 서비스</BannerSubTitle>
            <BannerTitle>당신은 당신의 <br />노후를 아시나요?</BannerTitle>
            <BannerButton themeColor={themeColor} onClick={()=>movePath('/searchhome', 1)}>나만의 노후 지역 찾아보기</BannerButton>
          </BannerDesc>
          <BannerImg src="/images/bannerImage.png" alt="이미지"></BannerImg>
        </BannerContainer>
    </>
  )
}


const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 93vh;
  background-color: ${({themeColor})=>themeColor.sub};
  padding-left: 5%;
  padding-right: 3%;
  gap: 50px;
  overflow: hidden;
`

const BannerDesc = styled.div`
  line-height: 400%;
  width: 38%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 90px;
  margin-bottom: 100px;
  gap: 20px;
`

const BannerImg = styled.img`
  width: 40%;
  width: 718px;
  height: 718px;
  object-fit: cover;
  margin-right: 90px;
  margin-top: 30%;
  margin-left: 20px;
`

const BannerSubTitle = styled.div`
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  font-weight: 700;
  line-height: 48px;
  color: ${({themeColor})=>themeColor.main};
  white-space: nowrap;
`

const BannerTitle = styled.div`
  font-size: 44px;
  font-family: 'GmarketSansMedium';
  margin-top: 16px;
  font-weight: 500;
`

const BannerButton = styled.button`
  color: var(--White, #FFF);
  font-size: 18px;
  font-weight: 600;
  display: flex;
  border-color: black;
  width: 396px;
  height: 48px;
  margin-top: 24px; 
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  background: linear-gradient(89deg, ${({themeColor})=>themeColor.point} 12.9%, #FF9FAD 89.61%);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);
`