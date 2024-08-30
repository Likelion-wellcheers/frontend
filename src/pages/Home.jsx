import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ThemeColorContext } from '../context/context'
import { useRecoilValue } from 'recoil';
import { fetchHome } from '../apis/recommend';
import { isLoginState } from '../recoil/isLoginState';
import { Banner } from '../component/home/Banner';
import { Section } from '../component/home/Section';


export const Home = () => {
  const themeColor = useContext(ThemeColorContext);
  const [magData, setMagzineData] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const isLogin = useRecoilValue(isLoginState);

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  }

  useEffect(()=>{
    const getHome = async() => {
      const result = await fetchHome();
      //setMagzineData(result.magazine_list);
      setRegionData(result.region_list);
      
      //완성 후 추후 데이터 넣어 사용할 키들
      // const firstKeys = shuffle(result.region_list[0].infraname?.concat(result?.lifename, result?.hobbyname));
      // const secondKeys = shuffle(result.region_list[1].infraname?.concat(result?.lifename, result?.hobbyname));
      // const thirdKeys = shuffle(result.region_list[2].infraname?.concat(result?.lifename, result?.hobbyname));

      // const newKeys = []
      // newKeys.push(firstKeys || []); // 없으면 빈배열 넣음
      // newKeys.push(secondKeys || []);
      // newKeys.push(thirdKeys || []);
      
      // setRegKeys(newKeys);
    }
    getHome();
  },[]);


  return (
    <>
    <Container>
        <Banner />
        <Section data={regionData}/>

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
