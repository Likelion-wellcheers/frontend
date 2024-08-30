import React from 'react'
import styled from 'styled-components'

export const Article = ({data}) => {
  // ui 구성 위해 article1 / artice2 + article3 으로 분리하여 구분
  return (
    <ArticleContainer>
          <ArticleDescContainer>
            <ArticleDesc>
              <ArticleTitle>매거진을 확인해 보세요!</ArticleTitle>
              <ArticleSubTitle>다양한 지역의 소식을 알아보세요</ArticleSubTitle>
            </ArticleDesc>

              {data.map((magzine, idx)=>{
                <Article id={idx}>
                  <ArticleImg src={magzine.thumnail || "/images/default.png"}></ArticleImg>
                  <ArticleContents>
                    <ArticleContentTitle>{magzine.name}</ArticleContentTitle>
                  </ArticleContents>
                </Article>
              })} 

            <ArticleCard id="article1">
                <ArticleImg src={data[0]?.image}></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>{data[0]?.content}</ArticleContentTitle>
                </ArticleContents>
            </ArticleCard>
          </ArticleDescContainer>            
            <ArticleCard id="article2">
                <ArticleImg src={data[1]?.image}></ArticleImg>
                <ArticleContents>
                  <ArticleContentTitle>{data[1]?.content}</ArticleContentTitle>
                </ArticleContents>
            </ArticleCard>
            <ArticleCard id="article3">
              <ArticleImg src={data[2]?.image}></ArticleImg>
                  <ArticleContents>
                    <ArticleContentTitle>{data[2]?.content}</ArticleContentTitle>
                  </ArticleContents>
            </ArticleCard>
        </ArticleContainer>
  )
}

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

const ArticleCard = styled.div`
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

