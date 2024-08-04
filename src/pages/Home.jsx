import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { ThemeColorContext } from '../context/context'
import { useRecoilState } from 'recoil';
import { curPageRecoil } from '../recoil/atom';
import { fetchHome } from '../apis/recommend';


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
  const navigate = useNavigate();
  const [curPage, setCurPage] = useRecoilState(curPageRecoil);
  const [magData, setMagData] = useState([]);
  const [regData, setRegData] = useState([]);

  const handleSearchClick = () => {
    setCurPage("searchhome");
    navigate("/searchhome");
  }

  useEffect(()=>{
    const getHome = async() => {
      const result = await fetchHome();
      setMagData(result.magazine_list);
      setRegData(result.region_list);
    }
    getHome();
  },[]);

  return (
    <>
    <Container>
      <Banner themeColor={themeColor}> 
          <BannerDesc>
            <BannerSubTitle themeColor={themeColor}>맞춤형 노후 지역 추천 서비스</BannerSubTitle>
            <BannerTitle>당신은 당신의 <br />노후를 아시나요?</BannerTitle>
            <BannerButton themeColor={themeColor} onClick={handleSearchClick}>나만의 노후 지역 찾아보기</BannerButton>
          </BannerDesc>
          <BannerImg src="/images/bannerImage.png" alt="이미지"></BannerImg>
        </Banner>
        <Section>
          <SectionContents>
              <SectionDesc themeColor={themeColor}>
                <SectionTitle>이런 지역은 어때요?</SectionTitle>
                <SectionSubTitle>오늘 추천드리는 지역이에요</SectionSubTitle>
              </SectionDesc>

              <SectionContentContainer>
              {regData.map((data)=>(
                <SectionContent>
                  <SectionContentImgContainer>
                    <SectionContentImg src={data.thumnail || "/images/default.png"} alt="거주지사진"></SectionContentImg>
                  </SectionContentImgContainer>
                  <SectionContentTitle>{data.city} {data.gugoon}</SectionContentTitle>
                  <SectionContentKeys>
                        <SectionContentKey themeColor={themeColor}>#섬도시</SectionContentKey>
                        <SectionContentKey themeColor={themeColor}>#나폴리</SectionContentKey>
                        <SectionContentKey themeColor={themeColor}>#바다</SectionContentKey>
                  </SectionContentKeys>
                </SectionContent>
              ))}
              </SectionContentContainer>

          </SectionContents>
          <SectionBackgroundImg id="1" src="/images/circle1.png"></SectionBackgroundImg>
          <SectionBackgroundImg id="2" src="/images/circle2.png"></SectionBackgroundImg>
          <SectionBackgroundImg id="3" src="/images/circle3.png"></SectionBackgroundImg>
        </Section>

        <ArticleContainer>
          <ArticleDescContainer>
            <ArticleDesc>
              <ArticleTitle>매거진을 확인해 보세요!</ArticleTitle>
              <ArticleSubTitle>다양한 지역의 소식을 알아보세요</ArticleSubTitle>
            </ArticleDesc>

              {magData.map((data, idx)=>{
                <Article id={idx}>
                  <ArticleImg src={data.thumnail || "/images/default.png"}></ArticleImg>
                  <ArticleContents>
                    <ArticleContentTitle>{data.name}</ArticleContentTitle>
                    <ArticleContentBtn themeColor={themeColor}>상세보기</ArticleContentBtn>
                  </ArticleContents>
                </Article>
              })} 

            <Article id="article1">
                <ArticleImg src="/images/default.png"></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>카드뉴스제목</ArticleContentTitle>
                  <ArticleContentBtn themeColor={themeColor}>상세보기</ArticleContentBtn>
                </ArticleContents>
            </Article>
          </ArticleDescContainer>            
            <Article id="article2">
                <ArticleImg></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>카드뉴스제목</ArticleContentTitle>
                  <ArticleContentBtn themeColor={themeColor}>상세보기</ArticleContentBtn>
                </ArticleContents>
            </Article>
            <Article id="article3">

            </Article>
        </ArticleContainer>
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

const Section = styled.div`
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
  height: 266px;
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
  height: 10%;
  padding-left: 16px;
  padding-right: 16px;
`

const SectionContentKeys = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 10%;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 16px;
`

const SectionContentKey = styled.div`
  color: ${({themeColor})=>themeColor.main};
  height: 21px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  background-color: ${({themeColor})=>themeColor.light};
  padding: 0px 12px 0px 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
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

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/images/background.png");
  background-size: 100% 470px;;
  background-repeat: no-repeat;
`

const Article = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 24vw;
  height: 27vw;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.12);

 &[id="article1"]{
    top: 156%;
 }

 &[id="article2"]{
  left: 38.3%;
 }

 &[id="article3"]{
  top: 33%;
  left: 64.5%;
 }
`

const ArticleDescContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 12%;
`

const ArticleDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const ArticleTitle = styled.div`
  color: #FFFFFF;
  font-size: 32px;
  font-weight: 700;
`

const ArticleSubTitle = styled.div`
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 500;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`

const ArticleImg = styled.img`
  width: 24vw;
  height: 24vw;
  object-fit: cover;
  overflow: hidden;
`
const ArticleContents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

const ArticleContentTitle = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  white-space: nowrap;
  @media (max-width: 980px) {
    font-size: 0.9rem;
  }
  @media (max-width: 600px) {
    display: none;
  }
`

const ArticleContentBtn = styled.button`
  width: 72px;
  height: 28px;
  padding: 4px 12px;
  justify-content: center;
  align-items: center;
  color: var(--White, #FFF);
  font-size: 0.85rem;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: linear-gradient(247deg, #BCBDFF 7.5%, ${({themeColor})=>themeColor.main} 62.93%);
`
