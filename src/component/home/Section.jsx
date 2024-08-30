import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { ThemeColorContext } from '../../context/context';

export const Section = ({data}) => {
    const themeColor = useContext(ThemeColorContext);

  return (
    <SectionContainer>
          <SectionContents>
              <SectionDesc themeColor={themeColor}>
                <SectionTitle>이런 지역은 어때요?</SectionTitle>
                <SectionSubTitle>오늘 추천드리는 지역이에요</SectionSubTitle>
              </SectionDesc>

              <SectionContentContainer>
              {data.map((region)=>(
                <SectionContent>
                  <SectionContentImgContainer>
                    <SectionContentImg src={region.thumbnail || "/images/default.png"} alt="거주지사진"></SectionContentImg>
                  </SectionContentImgContainer>
                  <SectionContentTitle>{region.city} {region.gugoon}</SectionContentTitle>
                </SectionContent>
              ))}
              </SectionContentContainer>

          </SectionContents>
          <SectionBackgroundImg id="1" src="/images/circle1.png"></SectionBackgroundImg>
          <SectionBackgroundImg id="2" src="/images/circle2.png"></SectionBackgroundImg>
          <SectionBackgroundImg id="3" src="/images/circle3.png"></SectionBackgroundImg>
        </SectionContainer>
  )
}


const SectionContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media (max-width: 1192px) {
    height: 730px;
  }
  @media (max-width: 590px) {
    height: 1200px;
  }
  overflow: hidden;
`

const SectionContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const SectionDesc = styled.div`
  display: flex;
  width: 285px;
  height: 266px;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
`

const SectionTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  white-space: nowrap;
`
const SectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const SectionContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10%;
  margin-bottom: 18%;
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #BBB8B8;
  border-radius: 8px;
  width: 285px;
  height: 250px;
  gap: 8px;
  background-color: white;
  z-index: 10;
`

const SectionContentImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SectionContentImg = styled.img`
  width: 285px;
  height: 186px;
  flex-shrink: 0;
  object-fit : cover;
`

const SectionContentTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  height: 5%;
  padding-left: 16px;
  padding-right: 16px;
`

const SectionContentKeys = styled.div`
  display: flex;
`

const SectionBackgroundImg = styled.img`
  position: absolute;
  &[id="1"] {
    left: 62%;
  }
  &[id="2"] {
    top: 40%;
    left: -30%;
  }
  &[id="3"] {
    top: 6%;
    left: -5%;
  }
`