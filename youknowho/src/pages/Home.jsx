import React, { useContext } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ThemeColorContext } from '../context/context'

const HomeStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

export const Home = () => {
  const themeColor = useContext(ThemeColorContext);

  return (
    <>
    <Container>
      <Banner themeColor={themeColor}> 
          <BannerDesc>
            <BannerSubTitle>맞춤형 주거 추천 서비스</BannerSubTitle>
            <BannerTitle>유노유노후는 이런이런<br/> 서비스입니다</BannerTitle>
            <BannerNotice></BannerNotice>
          </BannerDesc>
          <BannerImg src="/images/bannerImg.png" alt="이미지"></BannerImg>
        </Banner>
        <Section>
          <SectionDesc>
            <SectionTitle>이런 지역은 어때요?</SectionTitle>
            <SectionSubTitle>오늘 추천 드리는 지역이에요</SectionSubTitle>
            <SectionButton>더보기</SectionButton>
          </SectionDesc>
          <SectionContents>

          </SectionContents>
        </Section>
        <Article>
          <ArticleTitle></ArticleTitle>
        </Article>
    </Container>
      
    </>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 560px;
  background-color: ${({themeColor})=>themeColor.sub};
`

const BannerImg = styled.img`
  width: 470px;
  height: 490px;
  margin-right: 130px;

`

const BannerDesc = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 70px;
  padding-left: 80px;
`

const BannerSubTitle = styled.div`
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  font-weight: 700;
  color: #5D5FEF;
  margin-top: 20px;
`

const BannerTitle = styled.div`
  font-size: 44px;
  font-family: 'GmarketSansMedium';
  margin-top: 10px;
  font-weight: 500;
`

const BannerNotice = styled.div`
  border-color: black;
  width: 604px;
  height: 220px;

`

const Section = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SectionDesc = styled.div`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.div`
  
`
const SectionSubTitle = styled.div`
  
`
const SectionButton = styled.div`
  
`

const SectionContents = styled.div`
  
`

const Article = styled.div`
  
`
const ArticleTitle = styled.div`
  
`
