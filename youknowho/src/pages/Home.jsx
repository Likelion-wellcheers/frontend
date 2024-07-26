import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { ThemeColorContext } from '../context/context'
import { useRecoilState } from 'recoil';
import { curPageRecoil } from '../recoil/atom';


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

  const handleSearchClick = () => {
    setCurPage("searchhome");
    navigate("/searchhome");
  }

  return (
    <>
    <Container>
      <Banner themeColor={themeColor}> 
          <BannerDesc>
            <BannerSubTitle themeColor={themeColor}>맞춤형 주거 추천 서비스</BannerSubTitle>
            <BannerTitle>유노유노후는 이런이런<br/> 서비스입니다</BannerTitle>
            <BannerButton themeColor={themeColor} onClick={handleSearchClick}>나만의 집 찾아보기</BannerButton>
          </BannerDesc>
          <BannerImg src="/images/bannerImg.png" alt="이미지"></BannerImg>
        </Banner>
        <Section>
          <SectionContents>
              <SectionDesc themeColor={themeColor}>
                <SectionTitle>이런 지역은 <br/> 어때요?</SectionTitle>
                <SectionSubTitle>오늘 추천 드리는 지역이에요</SectionSubTitle>
              </SectionDesc>
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
        <ArticleContainer>
          <ArticleDescContainer>
            <ArticleDesc>
              <ArticleTitle>매거진을 확인해 보세요!</ArticleTitle>
              <ArticleSubTitle>다양한 지역의 소식을 알아보세요</ArticleSubTitle>
            </ArticleDesc>
            <Article id="article1"></Article>
          </ArticleDescContainer>            
          <Article id="article2">
          
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
  height: 560px;
  background-color: ${({themeColor})=>themeColor.sub};
  padding: 49px;
  gap: 140px;
`

const BannerDesc = styled.div`
  line-height: 380%;
  width: 38%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 80px;
  margin-bottom: 60px;
`

const BannerImg = styled.img`
  width: 40%;
  width: 600px;
  height: 460.95px;
  object-fit: cover;
  margin-right: 80px;
`

const BannerSubTitle = styled.div`
  font-size: 32px;
  font-family: 'GmarketSansMedium';
  font-weight: 700;
  color: ${({themeColor})=>themeColor.main};
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
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const SectionContents = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
`

const SectionDesc = styled.div`
  color: var(--White, #FFF);
  display: flex;
  width: 292px;
  height: 266px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start; 
  padding: 28px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${({themeColor}) => themeColor.main};
`

const SectionTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
`
const SectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #BBB8B8;
  border-radius: 8px;
  width: 292px;
  height: 266px;
  gap: 8px;
`

const SectionContentImg = styled.img`
  width: 292px;
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
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  background-color: ${({themeColor})=>themeColor.light};
  padding: 0px 12px 0px 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArticleContainer = styled.div`
  width: 100%;
  position: relative;
  height: 700px;
  background-image: url("/images/background.png");
  background-size: 100% 490px;;
  background-repeat: no-repeat;

`

const Article = styled.div`

  width: 396px;
  height: 448px;
`


const ArticleDescContainer = styled.div`
  position: absolute;
  top: 15%;
  left: 10%;
  
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
`
