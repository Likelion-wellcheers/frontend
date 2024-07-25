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
            <BannerSubTitle themeColor={themeColor}>맞춤형 주거 추천 서비스</BannerSubTitle>
            <BannerTitle>유노유노후는 이런이런<br/> 서비스입니다</BannerTitle>
            <BannerNotice></BannerNotice>
          </BannerDesc>
          <BannerImg src="/images/bannerImg.png" alt="이미지"></BannerImg>
        </Banner>
        <Section>
          <SectionDesc>
            <SectionTitle>이런 지역은 어때요?</SectionTitle>
            <SectionSubTitle>오늘 추천 드리는 지역이에요</SectionSubTitle>
          </SectionDesc>
          <SectionContents>
              <SectionContent>
                  <SectionContentImg src="" alt="거주지사진"></SectionContentImg>
                  <SectionContentTitle>경상남도 통영시</SectionContentTitle>
                  <SectionContentKeys>
                    <SectionContentKey themeColor={themeColor}>#섬도시</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#나폴리</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#바다</SectionContentKey>
                  </SectionContentKeys>
              </SectionContent>
                  
              <SectionContent>
              <SectionContentImg src="images/bannerImg.png" alt="거주지사진"></SectionContentImg>
                  <SectionContentTitle>경기도 수원시</SectionContentTitle>
                  <SectionContentKeys>
                    <SectionContentKey themeColor={themeColor}>#서울축소판</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#수원화성</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#호수</SectionContentKey>
                  </SectionContentKeys>
              </SectionContent>
              <SectionContent>
              <SectionContentImg src="" alt="거주지사진"></SectionContentImg>
                  <SectionContentTitle>전라남도 여수시</SectionContentTitle>
                  <SectionContentKeys>
                    <SectionContentKey themeColor={themeColor}>#밤바다</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#야경</SectionContentKey>
                    <SectionContentKey themeColor={themeColor}>#케이블카</SectionContentKey>
                  </SectionContentKeys>
              </SectionContent>

          </SectionContents>
        </Section>
        <Article>
          <ArticleBackground></ArticleBackground>
          <ArticleTitle></ArticleTitle>
          <ArticleContents>
            <ArticleContent></ArticleContent>
            <ArticleContent></ArticleContent>
            <ArticleContent></ArticleContent>
          </ArticleContents>
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

const BannerDesc = styled.div`
  width: 38%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 70px;
  padding-left: 80px;
`

const BannerImg = styled.img`
  width: 40%;
  width: 470px;
  height: 490px;
  margin-right: 160px;
`

const BannerSubTitle = styled.div`
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  font-weight: 700;
  color: ${({themeColor})=>themeColor.main};
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
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const SectionDesc = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 200px;
`

const SectionTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
`
const SectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #615D67;
`

const SectionContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 68%;
  margin-left: 20px;
  gap: 20px;
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #BBB8B8;
  border-radius: 8px;
  width: 260px;
  height: 240;
  height: 100%;
  padding: 23px;
  gap: 8px;
`

const SectionContentImg = styled.img`
  width: 260px;
  height: 170px;
  object-fit : cover;
`

const SectionContentTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  height: 10%;
`

const SectionContentKeys = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 10%;
`

const SectionContentKey = styled.div`
  color: ${({themeColor})=>themeColor.main};
  height: 21px
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  border-radius: 8px;
  background-color: ${({themeColor})=>themeColor.light};
  padding-right: 10px;
  padding-left: 10px;
  padding: 2px 10px 2px 10px;
  white-space: nowrap;

`

const Article = styled.div`
  height: 620px;
  background-color: rgba(244, 243, 255, 1);
  position: relative;
  
`
const ArticleBackground = styled.div`
  height: 360px;
  background-image: url("/images/background.png");
  background-size: cover; 
`

const ArticleTitle = styled.div`
  position :relative;
`

const ArticleContents = styled.div`
  
`
const ArticleContent = styled.div`
  
`
