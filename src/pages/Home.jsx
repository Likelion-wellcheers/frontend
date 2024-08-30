import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { ThemeColorContext } from '../context/context'
import { useRecoilState, useRecoilValue } from 'recoil';
import { curPageRecoil } from '../recoil/atom';
import { fetchHome } from '../apis/recommend';
import { isLoginState } from '../recoil/isLoginState';
import { Banner } from '../component/home/Banner';


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
  const [regKeys, setRegKeys] = useState([]);
  const isLogin = useRecoilValue(isLoginState);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  }

  const handleSearchClick = () => {
    if(!isLogin){
      alert("로그인 먼저 해주세요!");
      navigate("/login");
      return;
    }
    setCurPage("searchhome");
    navigate("/searchhome");
  }

  useEffect(()=>{
    const getHome = async() => {
      const result = await fetchHome();
      setMagData(result.magazine_list);
      setRegData(result.region_list);
      
      //완성 후 추후 데이터 넣어 사용할 키들
      const firstKeys = shuffle(result.region_list[0].infraname?.concat(result?.lifename, result?.hobbyname));
      const secondKeys = shuffle(result.region_list[1].infraname?.concat(result?.lifename, result?.hobbyname));
      const thirdKeys = shuffle(result.region_list[2].infraname?.concat(result?.lifename, result?.hobbyname));

      const newKeys = []
      newKeys.push(firstKeys || []); // 없으면 빈배열 넣음
      newKeys.push(secondKeys || []);
      newKeys.push(thirdKeys || []);
      
      setRegKeys(newKeys);
    }
    getHome();
  },[]);


  return (
    <>
    <Container>
        <Banner />
        <Section>
          <SectionContents>
              <SectionDesc themeColor={themeColor}>
                <SectionTitle>이런 지역은 어때요?</SectionTitle>
                <SectionSubTitle>오늘 추천드리는 지역이에요</SectionSubTitle>
              </SectionDesc>

              <SectionContentContainer>
              {regData.map((data, idx)=>(
                <SectionContent>
                  <SectionContentImgContainer>
                    <SectionContentImg src={data.thumbnail || "/images/default.png"} alt="거주지사진"></SectionContentImg>
                  </SectionContentImgContainer>
                  <SectionContentTitle>{data.city} {data.gugoon}</SectionContentTitle>
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
                  </ArticleContents>
                </Article>
              })} 

            <Article id="article1">
                <ArticleImg src={magData[0]?.image}></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>{magData[0]?.content}</ArticleContentTitle>
                </ArticleContents>
            </Article>
          </ArticleDescContainer>            
            <Article id="article2">
                <ArticleImg src={magData[1]?.image}></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>{magData[1]?.content}</ArticleContentTitle>
                </ArticleContents>
            </Article>
            <Article id="article3">
              <ArticleImg src={magData[2]?.image}></ArticleImg>
                  <ArticleContents>
                    <ArticleContentTitle>{magData[2]?.content}</ArticleContentTitle>
                  </ArticleContents>
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
